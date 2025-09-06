import React, { useEffect, useRef, useState } from "react";

export default function AudioPlayer({ src }) {
    const audioRef = useRef(null);
    const [playing, setPlaying] = useState(false);

    useEffect(() => {
        const a = audioRef.current;
        function onPlay() { setPlaying(true); }
        function onPause() { setPlaying(false); }
        a.addEventListener("play", onPlay);
        a.addEventListener("pause", onPause);
        return () => {
            a.removeEventListener("play", onPlay);
            a.removeEventListener("pause", onPause);
        };
    }, []);

    return (
        <div>
            <audio ref={audioRef} controls className="w-full">
                <source src={src} type="audio/mpeg" />
                Your browser does not support the audio element.
            </audio>
            <div className="text-sm mt-1">{playing ? "Playing" : "Paused"}</div>
        </div>
    );
}
