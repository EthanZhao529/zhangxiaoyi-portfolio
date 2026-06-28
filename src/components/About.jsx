import ScrollReveal from "../reactbits/ScrollReveal";
import Reveal from "./Reveal";
import { about, asset } from "../data/site";

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="section-head">
          <h2><span className="section-head__no">00</span> 关于 <em>About</em></h2>
        </div>

        <div className="about__statement">
          <ScrollReveal baseOpacity={0.1} enableBlur baseRotation={3} blurStrength={4}>
            你好，我是张小艺，一名专注品牌视觉与文化转译的视觉设计师，让每一次设计都有记忆点。
          </ScrollReveal>
        </div>

        <div className="about__top">
          <Reveal className="about__photo">
            <img src={asset("images/zxy.png")} alt="张小艺 ZHANG XIAOYI" />
            <span className="about__photo-tag">张小艺 · ZHANG XIAOYI</span>
          </Reveal>

          <Reveal className="about__bio glass shine">
            <p className="about__hi">视觉传达 + 设计硕士背景，<br />专注品牌视觉与文化转译。</p>
            {about.intro.map((p, i) => <p key={i}>{p}</p>)}
            <div className="about__skills">
              <h3>设计技能 <em>Design Tools</em></h3>
              <ul className="taglist">{about.designTools.map((t) => <li key={t}>{t}</li>)}</ul>
              <h3>AI 技能 <em>AI Tools</em></h3>
              <ul className="taglist taglist--ai">{about.aiTools.map((t) => <li key={t}>{t}</li>)}</ul>
            </div>
          </Reveal>
        </div>

        <div className="about__cards">
          <Reveal className="about-card glass shine">
            <h3 className="about-card__h">教育经历 <em>Education</em></h3>
            <ul className="timeline-ul">
              {about.education.map((e, i) => (
                <li key={i}>
                  <span className="timeline__date">{e.date}</span>
                  <span className="timeline__title">{e.title}</span>
                  <span className="timeline__desc">{e.desc}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about-card glass shine">
            <h3 className="about-card__h">工作经历 <em>Experience</em></h3>
            <ul className="timeline-ul">
              {about.experience.map((e, i) => (
                <li key={i}>
                  <span className="timeline__date">{e.date}</span>
                  <span className="timeline__title">{e.title}</span>
                  <span className="timeline__desc">{e.desc}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal className="about-card glass shine">
            <h3 className="about-card__h">主要获奖 <em>Awards</em></h3>
            <ul className="awards">{about.awards.map((a, i) => <li key={i}>{a}</li>)}</ul>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
