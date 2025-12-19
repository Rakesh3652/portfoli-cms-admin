import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function Education() {
  const [items, setItems] = useState([]);
  const [degree, setDegree] = useState("");
  const [institution, setInstitution] = useState("");
  const [year, setYear] = useState("");

  useEffect(()=>{ fetchData(); },[]);
  
  const fetchData = async()=> {
    const res = await API.get("/api/education");
    setItems(res.data);
  };

  const add = async(e)=>{
    e.preventDefault();
    await API.post("/api/education",{ degree, institution, year });
    setDegree(""); 
    setInstitution(""); 
    setYear("");
    fetchData();
  };

  const del = async(id)=>{ 
    await API.delete(`/api/education/${id}`); 
    fetchData(); 
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100">
        <h1 className="text-3xl font-bold mb-6">Education</h1>

        <form onSubmit={add} className="bg-white p-6 rounded shadow max-w-xl mb-6">
          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Degree"
            value={degree}
            onChange={e=>setDegree(e.target.value)}
          />

          <input className="w-full p-2 border mb-3 rounded"
            placeholder="Institution"
            value={institution}
            onChange={e=>setInstitution(e.target.value)}
          />

          <input className="w-full p-2 border mb-4 rounded"
            placeholder="Year"
            value={year}
            onChange={e=>setYear(e.target.value)}
          />

          <button className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </form>

        {items.map(i=>(
          <div key={i.id} className="bg-white p-4 rounded shadow mb-2 flex justify-between">
            <div>{i.degree} — {i.institution} ({i.year})</div>
            <button onClick={()=>del(i.id)} className="text-red-500">Delete</button>
          </div>
        ))}
      </main>
    </div>
  );
}
