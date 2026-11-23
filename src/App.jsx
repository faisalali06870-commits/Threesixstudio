import { useEffect, useRef, useState } from "react";
import Canvas from "./Canvas";
import data from "./data";
import gsap from "gsap";

function App() {
  const [showCanvas, setShowCanvas] = useState(() => {
    return typeof window !== "undefined" && window.location.search.includes("reveal=true");
  });
  const headingRef = useRef(null);
  const growingSpan = useRef(null);

  useEffect(() => {
    if (typeof window !== "undefined" && window.location.search.includes("reveal=true")) {
      document.body.style.backgroundColor = "#fd2c2a";
      document.body.style.color = "#000000";
    }
  }, []);

  const toggleExperience = (e) => {
    setShowCanvas((prev) => {
      const willShow = !prev;
      const clientX = e?.clientX ?? window.innerWidth / 2;
      const clientY = e?.clientY ?? window.innerHeight / 2;

      if (willShow) {
        if (growingSpan.current) {
          gsap.set(growingSpan.current, {
            top: clientY,
            left: clientX,
            scale: 0,
            opacity: 1,
          });

          gsap.to("body", {
            color: "#000",
            backgroundColor: "#fd2c2a",
            duration: 1.2,
            ease: "power2.inOut",
          });

          gsap.to(growingSpan.current, {
            scale: 1000,
            duration: 1.8,
            ease: "power2.inOut",
            onComplete: () => {
              gsap.set(growingSpan.current, {
                scale: 0,
                clearProps: "all",
              });
            },
          });
        }
      } else {
        gsap.to("body", {
          color: "#fff",
          backgroundColor: "#000",
          duration: 1.2,
          ease: "power2.inOut",
        });
      }

      return willShow;
    });
  };

  return (
    <>
      {/* Growing circle element */}
      <span ref={growingSpan} className="growing"></span>

      <div className="w-full relative min-h-screen">
        
        {/* SECTION 1: HERO */}
        <div className="w-full relative min-h-screen flex flex-col justify-between p-6 md:p-12 overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[0].map((canvasdets, index) => (
              <Canvas key={`hero-${index}`} details={canvasdets} />
            ))}

          {/* Navigation */}
          <nav className="w-full flex justify-between items-center z-50">
            <div className="text-xl md:text-2xl font-bold tracking-tight">
              thirtysixstudios
            </div>
            <div className="hidden md:flex gap-10 text-sm uppercase tracking-wider opacity-80">
              {["What we do", "Who we are", "How we give back", "Talk to us"].map(
                (link, index) => (
                  <a
                    key={index}
                    href={`#${link.toLowerCase().replace(/\s+/g, "-")}`}
                    className="hover:opacity-100 hover:underline transition-opacity"
                  >
                    {link}
                  </a>
                )
              )}
            </div>
            <button
              onClick={toggleExperience}
              className="px-4 py-2 text-xs uppercase tracking-widest rounded-full border border-current hover:opacity-80 transition-opacity z-50 cursor-pointer font-medium"
            >
              {showCanvas ? "Turn Off Canvases" : "✨ Click To Reveal"}
            </button>
          </nav>

          {/* Center Text Container */}
          <div className="w-full max-w-4xl px-4 md:px-12 my-auto py-12 z-20">
            <h3 className="text-3xl md:text-5xl font-normal leading-[1.2] tracking-tight">
              At Thirtysixstudio, we build immersive digital experiences for
              brands with a purpose.
            </h3>
            <p className="text-base md:text-lg opacity-80 max-w-xl mt-8 font-light leading-relaxed">
              We are a team of designers, developers, and strategists who are
              passionate about creating digital experiences that are both
              beautiful and functional.
            </p>
            <div className="mt-8 flex items-center gap-2 text-xs uppercase tracking-widest opacity-60">
              <span>Scroll down</span>
              <span className="animate-bounce">↓</span>
            </div>
          </div>

          {/* Giant Interactive Heading */}
          <div className="w-full relative z-20 select-none pb-2">
            <p className="text-xs uppercase tracking-widest opacity-60 mb-1 pl-2">
              {showCanvas ? "Click heading to switch off" : "👇 Click heading to switch theme & reveal 3D peppers"}
            </p>
            <h1
              ref={headingRef}
              onClick={toggleExperience}
              className="text-[14vw] font-normal tracking-tight leading-none cursor-pointer hover:opacity-80 transition-opacity whitespace-nowrap"
            >
              Thirtysixstudios
            </h1>
          </div>
        </div>

        {/* SECTION 2: ABOUT THE BRAND */}
        <div id="who-we-are" className="w-full relative min-h-screen p-6 md:p-16 flex flex-col justify-center overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[1].map((canvasdets, index) => (
              <Canvas key={`about-${index}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-5xl">
            <span className="text-xs uppercase tracking-widest opacity-60 font-mono">01 — About</span>
            <h1 className="text-4xl md:text-8xl tracking-tighter mt-4 font-normal">
              about the brand
            </h1>
            <p className="text-xl md:text-4xl leading-[1.6] max-w-4xl mt-8 font-light opacity-85">
              we are a team of designers, developers, and strategists who are
              passionate about creating digital experiences that are both beautiful
              and functional, crafted with precision and cutting-edge web technology.
            </p>

            <img
              className="w-full max-w-4xl mt-12 rounded-xl object-cover shadow-2xl"
              src="https://directus.funkhaus.io/assets/b3b5697d-95a0-4af5-ba59-b1d423411b1c?withoutEnlargement=true&fit=outside&width=1400&height=1400"
              alt="Brand Showcase"
              loading="lazy"
            />
          </div>
        </div>

        {/* SECTION 3: SERVICES */}
        <div id="what-we-do" className="w-full relative min-h-screen p-6 md:p-16 flex flex-col justify-center overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[2].map((canvasdets, index) => (
              <Canvas key={`services-${index}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-5xl">
            <span className="text-xs uppercase tracking-widest opacity-60 font-mono">02 — Expertise</span>
            <h2 className="text-4xl md:text-7xl tracking-tighter mt-4 font-normal">
              what we do
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-12">
              {[
                { title: "Creative Direction", desc: "Crafting distinctive visual identities, interactive design concepts, and multi-dimensional web aesthetics." },
                { title: "3D & Motion Engineering", desc: "Smooth 60fps frame animations, canvas manipulation, and GSAP timeline choreography." },
                { title: "Frontend Architecture", desc: "Ultra-responsive, accessible, high-performance web applications built on modern frameworks." },
                { title: "Brand Experiences", desc: "Transforming standard agency portfolios into captivating, award-winning digital interactions." },
              ].map((item, idx) => (
                <div key={idx} className="p-8 rounded-xl border border-current/15 backdrop-blur-sm">
                  <span className="text-xs opacity-50 font-mono">0{idx + 1}</span>
                  <h3 className="text-2xl font-medium mt-2">{item.title}</h3>
                  <p className="text-base opacity-75 mt-2 font-light leading-relaxed">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* SECTION 4: ETHOS */}
        <div id="how-we-give-back" className="w-full relative min-h-[70vh] p-6 md:p-16 flex flex-col justify-center items-center text-center overflow-hidden border-b border-white/10">
          {showCanvas &&
            data[3].map((canvasdets, index) => (
              <Canvas key={`ethos-${index}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-3xl">
            <span className="text-xs uppercase tracking-widest opacity-60 font-mono">03 — Philosophy</span>
            <h2 className="text-3xl md:text-6xl tracking-tight mt-4 font-light leading-tight">
              “Every pixel, every frame, and every interaction matters.”
            </h2>
          </div>
        </div>

        {/* SECTION 5: FOOTER */}
        <div id="talk-to-us" className="w-full relative min-h-[50vh] p-6 md:p-16 flex flex-col justify-between overflow-hidden">
          {showCanvas &&
            data[4].map((canvasdets, index) => (
              <Canvas key={`footer-${index}`} details={canvasdets} />
            ))}

          <div className="relative z-20 max-w-4xl mt-12">
            <span className="text-xs uppercase tracking-widest opacity-60 font-mono">04 — Contact</span>
            <h2 className="text-5xl md:text-8xl tracking-tighter mt-4 font-normal">
              talk to us.
            </h2>
            <a
              href="mailto:hello@thirtysixstudio.com"
              className="inline-block text-2xl md:text-4xl mt-6 underline underline-offset-8 hover:opacity-75 transition-opacity"
            >
              hello@thirtysixstudio.com
            </a>
          </div>

          <div className="relative z-20 flex flex-col md:flex-row justify-between items-center pt-16 border-t border-current/10 mt-16 text-xs uppercase tracking-widest opacity-60">
            <div>© {new Date().getFullYear()} Thirtysixstudios. All Rights Reserved.</div>
            <div className="flex gap-6 mt-4 md:mt-0">
              <a href="https://github.com/faisalali06870-commits/Threesixstudio" target="_blank" rel="noreferrer" className="hover:opacity-100">GitHub</a>
              <a href="https://thirtysixstudio.com" target="_blank" rel="noreferrer" className="hover:opacity-100">Original Site</a>
            </div>
          </div>
        </div>

      </div>
    </>
  );
}

export default App;
