import { useState } from "react";
import "@/portfolio/portfolio.css";
import { SiteHeader } from "@/portfolio/SiteHeader";
import { Hero, type Mode } from "@/portfolio/Hero";
import { RoleMatch } from "@/portfolio/RoleMatch";
import { Projects } from "@/portfolio/Projects";
import { Experience, Skills, Education } from "@/portfolio/Profile";
import { Ambassador } from "@/portfolio/Ambassador";
import { Sources } from "@/portfolio/Sources";
import { Contact, SiteFooter } from "@/portfolio/Contact";

export default function Portfolio() {
  const [mode, setMode] = useState<Mode>("scan");
  return (
    <div className="soc-page" id="top">
      <a className="soc-skip" href="#main">Skip to content</a>
      <div className="soc-wrap">
        <SiteHeader />
        <main id="main">
          <Hero mode={mode} onMode={setMode} />
          <hr className="soc-divider" />
          <RoleMatch />
          <Projects mode={mode} />
          <Experience />
          <Skills />
          <Education />
          <Ambassador />
          <Sources />
          <Contact />
        </main>
        <SiteFooter />
      </div>
    </div>
  );
}
