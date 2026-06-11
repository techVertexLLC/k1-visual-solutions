"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

/**
 * Quote-request form.
 * Submits to Formspree via fetch (pure frontend, no backend required).
 * Handles success, error, and loading states with React state.
 *
 * Client-side validation runs on blur and again on submit: Name (min 2 chars),
 * Email (valid format) and the project message (min 10 chars) are required and
 * show an inline red error beneath the field. The message field also carries a
 * live character count.
 *
 * Product detail pages deep-link here as /contact?product=<name> to pre-fill
 * the product-interest dropdown (reading searchParams means the page must
 * render this inside <Suspense>).
 *
 * Styling comes from the design system: .field inputs, .card-label labels,
 * .btn submit — the page wraps the form in its own .form-card.
 */

const ERROR_RED = "#B91C1C";
const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const MESSAGE_MIN = 10;

/* Validate a single field by id. Returns an error string, or "" when valid.
   Untracked (optional) fields always validate clean. */
function validateField(id, value) {
  const v = (value || "").trim();
  switch (id) {
    case "name":
      if (!v) return "Please enter your name.";
      if (v.length < 2) return "Name must be at least 2 characters.";
      return "";
    case "email":
      if (!v) return "Please enter your email.";
      if (!EMAIL_RE.test(v)) return "Please enter a valid email address.";
      return "";
    case "scenario":
      if (!v) return "Please tell us about your project.";
      if (v.length < MESSAGE_MIN)
        return `Please add a little more detail (at least ${MESSAGE_MIN} characters).`;
      return "";
    default:
      return "";
  }
}

const VALIDATED_FIELDS = ["name", "email", "scenario"];

/* Product-interest dropdown options, in display order. The first is the
   default for visitors who haven't settled on a product yet. Detail-page CTAs
   pre-fill via ?product= using these exact strings. */
const PRODUCT_OPTIONS = [
  "Not sure yet",
  "Crystal Film LED Screen",
  "Holographic Invisible Screen",
  "Soft LED Display",
  "Custom / Other",
];

function Field({ id, label, type = "text", as = "input", options, error, ...rest }) {
  const Tag = options ? "select" : as;
  const invalid = Boolean(error);
  return (
    <div>
      <label htmlFor={id} className="card-label" style={{ display: "block", marginBottom: 8 }}>
        {label}
      </label>
      <Tag
        id={id}
        name={id}
        type={Tag === "input" ? type : undefined}
        className={`field${invalid ? " invalid" : ""}`}
        aria-invalid={invalid || undefined}
        aria-describedby={invalid ? `${id}-error` : undefined}
        {...rest}
      >
        {options
          ? options.map((opt) => (
              <option key={opt} value={opt}>
                {opt}
              </option>
            ))
          : undefined}
      </Tag>
      {invalid && (
        <p id={`${id}-error`} style={{ marginTop: 6, fontSize: 13, color: ERROR_RED }}>
          {error}
        </p>
      )}
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [messageLen, setMessageLen] = useState(0);

  // ?product= deep link from a product detail page → pre-select that product.
  const searchParams = useSearchParams();
  const productParam = searchParams.get("product");
  const initialProduct = PRODUCT_OPTIONS.includes(productParam)
    ? productParam
    : PRODUCT_OPTIONS[0];

  // Re-validate a field on blur, or after submit while the user corrects it.
  const handleBlur = (e) => {
    const { id, value } = e.target;
    if (!VALIDATED_FIELDS.includes(id)) return;
    setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
  };

  // As the user types, clear an existing error once the value becomes valid.
  const handleChange = (e) => {
    const { id, value } = e.target;
    if (id === "scenario") setMessageLen(value.length);
    if (errors[id]) {
      setErrors((prev) => ({ ...prev, [id]: validateField(id, value) }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate every tracked field before sending.
    const form = e.target;
    const nextErrors = {};
    for (const id of VALIDATED_FIELDS) {
      nextErrors[id] = validateField(id, form.elements[id]?.value);
    }
    setErrors(nextErrors);
    if (VALIDATED_FIELDS.some((id) => nextErrors[id])) {
      const firstInvalid = VALIDATED_FIELDS.find((id) => nextErrors[id]);
      form.elements[firstInvalid]?.focus();
      return;
    }

    setSubmitting(true);
    setError(null);
    try {
      const formData = new FormData(form);
      const res = await fetch("https://formspree.io/f/xpznqkjw", {
        method: "POST",
        body: formData,
        headers: { Accept: "application/json" },
      });
      if (res.ok) {
        setSubmitted(true);
      } else {
        const data = await res.json().catch(() => ({}));
        setError(
          data.error || "Something went wrong. Please try again or email us directly."
        );
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div style={{ textAlign: "center", padding: "60px 20px" }}>
        <h3 className="serif" style={{ fontSize: 26, fontWeight: 700 }}>
          Thank you!
        </h3>
        <p style={{ marginTop: 10, color: "var(--muted)" }}>
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const messageShort = messageLen > 0 && messageLen < MESSAGE_MIN;

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onChange={handleChange}
      noValidate
      style={{ display: "grid", gap: 16 }}
    >
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <Field id="name" label="Name *" autoComplete="name" required error={errors.name} />
        <Field
          id="email"
          label="Email *"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>
      <div style={{ display: "grid", gap: 16, gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))" }}>
        <Field id="company" label="Company" autoComplete="organization" />
        <Field id="phone" label="Phone / WhatsApp" type="tel" autoComplete="tel" />
      </div>
      <Field
        id="productInterest"
        label="Which product?"
        options={PRODUCT_OPTIONS}
        key={initialProduct}
        defaultValue={initialProduct}
      />
      <div>
        <Field
          id="scenario"
          label="Your project *"
          as="textarea"
          rows={4}
          placeholder="Glazing dimensions, viewing distance, location…"
          required
          error={errors.scenario}
        />
        {/* Live character count for the message field */}
        <div style={{ marginTop: 6, display: "flex", justifyContent: "flex-end" }}>
          <span style={{ fontSize: 12.5, color: messageShort ? ERROR_RED : "var(--muted)" }}>
            {messageLen} character{messageLen === 1 ? "" : "s"}
            {messageShort ? ` · ${MESSAGE_MIN} minimum` : ""}
          </span>
        </div>
      </div>

      {/* Submit / network error message */}
      {error && (
        <div
          style={{
            borderRadius: 10,
            padding: "12px 16px",
            fontSize: 14,
            background: "#FEF2F2",
            color: ERROR_RED,
            border: "1px solid #FECACA",
          }}
        >
          {error}
        </div>
      )}

      <button
        type="submit"
        className="btn"
        disabled={submitting}
        style={submitting ? { opacity: 0.6, cursor: "not-allowed" } : undefined}
      >
        {submitting ? "Sending…" : "Send Inquiry"}
      </button>
    </form>
  );
}
