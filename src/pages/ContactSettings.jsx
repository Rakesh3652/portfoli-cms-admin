import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function ContactSettings() {
  const [info, setInfo] = useState({
    email: "",
    phone: "",
    github_url: "",
    linkedin_url: "",
    address: ""
  });

  useEffect(() => {
    API.get("/contact").then(res => setInfo(res.data));
  }, []);

  const saveData = async (e) => {
    e.preventDefault();
    await API.put("/contact", info);
    alert("Contact Updated");
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Contact Info</h1>

        <form className="bg-white p-6 rounded-lg space-y-4" onSubmit={saveData}>
          <input className="w-full p-2 border"
            placeholder="Email"
            value={info.email}
            onChange={e => setInfo({ ...info, email: e.target.value })}
          />

          <input className="w-full p-2 border"
            placeholder="Phone"
            value={info.phone}
            onChange={e => setInfo({ ...info, phone: e.target.value })}
          />

          <input className="w-full p-2 border"
            placeholder="GitHub URL"
            value={info.github_url}
            onChange={e => setInfo({ ...info, github_url: e.target.value })}
          />

          <input className="w-full p-2 border"
            placeholder="LinkedIn URL"
            value={info.linkedin_url}
            onChange={e => setInfo({ ...info, linkedin_url: e.target.value })}
          />

          <input className="w-full p-2 border"
            placeholder="Address"
            value={info.address}
            onChange={e => setInfo({ ...info, address: e.target.value })}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">
            Save
          </button>
        </form>
      </main>
    </div>
  );
}
