import Reveal from "@/components/ui/Reveal";
import VideoCard from "@/components/site/VideoCard";
import Counter from "@/components/site/Counter";

/**
 * Transparency proof — the clip filmed from behind a running screen next to
 * the claim it backs up, with an animated three-cell number strip.
 */
export default function TransparencyProof() {
  return (
    <section className="section tight">
      <div className="container">
        <div className="spec-flex">
          <Reveal style={{ alignSelf: "stretch" }}>
            <VideoCard
              video="/assets/videos/feature-transparency-back.mp4"
              poster="/assets/images/cases/case-uzbekistan-back-poster.jpg"
              title="Filmed from behind the screen"
              sub="P8 Crystal Film · Uzbekistan — the street stays fully visible"
            />
          </Reveal>
          <Reveal>
            <div className="kicker">
              <span className="num">—</span> Proof, not promises
            </div>
            <h2 className="title">You can look straight through it</h2>
            <p style={{ marginTop: 16, color: "var(--muted)" }}>
              This is the test that matters: stand behind a running screen and look out. With up to
              95% transparency, daylight, sightlines, and the architecture all stay — only the
              content is added. Hover the clip to play it.
            </p>
            <div className="numstrip" style={{ marginTop: 30 }}>
              <div className="cell">
                <b>
                  <Counter value={95} suffix="%" />
                </b>
                <span>max transparency</span>
              </div>
              <div className="cell">
                <b>
                  <Counter value={2.5} suffix=" mm" />
                </b>
                <span>screen thickness</span>
              </div>
              <div className="cell">
                <b>
                  <Counter value={3840} suffix=" Hz" />
                </b>
                <span>refresh rate</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
