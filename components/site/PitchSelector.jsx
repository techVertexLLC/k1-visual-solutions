"use client";

import { useState } from "react";

/**
 * "How far is your audience?" slider (reference .pitchsel). `models` is
 * [[maxDistance, label, note], ...] sorted ascending — the first entry whose
 * maxDistance covers the chosen distance wins.
 */
export default function PitchSelector({
  models,
  min = 2,
  max = 30,
  initial = 6,
  title = "How far is your audience?",
  intro = "Rule of thumb: the pitch number ≈ the closest comfortable viewing distance in metres. Drag the slider.",
  footnote,
}) {
  const [dist, setDist] = useState(initial);

  let rec = models[models.length - 1];
  for (const m of models) {
    if (dist <= m[0]) {
      rec = m;
      break;
    }
  }

  const quarter = (f) => Math.round(min + (max - min) * f);

  return (
    <div className="pitchsel">
      <h3>{title}</h3>
      <p>{intro}</p>
      <input
        type="range"
        min={min}
        max={max}
        step={1}
        value={dist}
        onChange={(e) => setDist(+e.target.value)}
        aria-label="Viewing distance in metres"
      />
      <div className="scale">
        <span>{min} m</span>
        <span>{quarter(1 / 3)} m</span>
        <span>{quarter(2 / 3)} m</span>
        <span>{max} m</span>
      </div>
      <div className="out">
        <div className="dist">{dist} m</div>
        <div className="rec">
          Recommended: <b>{rec[1]}</b> — {rec[2]}
        </div>
      </div>
      {footnote && <p style={{ marginTop: 16, fontSize: 13, marginBottom: 0 }}>{footnote}</p>}
    </div>
  );
}
