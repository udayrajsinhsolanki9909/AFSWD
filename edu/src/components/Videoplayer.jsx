import React, { useRef, useState, useEffect } from "react";

/*
VideoPlayer:
- Uses <video> with controls
- Draws a small canvas overlay at the bottom (progress bar)
- Listens to timeupdate to compute progress
*/
export default function VideoPlayer({ src }) {
    const videoRef = useRef(null);
    const canvasRef = useRef(null);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const v = videoRef.current;
        const c = canvasRef.current;
        if (!v || !c) return;

        function onTime() {
            if (v.duration) setProgress((v.currentTime / v.duration) * 100);
        }
        v.addEventListener("timeupdate", onTime);

        let raf;
        function draw() {
            const ctx = c.getContext("2d");
            c.width = c.clientWidth;
            c.height = 36;
            ctx.clearRect(0, 0, c.width, c.height);
            ctx.fillStyle = "rgba(0,0,0,0.5)";
            ctx.fillRect(0, 0, c.width, c.height);
            ctx.fillStyle = "rgba(255,255,255,0.85)";
            ctx.fillRect(0, 0, (progress / 100) * c.width, c.height);
            raf = requestAnimationFrame(draw);
        }
        draw();

        return () => {
            v.removeEventListener("timeupdate", onTime);
            cancelAnimationFrame(raf);
        };
    }, [progress]);

    return (
        <div className="relative">
            <video ref={videoRef} controls className="w-full rounded">
                <source src={src} type="video/mp4" />
                Your browser does not support HTML5 video.
            </video>
            <canvas ref={canvasRef} className="absolute left-0 bottom-2 w-full pointer-events-none" />
        </div>
    );
}
