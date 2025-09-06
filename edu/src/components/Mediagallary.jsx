import React from "react";
import VideoPlayer from "./Videoplayer";
import AudioPlayer from "./Audio";

export default function MediaGallery({ courses, onAddToCart }) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {courses.map((c) => (
                <div key={c.id} className="p-4 border rounded bg-white dark:bg-gray-900">
                    <h4 className="font-semibold mb-2">{c.title}</h4>
                    <div className="space-y-3">
                        {c.media.map((m, idx) => (
                            <div key={idx}>
                                {m.type === "video" ? <VideoPlayer src={m.src} /> : <AudioPlayer src={m.src} />}
                            </div>
                        ))}

                        <div>
                            <button onClick={() => onAddToCart(c)} className="px-3 py-1 rounded bg-green-600 text-white">
                                Add Course to Cart
                            </button>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}
