import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function Experience() {
  const [items, setItems] = useState([]);
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [duration, setDuration] = useState("");
  const [details, setDetails] = useState("");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await API.get("/api/experience");
    setItems(res.data);
  };

  const add = async (e) => {
    e.preventDefault();
    await API.post("/api/experience", { role, company, duration, details });
    setRole("");
    setCompany("");
    setDuration("");
    setDetails("");
    fetchData();
  };

  const del = async (id) => {
    await API.delete(`/api/experience/${id}`);
    fetchData();
  };

  return (
    <div className="flex">
      <Sidebar />

      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Experience</h1>

        <form onSubmit={add} className="bg-white p-6 rounded shadow max-w-xl mb-6">
          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Role"
            value={role} onChange={e => setRole(e.target.value)}
          />

          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Company"
            value={company} onChange={e => setCompany(e.target.value)}
          />

          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Duration"
            value={duration} onChange={e => setDuration(e.target.value)}
          />

          <textarea className="w-full p-2 border mb-3 rounded"
            placeholder="Details"
            value={details} onChange={e => setDetails(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>

        {items.map(i => (
          <div key={i.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
            <div>
              <strong>{i.role}</strong> — {i.company} ({i.duration})
              <p>{i.details}</p>
            </div>
            <button className="text-red-500" onClick={() => del(i.id)}>Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}
