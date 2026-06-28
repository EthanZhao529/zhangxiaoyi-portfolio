import { profile } from "../data/site";
import Reveal from "./Reveal";

export default function Contact() {
  return (
    <section className="closing" id="contact">
      <div className="closing__inner">
        <Reveal><p className="closing__eyebrow">LET'S CREATE SOMETHING MEMORABLE</p></Reveal>
        <Reveal><h2 className="closing__title">好设计，<br />值得被看见。</h2></Reveal>
        <Reveal>
          <p className="closing__line">
            如果你需要一个能把想法变成有记忆点视觉的设计师——<br />
            我已经准备好，开始下一个作品。
          </p>
        </Reveal>
        <Reveal><a className="closing__mail" href={`mailto:${profile.email}`}>{profile.email}</a></Reveal>
        <div className="closing__meta">
          <span>Based in {profile.location}</span>
          <span className="dot">·</span>
          <span>{profile.role} / {profile.roleEn}</span>
        </div>
        <a href="#top" className="closing__top">↑ 回到顶部</a>
      </div>
    </section>
  );
}
