import { useEffect, useRef, useState } from "react";
import canvasImages from "./canvasimage";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

function Canvas({details}) {
    const[index, setIndex]= useState({value:details.startIndex});
    const canvasRef = useRef(null);

    useGSAP(()=>{
        gsap.to(index,{
            value:details.startIndex + details.numImages-1,
            duration:details.duration,
            repeat:-1,
            ease:"linear",
            onUpdate:()=>{
                setIndex({value: Math.round(index.value)});
                console.log(Math.round(index.value));
            }
        })
    },[])
  useEffect(() => {
    // console.log(canvasImages);
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const img = new window.Image();
    img.src = canvasImages[0];
    img.onload = function () {
      // Optionally resize canvas to image size or scale as needed
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);
    };
    img.src = canvasImages[index.value];
  },[index]);
  return <canvas 
  ref={canvasRef} 
  className="w-[18rem] h-[18rem]" 
  id="canvas"></canvas>;
}

export default Canvas;
