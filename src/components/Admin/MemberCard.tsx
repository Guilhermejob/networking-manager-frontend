interface Props {
  member: {
    id: string;
    name: string;
    email: string;
    phone?: string;
    joinedAt: string;
  };
}

export function MemberCard({ member }: Props) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm">
      <h2 className="font-semibold text-lg">{member.name}</h2>
      <p className="text-gray-600 text-sm">{member.email}</p>
      {member.phone && <p className="text-gray-600 text-sm">📞 {member.phone}</p>}
      <p className="text-xs text-gray-400 mt-2">
        Ingressou em {new Date(member.joinedAt).toLocaleDateString("pt-BR")}
      </p>
    </div>
  );
}
