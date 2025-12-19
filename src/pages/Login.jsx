import { useState } from "react";
import API from "../services/api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/auth/login", {
        email: email.trim().toLowerCase(),
        password: password.trim(),
      });

      localStorage.setItem("token", res.data.token);
      window.location.href = "/dashboard";
    } catch (err) {
      setError("Invalid email or password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 to-black">
      <form onSubmit={handleLogin} className="bg-gray-800 p-8 rounded-xl shadow-xl w-96">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Admin Login
        </h2>

        {error && <p className="text-red-400 mb-3">{error}</p>}

        <input
          required
          type="email"
          placeholder="Email"
          className="w-full p-2 mb-4 rounded bg-gray-700 text-white"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          required
          type="password"
          placeholder="Password"
          className="w-full p-2 mb-6 rounded bg-gray-700 text-white"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 hover:bg-blue-700 text-white p-2 rounded">
          Login
        </button>
      </form>
    </div>
  );
}
