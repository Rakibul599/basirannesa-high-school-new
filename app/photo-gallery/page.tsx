"use client";
import axios from "axios";
import { useEffect, useState } from "react";

interface PhotoItem {
  id: string;
  title: string;
  description: string;
  photo: string;
  
}

export default function PhotoGallery() {
  const [photos, setPhotos] = useState<PhotoItem[]>([]);

  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await axios.get(`/newphoto`, {
          withCredentials: true,
        });
        // map _id to id
        const photosData = response.data.map(
          (t: { _id: string; title: string; description: string; photo?: string }) => ({
            id: t._id,
            title: t.title,
            description: t.description,
            photo: t.photo, // ✅ backend already provides correct path
          })
        );
        setPhotos(photosData);
      } catch (error) {
        console.error(error);
      }
    };
    fetchPhotos();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">
        🖼️ ফটো গ্যালারি
      </h1>

      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
        {photos.map((photoo) => (
          <div
            key={photoo.id}
            className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-xl transition group"
          >
            {/* Image */}
            <div className="relative">
              <img
                src={photoo.photo}
                alt={photoo.title}
                className="w-full h-56 object-cover group-hover:scale-105 transition-transform"
              />
            </div>

            {/* Text */}
            <div className="p-4">
              <h2 className="text-lg font-semibold text-gray-900">{photoo.title}</h2>
              <p className="text-sm text-gray-600 mt-2">{photoo.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
