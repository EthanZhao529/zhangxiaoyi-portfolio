import Particles from "../reactbits/Particles";

// 全站唯一的贯通背景：固定全屏，所有区块透明叠加其上 → 浑然一体、无接缝
export default function SceneBackground() {
  return (
    <div className="scene-bg" aria-hidden="true">
      <span className="blob sb1" />
      <span className="blob sb2" />
      <span className="blob sb3" />
      <span className="blob sb4" />
      <Particles
        className="scene-particles"
        particleColors={["#ffffff", "#9fb4ff", "#ff6a5e", "#cfe0ff"]}
        particleCount={300}
        particleSpread={13}
        speed={0.11}
        particleBaseSize={95}
        sizeRandomness={1.1}
        moveParticlesOnHover={true}
        particleHoverFactor={1.3}
        alphaParticles={true}
      />
    </div>
  );
}
