"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";
import { COLOR, FONT } from "@/components/home/tokens";

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
 */

const inputBase =
  "w-full rounded-lg border bg-white px-4 py-3 text-sm outline-none transition-[border-color,box-shadow] duration-200";

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
      <label
        htmlFor={id}
        className="mb-2 block text-[11px] font-medium uppercase tracking-[0.16em]"
        style={{ color: COLOR.muted }}
      >
        {label}
      </label>
      {/* Border colour lives in classes, not inline style — an inline
          borderColor would override the focus: classes and the accent focus
          state would never show. */}
      <Tag
        id={id}
        name={id}
        type={Tag === "input" ? type : undefined}
        className={`${inputBase} ${
          invalid
            ? "border-[#B91C1C] focus:ring-[3px] focus:ring-[#B91C1C]/10"
            : "border-[#E8E4DF] focus:border-[#4F46B5] focus:ring-[3px] focus:ring-[#4F46B5]/10"
        }`}
        style={{ color: COLOR.ink }}
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
        <p
          id={`${id}-error`}
          className="mt-1.5 text-xs"
          style={{ color: ERROR_RED }}
        >
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
          data.error ||
            "Something went wrong. Please try again or email us directly."
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
      <div
        className="flex h-full flex-col justify-center rounded-2xl border p-10 text-center"
        style={{ borderColor: COLOR.gray, background: "#fff" }}
      >
        <h3 className="text-2xl" style={{ fontFamily: FONT.serif, color: COLOR.ink }}>
          Thank you!
        </h3>
        <p className="mt-3 text-base" style={{ color: COLOR.body }}>
          We&apos;ll get back to you within 24 hours.
        </p>
      </div>
    );
  }

  const messageOver = messageLen > 0 && messageLen < MESSAGE_MIN;

  return (
    <form
      onSubmit={handleSubmit}
      onBlur={handleBlur}
      onChange={handleChange}
      noValidate
      className="rounded-2xl border p-7 sm:p-9"
      style={{ borderColor: COLOR.gray, background: "#fff", "--accent": COLOR.accent }}
    >
      <div className="grid gap-6 sm:grid-cols-2">
        <Field id="name" label="Name" autoComplete="name" required error={errors.name} />
        <Field
          id="email"
          label="Email"
          type="email"
          autoComplete="email"
          required
          error={errors.email}
        />
      </div>
      <div className="mt-6 grid gap-6 sm:grid-cols-2">
        <Field id="company" label="Company" autoComplete="organization" />
        <Field id="phone" label="Phone" type="tel" autoComplete="tel" />
      </div>
      <div className="mt-6">
        <Field
          id="productInterest"
          label="Product Interest (optional)"
          options={PRODUCT_OPTIONS}
          key={initialProduct}
          defaultValue={initialProduct}
        />
      </div>
      <div className="mt-6">
        <Field
          id="scenario"
          label="Tell us about your project"
          as="textarea"
          rows={4}
          placeholder="e.g. transparent screen for a retail window, ~3m × 2m…"
          required
          error={errors.scenario}
        />
        {/* Live character count for the message field */}
        <div className="mt-1.5 flex justify-end">
          <span
            className="text-xs"
            style={{ color: messageOver ? ERROR_RED : COLOR.muted }}
          >
            {messageLen} character{messageLen === 1 ? "" : "s"}
            {messageOver ? ` · ${MESSAGE_MIN} minimum` : ""}
          </span>
        </div>
      </div>

      {/* Submit / network error message */}
      {error && (
        <div
          className="mt-6 rounded-lg px-4 py-3 text-sm"
          style={{
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
        disabled={submitting}
        className="btn-lift btn-glow btn-shimmer mt-8 w-full rounded-full bg-[#4F46B5] px-6 py-3 text-sm font-medium text-white hover:bg-[#5A50C7] disabled:cursor-not-allowed disabled:opacity-60 sm:w-auto"
      >
        {submitting ? "Sending…" : "Request a Quote"}
      </button>
    </form>
  );
}
