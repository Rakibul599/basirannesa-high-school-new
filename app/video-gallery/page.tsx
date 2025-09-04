"use client";
import { useEffect, useState } from "react";

interface VideoItem {
  id: string;
  title: string;
  link: string; // YouTube/iframe/mp4 link
  description: string;
}

export default function VideoGallery() {
  const [videos, setVideos] = useState<VideoItem[]>([]);

  function getEmbedUrl(url: string) {
    const videoIdMatch = url.match(/v=([^&]+)/);
    return videoIdMatch
      ? `https://www.youtube.com/embed/${videoIdMatch[1]}`
      : url;
  }
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("/newvideo"); // your API endpoint
        const data = await res.json();
        setVideos(data);
      } catch (error) {
        console.error("Error fetching videos:", error);
      }
    };
    fetchVideos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🎥 ভিডিও গ্যালারি
      </h1>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {videos.map((video) => (
          <div
            key={video.id}
            className="bg-white shadow-lg rounded-2xl overflow-hidden border hover:shadow-xl transition"
          >
            {/* Video Embed */}
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                src={getEmbedUrl(video.link)}
                title={video.title}
                className="w-full h-full"
                allowFullScreen
              ></iframe>
            </div>

            {/* Text Content */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">
                {video.title}
              </h2>
              <p className="text-gray-600 text-sm mt-2">{video.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
