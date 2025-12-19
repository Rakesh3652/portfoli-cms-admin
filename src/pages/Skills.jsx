import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function Skills() {
  const [skills, setSkills] = useState([]);
  const [name, setName] = useState("");
  const [level, setLevel] = useState("");
  const [category, setCategory] = useState("");

  useEffect(() => {
    fetchSkills();
  }, []);

  const fetchSkills = async () => {
    const res = await API.get("/skills");
    setSkills(res.data);
  };

  const addSkill = async (e) => {
    e.preventDefault();
    await API.post("/skills", { name, level, category });
    setName("");
    setLevel("");
    setCategory("");
    fetchSkills();
  };

  const deleteSkill = async (id) => {
    await API.delete(`/skills/${id}`);
    fetchSkills();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Skills</h1>

        <form onSubmit={addSkill} className="bg-white p-6 rounded shadow max-w-xl mb-6">
          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Skill Name"
            value={name} onChange={(e) => setName(e.target.value)}
          />

          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Level (Beginner / Intermediate / Advanced)"
            value={level} onChange={(e) => setLevel(e.target.value)}
          />

          <input className="w-full p-2 border mb-4 rounded"
            placeholder="Category (frontend / backend / tools)"
            value={category} onChange={(e) => setCategory(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>

        {skills.map((s) => (
          <div key={s.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
            <div>{s.name} — {s.level} ({s.category})</div>
            <button className="text-red-500" onClick={() => deleteSkill(s.id)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}
