import { Link, useLocation } from "react-router-dom";

export default function Sidebar() {
  const { pathname } = useLocation();

  const linkClass = (path) =>
    `block p-3 rounded mb-2 ${
      pathname === path ? "bg-blue-600 text-white" : "bg-white text-gray-700"
    }`;

  return (
    <aside className="w-60 bg-gray-200 h-screen p-5 shadow-md">
      <h1 className="text-2xl font-bold mb-6">Admin Panel</h1>

      <Link className={linkClass("/dashboard")} to="/dashboard">Dashboard</Link>
      <Link className={linkClass("/skills")} to="/skills">Skills</Link>
      <Link className={linkClass("/projects")} to="/projects">Projects</Link>
      <Link className={linkClass("/experience")} to="/experience">Experience</Link>
      <Link className={linkClass("/education")} to="/education">Education</Link>
      <Link className={linkClass("/achievements")} to="/achievements">Achievements</Link>
      <Link className={linkClass("/about-settings")} to="/about-settings">About</Link>
      <Link className={linkClass("/contact-settings")} to="/contact-settings">Contact</Link>

      <button
        className="mt-6 w-full bg-red-500 text-white py-2 rounded"
        onClick={() => {
          localStorage.removeItem("token");
          window.location.href = "/";
        }}
      >
        Logout
      </button>
    </aside>
  );
}
