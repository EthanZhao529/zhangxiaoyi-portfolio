import GoldParticles from "./GoldParticles";
import Reveal from "./Reveal";
import { capabilities } from "../data/site";

// 6 个能力挂在树枝末端（01 在根部低处，06 在树梢高处）
const TIPS = [
  { x: 14, y: 72 }, // 01
  { x: 86, y: 72 }, // 02
  { x: 26, y: 46 }, // 03
  { x: 74, y: 46 }, // 04
  { x: 34, y: 20 }, // 05
  { x: 66, y: 20 }, // 06
];
// 弯曲枝桠（从树干不同高度伸向各枝头）
const BRANCHES = [
  "M50,80 C38,84 24,80 14,73",
  "M50,80 C62,84 76,80 86,73",
  "M50,56 C41,57 31,52 26,47",
  "M50,56 C59,57 69,52 74,47",
  "M50,34 C45,30 38,25 34,21",
  "M50,34 C55,30 62,25 66,21",
];

export default function Capabilities() {
  return (
    <section className="caps caps--tree" id="capabilities">
      <GoldParticles />
      <div className="caps__inner">
        <Reveal className="section-head section-head--center">
          <h2><span className="section-head__no">06</span> 能力 <em>Capabilities</em></h2>
          <p className="section-head__sub">从根基到枝梢，每一项能力都在为作品生长。</p>
        </Reveal>

        <div className="tree2">
          <svg className="tree2__svg" viewBox="0 0 100 100" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="bark" x1="0" y1="1" x2="0" y2="0">
                <stop offset="0" stopColor="#7a6233" stopOpacity="0.5" />
                <stop offset="0.45" stopColor="#cdb377" stopOpacity="0.85" />
                <stop offset="1" stopColor="#ffe9b0" stopOpacity="1" />
              </linearGradient>
            </defs>
            {/* 树干：底粗顶细的填充形状 */}
            <path className="tree2__trunk" d="M46.5,100 C47.5,70 48.8,46 49.4,14 L50.6,14 C51.2,46 52.5,70 53.5,100 Z" fill="url(#bark)" />
            {BRANCHES.map((d, i) => <path key={i} d={d} stroke="url(#bark)" className="tree2__branch" />)}
          </svg>

          {capabilities.map((c, i) => (
            <div key={c.no} className="tree2__node" style={{ left: `${TIPS[i].x}%`, top: `${TIPS[i].y}%` }}>
              <Reveal style={{ transitionDelay: `${i * 70}ms` }}>
                <article className="cap-card glass shine">
                  <span className="cap-no">{c.no}</span>
                  <h3>{c.title}<span>{c.en}</span></h3>
                  <p>{c.desc}</p>
                </article>
              </Reveal>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
