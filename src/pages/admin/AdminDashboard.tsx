import { IntentionList } from "@/components/Admin/IntentionList";
import { LogoutButton } from "@/components/Admin/LogoutButton";
import Sidebar from "@/components/Sidebar";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="basis-[30%] bg-white border-r shadow-sm">
        <Sidebar />
      </div>
      <div className="basis-[70%] bg-gray-50 p-8">
        <h1 className="text-2xl font-bold mb-6">Painel do Administrador</h1>
        <LogoutButton />
        <IntentionList />
      </div>
    </div>
  );
}
