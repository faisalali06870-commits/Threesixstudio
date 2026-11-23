import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(true);
  const [isRedTheme, setIsRedTheme] = useState(false);
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  const handleTitleClick = (e) => {
    const nextTheme = !isRedTheme;
    setIsRedTheme(nextTheme);

    if (growingSpan.current) {
      gsap.set(growingSpan.current, {
        top: e.clientY,
        left: e.clientX,
        scale: 0,
        opacity: 1,
        backgroundColor: nextTheme ? "#fd2c2a" : "#111111",
      });

      gsap.to(growingSpan.current, {
        scale: 300,
        duration: 1.2,
        ease: "power2.inOut",
        onComplete: () => {
          document.body.style.backgroundColor = nextTheme ? "#fd2c2a" : "#000000";
          document.body.style.color = nextTheme ? "#000000" : "#ffffff";
          gsap.set(growingSpan.current, {
            scale: 0,
            opacity: 0,
            clearProps: "all",
          });
        },
      });
    }
  };

  return (
    <>
      {/* Growing circle effect on click */}
      <span
        ref={growingSpan}
        className="pointer-events-none fixed rounded-full w-6 h-6 -translate-x-1/2 -translate-y-1/2 z-40 opacity-0"
      ></span>

      <div className="w-full min-h-screen overflow-x-hidden selection:bg-[#fd2c2a] selection:text-white">
        
        {/* SECTION 1: HERO */}
        <section className="relative w-full min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[0].map((canvasdets, i) => (
              <Canvas key={`sec0-${i}`} details={canvasdets} />
            ))}

          {/* Navigation Bar */}
          <nav className="w-full flex justify-between items-center z-50">
            <div className="text-xl md:text-2xl font-bold tracking-tight">
              thirtysixstudio<span className="text-[#fd2c2a]">.</span>
            </div>
            <div className="hidden md:flex gap-8 text-sm uppercase tracking-wider opacity-80">
              {["What we do", "Who we are", "How we give back", "Talk to us"].map((link, idx) => (
                <a
                  key={idx}
                  href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                  className="hover:opacity-100 hover:text-[#fd2c2a] transition-colors"
                >
                  {link}
                </a>
              ))}
            </div>
            <button
              onClick={() => setShowCanvas((prev) => !prev)}
              className="text-xs uppercase px-3 py-1.5 rounded-full border border-current hover:bg-white/10 transition-colors z-50"
            >
              {showCanvas ? "Hide Canvases" : "Show Canvases"}
            </button>
          </nav>

          {/* Tagline & Subtitle */}
          <div className="w-full max-w-3xl my-auto py-16 z-20">
            <h2 className="text-3xl md:text-6xl font-light leading-[1.15] tracking-tight">
              At Thirtysixstudio, we build immersive digital experiences for brands with a purpose.
            </h2>
            <p className="mt-8 text-base md:text-xl opacity-70 max-w-xl font-light leading-relaxed">
              We are a team of designers, developers, and strategists passionate about crafting digital experiences that are both visually captivating and technically flawless.
            </p>
            <div className="mt-10 flex items-center gap-3 text-xs uppercase tracking-widest opacity-60">
              <span>Scroll down</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>

          {/* Interactive Big Hero Title */}
          <div className="w-full z-20 select-none">
            <p className="text-xs uppercase tracking-widest opacity-50 mb-2">
              (Click heading to switch theme)
            </p>
            <h1
              ref={headingRef}
              onClick={handleTitleClick}
              className="text-[12vw] font-black tracking-tighter leading-none cursor-pointer hover:opacity-90 transition-opacity"
            >
              Thirtysixstudios
            </h1>
          </div>
        </section>

        {/* SECTION 2: ABOUT THE BRAND */}
        <section id="who-we-are" className="relative w-full min-h-screen p-6 md:p-16 flex flex-col justify-center overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[1].map((canvasdets, i) => (
              <Canvas key={`sec1-${i}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-5xl">
            <span className="text-xs uppercase tracking-widest text-[#fd2c2a] font-semibold">
              01 — About The Brand
            </span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight mt-4 leading-tight">
              Crafting identities that resonate across screens, dimensions, and cultures.
            </h2>
            <p className="text-lg md:text-2xl mt-8 opacity-75 font-light leading-relaxed max-w-3xl">
              We bridge design and code to create digital environments that captivate, communicate, and elevate. From subtle kinetic details to full-canvas WebGL installations, every motion is purposeful.
            </p>

            <div className="mt-12 rounded-2xl overflow-hidden border border-white/10 max-w-4xl shadow-2xl">
              <img
                className="w-full h-[400px] object-cover"
                src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
                alt="Studio Visual"
                loading="lazy"
              />
            </div>
          </div>
        </section>

        {/* SECTION 3: SERVICES */}
        <section id="what-we-do" className="relative w-full min-h-screen p-6 md:p-16 flex flex-col justify-center overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[2].map((canvasdets, i) => (
              <Canvas key={`sec2-${i}`} details={canvasdets} />
            ))}

          <div className="relative z-20 w-full max-w-6xl">
            <span className="text-xs uppercase tracking-widest text-[#fd2c2a] font-semibold">
              02 — Our Capabilities
            </span>
            <h2 className="text-4xl md:text-7xl font-light tracking-tight mt-4">
              What We Do
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-14">
              {[
                {
                  title: "Creative Direction & 3D Motion",
                  desc: "Concept development, interactive 3D canvas rendering, and animated brand storytelling that commands attention.",
                },
                {
                  title: "Creative Development",
                  desc: "Precision engineering using React, GSAP, WebGL and modern web APIs, optimized for seamless 60fps performance.",
                },
                {
                  title: "Brand Systems & Identity",
                  desc: "Comprehensive visual languages, typography guidelines, and responsive design systems built for the modern web.",
                },
                {
                  title: "Full-Stack Experiences",
                  desc: "Performant, scalable, accessible architecture engineered to support high-traffic campaigns and global launches.",
                },
              ].map((service, idx) => (
                <div
                  key={idx}
                  className="p-8 rounded-xl bg-white/5 border border-white/10 backdrop-blur-md hover:bg-white/10 transition-colors"
                >
                  <span className="text-sm opacity-40 font-mono">0{idx + 1}</span>
                  <h3 className="text-2xl font-medium mt-3 mb-2">{service.title}</h3>
                  <p className="text-base opacity-70 font-light leading-relaxed">{service.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* SECTION 4: SHOWCASE */}
        <section id="how-we-give-back" className="relative w-full min-h-[80vh] p-6 md:p-16 flex flex-col justify-center items-center text-center overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[3].map((canvasdets, i) => (
              <Canvas key={`sec3-${i}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-4xl">
            <span className="text-xs uppercase tracking-widest text-[#fd2c2a] font-semibold">
              03 — Creative Ethos
            </span>
            <h2 className="text-3xl md:text-6xl font-light tracking-tight mt-4 leading-tight">
              “Great work doesn’t just communicate — it mesmerizes.”
            </h2>
            <p className="text-base md:text-xl mt-6 opacity-70 font-light max-w-2xl mx-auto leading-relaxed">
              Every project is an opportunity to push creative boundaries and leave a lasting impression on everyone who experiences it.
            </p>
          </div>
        </section>

        {/* SECTION 5: FOOTER & TALK TO US */}
        <footer id="talk-to-us" className="relative w-full min-h-[60vh] p-6 md:p-16 flex flex-col justify-between overflow-hidden">
          {showCanvas &&
            data[4].map((canvasdets, i) => (
              <Canvas key={`sec4-${i}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-4xl mt-12">
            <span className="text-xs uppercase tracking-widest text-[#fd2c2a] font-semibold">
              04 — Start A Conversation
            </span>
            <h2 className="text-5xl md:text-8xl font-black tracking-tighter mt-4">
              Talk to us.
            </h2>
            <a
              href="mailto:hello@thirtysixstudio.com"
              className="inline-block text-2xl md:text-4xl mt-6 font-light underline underline-offset-8 hover:text-[#fd2c2a] transition-colors"
            >
              hello@thirtysixstudio.com
            </a>
          </div>

          <div className="relative z-20 flex flex-col md:flex-row justify-between items-center pt-16 border-t border-white/10 mt-16 text-xs uppercase tracking-widest opacity-60">
            <div>© {new Date().getFullYear()} Thirtysixstudio. All Rights Reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://instagram.com" target="_blank" rel="noreferrer" className="hover:opacity-100">Instagram</a>
              <a href="https://twitter.com" target="_blank" rel="noreferrer" className="hover:opacity-100">Twitter</a>
              <a href="https://github.com/faisalali06870-commits/Threesixstudio" target="_blank" rel="noreferrer" className="hover:opacity-100">GitHub</a>
            </div>
          </div>
        </footer>

      </div>
    </>
  );
}

export default App;
