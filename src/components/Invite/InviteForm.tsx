import React, { useState, useEffect } from "react";
import { useInvite } from "@/contexts/InviteContext";

interface Props {
  token: string;
}

export function InviteForm({ token }: Props) {
  const { invitation, completeRegistration, loading, error } = useInvite();
  const [form, setForm] = useState({ name: "", email: "", phone: "" });
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (invitation?.Intention) {
      setForm({
        name: invitation.Intention.name ?? "",
        email: invitation.Intention.email ?? "",
        phone: invitation.Intention.phone ?? "",
      });
    }
  }, [invitation]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setForm((p) => ({ ...p, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await completeRegistration(token, form);
    if (!error) setSuccess(true);
  };

  if (success) {
    return (
      <div className="text-center text-green-600 font-medium">
        ✅ Cadastro concluído com sucesso!
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        name="name"
        placeholder="Nome completo"
        value={form.name}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        name="email"
        type="email"
        placeholder="E-mail"
        value={form.email}
        onChange={handleChange}
        className="w-full p-3 border rounded"
        required
      />
      <input
        name="phone"
        placeholder="Telefone"
        value={form.phone}
        onChange={handleChange}
        className="w-full p-3 border rounded"
      />

      <button
        type="submit"
        disabled={loading}
        className="w-full bg-blue-600 text-white py-2 rounded"
      >
        {loading ? "Finalizando..." : "Finalizar Cadastro"}
      </button>

      {error && <p className="text-red-600 text-sm">{error}</p>}
    </form>
  );
}
