"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface videoForm {
title: string;
link: string;
description: string;

}

interface video {
    id:string;
    title: string;
    link: string;
    description: string;
    
    
}
interface inputf{
  state:boolean;
  msg:string;
}
export default function Video() {
  const [video, setVideo] = useState<video[]>([]);
  const [eror,setError]=useState<boolean>(false);
  const [saved,setSaved]=useState<boolean>(false);
  const [inputMessage,setInputmessage]=useState<inputf>({
    state:false,
    msg:"",
  })
  const [form, setForm] = useState<videoForm>({
    title: "",
    link: "",
    description: ""
    
  });

  const router = useRouter();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputmessage({state:false,msg:""})
    setForm({ ...form, [e.target.name]: e.target.value });
  };

//   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setForm({ ...form, avatar: file });
//   };

  const addVideo = async () => {
    if (!form.title || !form.link || !form.description)
    {
      setInputmessage({state:true,msg:"Please fill all input field"});
      return;
    }
    setInputmessage({state:false,msg:""});

    try {
      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("link", form.link);
      formData.append("description", form.description);

      const response = await axios.post(
        `/newvideo`,
        formData,
        {
          withCredentials: true,
        }
      );
      setSaved(true)
    //   add new teacher to state
    setVideo((prev) => [
        ...prev,
        {
          id: response.data._id,
          title: response.data.title,
          link: response.data.link,
          description: response.data.description,

        },
      ]);

      setForm({
        title: "",
        link: "",
        description: "",

      });
    } catch (error) {
        setError(true)
      console.error("Error adding video:", error);
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

    const fetchVideo = async () => {
      try {
        const response = await axios.get(`/newvideo`, {
          withCredentials: true,
        });
        // map _id to id
        const videoData = response.data.map((t: { _id: string; title: string; link: string; description: string;  }) => ({
          id: t._id,
          title: t.title,
          link: t.link,
          description: t.description,
    
        }));
        setVideo(videoData);
      } catch (error) {
        console.error(error);
      }
    };

    checkLogin();
    fetchVideo();
  }, [router]);

  async function handleDelete(id: string) {
    console.log(id)
    try {
      await axios.delete(`/newvideo/${id}`, {
        withCredentials: true,
      });
      // Remove from frontend state after successful deletion
      // setTeachers((prev) => prev.filter((t) => t.id !== id));
    } catch (error) {
      console.error("Error deleting teacher:", error);
    }
  }

  return (
    <div className="flex flex-col items-center justify-center p-4">
      <h1 className="text-2xl font-bold mb-4">Add Video</h1>
      <div className="grid gap-3 mb-6 max-w-md w-full">
        <input
          name="title"
          value={form.title}
          onChange={handleChange}
          placeholder="Title"
          className="border p-2"
         
        />
        <input
          name="link"
          value={form.link}
          onChange={handleChange}
          placeholder="Enter youtube video link"
          className="border p-2"
        />
        <input
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Description"
          className="border p-2"
        />

    <p className={`text-red-500 ${inputMessage.state ? "" :"hidden"}`}>{inputMessage.msg}</p>
        <p className={`text-red-500 ${eror ? "" :"hidden"}`}>Please try Again</p>
        <button
          onClick={addVideo}
         
          className="bg-green-500 text-white py-2 rounded"
        >{saved ? "Saved":"Save"}
          
        </button>
      </div>

      <h2 className="text-xl font-bold mb-2">Video List</h2>
      <div className="grid gap-4 w-full max-w-lg">
        {video.map((t) => (
          <div
            key={t.id}
            className="border p-4 flex flex-col items-center gap-4 justify-between"
          >
            
                <p>
                  <strong>Title:</strong> {t.title}
                </p>
                <p>
                  <strong>Link:</strong> {t.link}
                </p>
                <p>
                  <strong>Description:</strong> {t.description}
                </p>


            <button
              onClick={() =>{
                setVideo((prev) => prev.filter((x) => x.id !== t.id));
                handleDelete(t.id);
              }
              }
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
