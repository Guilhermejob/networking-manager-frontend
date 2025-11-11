import { Link, useLocation } from "react-router-dom";
import { Users, ClipboardList } from "lucide-react";

export default function Sidebar() {
  const location = useLocation();

  const linkClass = (path: string) =>
    `flex items-center gap-2 px-4 py-2 rounded-md transition ${
      location.pathname === path
        ? "bg-purple-100 text-purple-700 font-medium"
        : "text-gray-600 hover:bg-gray-100"
    }`;

  return (
    <aside className="bg-white border-r shadow-sm h-screen p-4 flex flex-col space-y-2">
      <h2 className="text-lg font-semibold text-purple-700 mb-4">Painel</h2>

      <Link to="/admin/dashboard" className={linkClass("/admin/dashboard")}>
        <ClipboardList className="w-4 h-4" /> Intenções
      </Link>

      <Link to="/admin/members" className={linkClass("/admin/members")}>
        <Users className="w-4 h-4" /> Membros
      </Link>
    </aside>
  );
}
