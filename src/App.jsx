import { useState } from "react";
import Preloader from "./components/Preloader";
import Cursor from "./components/Cursor";
import AudioManager from "./components/AudioManager";
import GlassFX from "./components/GlassFX";
import SceneBackground from "./components/SceneBackground";
import Nav from "./components/Nav";
import Hero from "./components/Hero";
import About from "./components/About";
import Work from "./components/Work";
import Capabilities from "./components/Capabilities";
import Contact from "./components/Contact";
import Lightbox from "./components/Lightbox";
import { profile } from "./data/site";

export default function App() {
  const [ready, setReady] = useState(false);
  const [viewer, setViewer] = useState(null); // { images:[nums], index }
  const [muted, setMuted] = useState(false);

  return (
    <>
      <Preloader onDone={() => setReady(true)} />
      <Cursor />
      <AudioManager muted={muted} />
      <GlassFX />

      <SceneBackground />

      <Nav muted={muted} onToggleMute={() => setMuted((m) => !m)} />

      <main>
        <Hero ready={ready} />
        <About />
        <Work onOpen={(images, index) => setViewer({ images, index })} />
        <Capabilities />
        <Contact />
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} {profile.name} {profile.nameEn} · All rights reserved.</span>
        <span className="footer__credit">Visual Art Design Portfolio</span>
      </footer>

      {viewer && (
        <Lightbox images={viewer.images} index={viewer.index} onClose={() => setViewer(null)} />
      )}
    </>
  );
}
