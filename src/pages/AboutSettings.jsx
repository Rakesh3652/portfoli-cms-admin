import { useState, useEffect } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function AboutSettings() {
  const [info, setInfo] = useState({
    hero_title: "",
    hero_subtitle: "",
    about_text: "",
    profile_image_url: ""
  });

  useEffect(() => {
    API.get("/api/about").then(res => setInfo(res.data));
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
    await API.put("/api/about", info);
    alert("About Updated Successfully");
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">About Section</h1>

        <form className="bg-white p-6 rounded-lg space-y-4" onSubmit={saveData}>
          <input
            className="w-full p-2 border"
            placeholder="Hero Title"
            value={info.hero_title}
            onChange={e => setInfo({ ...info, hero_title: e.target.value })}
          />

          <input
            className="w-full p-2 border"
            placeholder="Hero Subtitle"
            value={info.hero_subtitle}
            onChange={e => setInfo({ ...info, hero_subtitle: e.target.value })}
          />

          <textarea
            className="w-full p-2 border"
            placeholder="About Text"
            value={info.about_text}
            onChange={e => setInfo({ ...info, about_text: e.target.value })}
          />

          <input
            className="w-full p-2 border"
            placeholder="Profile Image URL"
            value={info.profile_image_url}
            onChange={e => setInfo({ ...info, profile_image_url: e.target.value })}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
        </form>
      </main>
    </div>
  );
}
