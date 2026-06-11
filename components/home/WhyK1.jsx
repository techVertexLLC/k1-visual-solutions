import Reveal from "@/components/ui/Reveal";
import Counter from "@/components/site/Counter";
import { PROJECTS } from "@/lib/projects";

/**
 * 03 · Why K1 — the factory-direct / local-service pitch over a five-cell
 * number strip. The documented-projects figure tracks lib/projects.
 */
export default function WhyK1() {
  return (
    <section className="section">
      <div className="container">
        <Reveal className="sec-head">
          <div className="kicker">
            <span className="num">03</span> Why K1
          </div>
          <h2 className="title">Factory-direct pricing. North American service.</h2>
          <p>
            K1 Visual Solutions pairs leading transparent-LED factories in Shenzhen with local
            stock, local installation guidance, and a warranty desk in Illinois — so you get
            manufacturer pricing without the overseas support gap.
          </p>
        </Reveal>
        <Reveal className="numstrip">
          <div className="cell">
            <b>
              <Counter value={3} />
            </b>
            <span>product families in stock</span>
          </div>
          <div className="cell">
            <b>
              <Counter value={PROJECTS.length} suffix="+" />
            </b>
            <span>documented projects</span>
          </div>
          <div className="cell">
            <b>3-Year</b>
            <span>warranty</span>
          </div>
          <div className="cell">
            <b>
              <Counter value={24} suffix=" h" />
            </b>
            <span>quote turnaround</span>
          </div>
          <div className="cell">
            <b>FCC · CE · UL</b>
            <span>certified hardware</span>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
