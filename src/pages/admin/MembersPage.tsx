import { MemberCard } from "@/components/Admin/MemberCard";
import Sidebar from "@/components/Sidebar";
import { useMembers } from "@/contexts/MembersContext";

export function MembersPage() {
  const { members, loading } = useMembers();

  if (loading)
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-50">
        <p className="text-gray-600 text-lg">🔄 Carregando membros...</p>
      </div>
    );

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="basis-[30%] border-r bg-white shadow-sm">
        <Sidebar />
      </div>

      <main className="flex-1 p-8">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-2">
          👥 Membros Ativos
        </h1>

        {members.length === 0 ? (
          <p className="text-gray-500">Nenhum membro cadastrado ainda.</p>
        ) : (
          <div className="grid sm:grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {members.map((member) => (
              <MemberCard key={member.id} member={member} />
            ))}
          </div>
        )}
      </main>
    </div>
  );
}
