import { useEffect, useState } from "react";
import API from "../services/api";
import Sidebar from "../components/Sidebar";

export default function Projects() {
  const [projects, setProjects] = useState([]);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [techStack, setTechStack] = useState("");
  const [github, setGithub] = useState("");
  const [live, setLive] = useState("");

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    const res = await API.get("/projects");
    setProjects(res.data);
  };

  const addProject = async (e) => {
    e.preventDefault();

    await API.post("/projects", {
      title,
      description,
      tech_stack: techStack,
      github_url: github,
      live_url: live,
    });

    setTitle("");
    setDescription("");
    setTechStack("");
    setGithub("");
    setLive("");

    fetchProjects();
  };

  const deleteProject = async (id) => {
    await API.delete(`/projects/${id}`);
    fetchProjects();
  };

  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-8 bg-gray-100 min-h-screen">
        <h1 className="text-3xl font-bold mb-6">Projects Management</h1>

        <form onSubmit={addProject} className="bg-white p-6 rounded-xl shadow-md max-w-2xl mb-10">
          <h2 className="text-xl font-semibold mb-4">Add Project</h2>

          <input className="w-full p-2 border rounded mb-3"
            placeholder="Project title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <textarea className="w-full p-2 border rounded mb-3"
            placeholder="Project description"
            rows="3"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />

          <input className="w-full p-2 border rounded mb-3"
            placeholder="Tech stack"
            value={techStack}
            onChange={(e) => setTechStack(e.target.value)}
          />

          <input className="w-full p-2 border rounded mb-3"
            placeholder="GitHub URL"
            value={github}
            onChange={(e) => setGithub(e.target.value)}
          />

          <input className="w-full p-2 border rounded mb-4"
            placeholder="Live URL"
            value={live}
            onChange={(e) => setLive(e.target.value)}
          />

          <button disabled={loading}
            className="bg-blue-600 text-white px-5 py-2 rounded">
            {loading ? "Adding..." : "Add Project"}
          </button>
        </form>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {projects.map((project) => (
            <div key={project.id} className="bg-white p-6 rounded-xl shadow-md relative">
              <h3 className="text-xl font-semibold mb-2">{project.title}</h3>
              <p className="text-gray-700 mb-3">{project.description}</p>

              {project.tech_stack && (
                <p className="text-sm text-gray-500 mb-2">
                  <strong>Tech:</strong> {project.tech_stack}
                </p>
              )}

              <div className="flex gap-4 text-sm mb-4">
                {project.github_url && (
                  <a href={project.github_url} target="_blank" className="text-blue-600 hover:underline">
                    GitHub
                  </a>
                )}

                {project.live_url && (
                  <a href={project.live_url} target="_blank" className="text-green-600 hover:underline">
                    Live
                  </a>
                )}
              </div>

              <button onClick={() => deleteProject(project.id)}
                className="absolute top-3 right-3 text-red-500">
                Delete
              </button>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}
