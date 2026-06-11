"use client";

import { useRef, useState } from "react";

/**
 * .vcard — black rounded video tile with poster, hover-to-play footage,
 * caption gradient, and the frosted play chip (reference main.js behaviour:
 * mouseenter plays, mouseleave pauses, click/tap toggles).
 *
 * `video` may be null (photo-only documentation) — renders the poster alone
 * without the play chip. `vertical` switches to the 9/16 crop.
 */
export default function VideoCard({
  video,
  poster,
  title,
  sub,
  vertical = false,
  className = "",
  style,
}) {
  const ref = useRef(null);
  const [playing, setPlaying] = useState(false);

  const play = () => {
    const v = ref.current;
    if (!v) return;
    v.play().catch(() => {});
    setPlaying(true);
  };
  const pause = () => {
    const v = ref.current;
    if (!v) return;
    v.pause();
    setPlaying(false);
  };
  const toggle = () => (ref.current?.paused ? play() : pause());

  return (
    <div
      className={`vcard${vertical ? " vert" : ""}${className ? ` ${className}` : ""}`}
      style={style}
      onMouseEnter={video ? play : undefined}
      onMouseLeave={video ? pause : undefined}
      onClick={video ? toggle : undefined}
    >
      {video ? (
        <video ref={ref} poster={poster} preload="none" muted loop playsInline>
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        // eslint-disable-next-line @next/next/no-img-element
        <img className="vposter" src={poster} alt={title || ""} loading="lazy" />
      )}
      {(title || sub) && (
        <div className="cap">
          {title && <b>{title}</b>}
          {sub && <span>{sub}</span>}
        </div>
      )}
      {video && (
        <div className="play" aria-hidden>
          {playing ? "❚❚" : "▶"}
        </div>
      )}
    </div>
  );
}
