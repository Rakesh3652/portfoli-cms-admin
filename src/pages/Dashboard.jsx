import Sidebar from "../components/Sidebar";

export default function Dashboard() {
  return (
    <div className="flex">
      <Sidebar />
      <main className="flex-1 p-10 bg-gray-100">
        <h1 className="text-3xl font-bold">Welcome Admin 👋</h1>
        <p className="mt-2 text-gray-600">Manage your portfolio content from here.</p>
      </main>
    </div>
  );
}
