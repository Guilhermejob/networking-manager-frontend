/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState, ReactNode } from "react";
import api from "@/services/api";
import { useNavigate } from "react-router-dom";

interface Invitation {
  id: number;
  token: string;
  expiresAt?: string | null;
  used: boolean;
  Intention?: {
    id: number;
    name?: string;
    email?: string;
    phone?: string;
    message?: string;
  };
}

interface InviteContextType {
  invitation: Invitation | null;
  loading: boolean;
  error: string | null;
  verifyToken: (token: string) => Promise<void>;
  completeRegistration: (token: string, form: { name: string; email: string; phone: string }) => Promise<void>;
}

const InviteContext = createContext<InviteContextType>({} as InviteContextType);

export function InviteProvider({ children }: { children: ReactNode }) {
  const [invitation, setInvitation] = useState<Invitation | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  async function verifyToken(token: string) {
    setLoading(true);
    setError(null);
    try {
      const res = await api.get(`/admissions/invitations/${encodeURIComponent(token)}`);
      setInvitation(res.data);
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Erro ao validar token.");
    } finally {
      setLoading(false);
    }
  }

  async function completeRegistration(token: string, form: { name: string; email: string; phone: string }) {
    setLoading(true);
    setError(null);
    try {
      await api.post(`/admissions/invitations/${encodeURIComponent(token)}/complete`, form);
      navigate("/admin/members");
    } catch (err: any) {
      setError(err?.response?.data?.message ?? "Erro ao completar registro.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <InviteContext.Provider value={{ invitation, loading, error, verifyToken, completeRegistration }}>
      {children}
    </InviteContext.Provider>
  );
}

export const useInvite = () => useContext(InviteContext);
