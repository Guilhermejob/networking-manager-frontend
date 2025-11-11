import React, { useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useInvite } from "@/contexts/InviteContext";
import { InviteForm } from "@/components/Invite/InviteForm";

export default function InvitePage() {
  const [params] = useSearchParams();
  const token = params.get("token") ?? "";
  const { invitation, verifyToken, loading, error } = useInvite();

  useEffect(() => {
    if (token) verifyToken(token);
  }, [token]);

  if (loading) return <div className="p-6 text-center">🔄 Validando convite...</div>;
  if (error)
    return (
      <div className="p-6 text-center">
        <h2 className="text-xl font-semibold">Convite inválido</h2>
        <p className="text-red-600 mt-2">{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
      <div className="bg-white shadow rounded-xl p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold mb-2">Complete seu cadastro</h1>
        {invitation?.expiresAt && (
          <p className="text-sm text-gray-500 mb-4">
            Convite expira em: {new Date(invitation.expiresAt).toLocaleString()}
          </p>
        )}

        <InviteForm token={token} />
      </div>
    </div>
  );
}
