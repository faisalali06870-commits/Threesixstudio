import { useEffect, useRef } from "react";
import canvasImages from "./canvasimage";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const scale = window.devicePixelRatio || 1;
    const width = size * 1.8;
    const height = size * 1.8;

    canvas.width = width * scale;
    canvas.height = height * scale;
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.scale(scale, scale);

    // Preload image objects into memory
    const images = [];
    for (let i = 0; i < numImages; i++) {
      const img = new Image();
      img.src = canvasImages[startIndex + i];
      images.push(img);
    }

    // Render first frame as soon as loaded
    const renderFirstFrame = () => {
      if (images[0] && images[0].complete && images[0].naturalWidth > 0) {
        ctx.clearRect(0, 0, width, height);
        ctx.drawImage(images[0], 0, 0, width, height);
      }
    };

    if (images[0]) {
      images[0].onload = renderFirstFrame;
      renderFirstFrame();
    }

    // Direct GSAP tween on plain object - ZERO React re-renders for buttery 60fps
    const frameObj = { frame: 0 };
    const tween = gsap.to(frameObj, {
      frame: numImages - 1,
      duration: duration || 3,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        const idx = Math.round(frameObj.frame);
        const img = images[idx];
        if (img && img.complete && img.naturalWidth > 0) {
          ctx.clearRect(0, 0, width, height);
          ctx.drawImage(img, 0, 0, width, height);
        }
      },
    });

    gsap.from(canvas, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, [startIndex, numImages, duration, size]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{
        width: `${size * 1.8}px`,
        height: `${size * 1.8}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex || 0,
      }}
      id="canvas"
    />
  );
}

export default Canvas;
