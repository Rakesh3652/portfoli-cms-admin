import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function Achievements() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [year, setYear] = useState("");

  useEffect(() => {
    fetchAchievements();
  }, []);

  const fetchAchievements = async () => {
    const res = await API.get("/api/achievements");
    setItems(res.data);
  };

  const add = async (e) => {
    e.preventDefault();
    await API.post("/api/achievements", { title, year });
    setTitle("");
    setYear("");
    fetchAchievements();
  };

  const del = async (id) => {
    await API.delete(`/api/achievements/${id}`);
    fetchAchievements();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="p-8 w-full">
        <h1 className="text-3xl font-bold mb-6">Achievements</h1>

        <form onSubmit={add} className="bg-white p-6 rounded shadow max-w-xl mb-6">
          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Achievement Title"
            value={title} onChange={e => setTitle(e.target.value)}
          />
          <input className="w-full p-2 border mb-4 rounded"
            placeholder="Year"
            value={year} onChange={e => setYear(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>

        {items.map(i => (
          <div key={i.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
            <div>{i.title} ({i.year})</div>
            <button className="text-red-500" onClick={() => del(i.id)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}
