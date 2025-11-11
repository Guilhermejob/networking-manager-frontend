/* eslint-disable react-refresh/only-export-components */
// src/contexts/MembersContext.tsx
import api from "@/services/api";
import { createContext, useContext, useEffect, useState } from "react";


interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  joinedAt: string;
}

interface MembersContextType {
  members: Member[];
  fetchMembers: () => Promise<void>;
  loading: boolean;
}

const MembersContext = createContext<MembersContextType>({} as MembersContextType);

export function MembersProvider({ children }: { children: React.ReactNode }) {
  const [members, setMembers] = useState<Member[]>([]);
  const [loading, setLoading] = useState(true);

  async function fetchMembers() {
    try {
      setLoading(true);
      const response = await api.get("/members");
      setMembers(response.data);
    } catch (err) {
      console.error("Erro ao buscar membros:", err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchMembers();
  }, []);

  return (
    <MembersContext.Provider value={{ members, fetchMembers, loading }}>
      {children}
    </MembersContext.Provider>
  );
}

export const useMembers = () => useContext(MembersContext);
