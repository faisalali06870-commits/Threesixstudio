import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({ details }) {
  const { startIndex, numImages, duration, size, top, left, zIndex } = details;
  const [index, setIndex] = useState({ value: startIndex });
  const canvasRef = useRef(null);

  useGSAP(() => {
    const tween = gsap.to(index, {
      value: startIndex + numImages - 1,
      duration: duration || 3,
      repeat: -1,
      ease: "linear",
      onUpdate: () => {
        setIndex({ value: Math.round(index.value) });
      },
    });

    gsap.from(canvasRef.current, {
      opacity: 0,
      duration: 1,
      ease: "power2.inOut",
    });

    return () => {
      tween.kill();
    };
  }, []);

  useEffect(() => {
    const scale = window.devicePixelRatio || 1;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let isMounted = true;
    const img = new Image();
    const currentSrc = canvasImages[index.value];
    if (!currentSrc) return;

    img.src = currentSrc;
    img.onload = () => {
      if (!isMounted) return;
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      if (!width || !height) return;

      canvas.width = width * scale;
      canvas.height = height * scale;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;

      ctx.scale(scale, scale);
      ctx.clearRect(0, 0, width, height);
      ctx.drawImage(img, 0, 0, width, height);
    };

    return () => {
      isMounted = false;
    };
  }, [index.value]);

  return (
    <canvas
      ref={canvasRef}
      className="absolute pointer-events-none"
      style={{
        width: `${size * 1.4}px`,
        height: `${size * 1.4}px`,
        top: `${top}%`,
        left: `${left}%`,
        zIndex: zIndex || 0,
      }}
      id="canvas"
    />
  );
}

export default Canvas;
