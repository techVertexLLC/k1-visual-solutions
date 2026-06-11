"use client";

import { useState } from "react";

/**
 * Pill tab group (reference .tabs / .tabpane): dark active pill, one visible
 * pane. `items` is [{ label, pane }] where pane is ready-to-render JSX.
 * Panes mount on demand — model spec photos only load when their tab opens.
 */
export default function Tabs({ items, className = "" }) {
  const [active, setActive] = useState(0);

  return (
    <div className={className}>
      <div className="tabs" role="tablist">
        {items.map((item, i) => (
          <button
            key={item.label}
            type="button"
            role="tab"
            aria-selected={i === active}
            className={i === active ? "active" : ""}
            onClick={() => setActive(i)}
          >
            {item.label}
          </button>
        ))}
      </div>
      {items.map((item, i) => (
        <div key={item.label} className={`tabpane${i === active ? " active" : ""}`} role="tabpanel">
          {i === active ? item.pane : null}
        </div>
      ))}
    </div>
  );
}
