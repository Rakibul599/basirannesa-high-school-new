"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import axios from "axios";
import { useRouter } from "next/navigation";

interface PhotoForm {
  title: string;
  description: string;
  photo: File | null;
}

interface Photo {
  id: string;
  title: string;
  description: string;
  photo?: string; // backend returns file path or URL
}

export default function TeachersPage() {
  const [photos, setPhotos] = useState<Photo[]>([]);
  const [form, setForm] = useState<PhotoForm>({
    title: "",
    description: "",
    photo: null,
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setForm({ ...form, photo: file });
  };

  const addPhoto = async () => {
    if (!form.title || !form.description) return;

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("description", form.description);
      if (form.photo) formData.append("photo", form.photo);

      const response = await axios.post(`/newphoto`, formData, {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      });

      setPhotos((prev) => [
        ...prev,
        {
          id: response.data._id,
          title: response.data.title,
          description: response.data.description,
          photo: response.data.photo,
        },
      ]);

      setForm({
        title: "",
        description: "",
        photo: null,
      });
    } catch (error) {
      console.error("Error adding photo:", error);
    }
  };

  useEffect(() => {
    const checkLogin = async () => {
      try {
        const response = await axios.get(`/login/me`, {
          withCredentials: true,
        });
        if (response.status !== 200) router.push("/admin/login");
      } catch {
        router.push("/admin/login");
      }
    };

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
    checkLogin();
  }, [router]);

  async function handleDelete(id: string) {
    try {
      await axios.delete(`/newphoto/${id}`, {
        withCredentials: true,
      });
      setPhotos((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting photo:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Add Photo</h1>
      <div className="grid gap-3 mb-6 max-w-md w-full">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2"
        />

        <input
          type="file"
          accept="image/*"
          onChange={handlePhotoChange}
          className="border p-2"
        />
        <button
          onClick={addPhoto}
          className="bg-green-500 text-white py-2 rounded"
        >
          Save
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">Photo List</h2>
      <div className="grid gap-4 w-full max-w-lg">
        {photos.map((t) => (
          <div
            key={t.id}
            className="border p-4 flex items-center gap-4 justify-between"
          >
            <div className="flex items-center gap-4">
              {t.photo ? (
                <Image
                  src={t.photo}
                  alt="photo"
                  width={48}
                  height={48}
                  className="rounded-md object-cover"
                />
              ) : (
                <div className="w-12 h-12 rounded-md bg-gray-300"></div>
              )}
              <div>
                <p>
                  <strong>Title:</strong> {t.title}
                </p>
                <p>
                  <strong>Description:</strong> {t.description}
                </p>
              </div>
            </div>
            <button
              onClick={() => handleDelete(t.id)}
              className="bg-red-500 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
