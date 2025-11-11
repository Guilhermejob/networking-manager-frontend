/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import api from "@/services/api";

interface Intention {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: "pending" | "approved" | "rejected";
}

interface AdminContextType {
    intentions: Intention[];
    loading: boolean;
    error: string | null;
    approveIntention: (id: string) => Promise<void>;
    rejectIntention: (id: string) => Promise<void>;
    fetchIntentions: () => Promise<void>;
}

const AdminContext = createContext<AdminContextType>({} as AdminContextType);

export function AdminProvider({ children }: { children: ReactNode }) {
    const [intentions, setIntentions] = useState<Intention[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    async function fetchIntentions() {
        setLoading(true);
        try {
            const res = await api.get("/admissions/intentions");
            console.log(res.data)
            setIntentions(res.data);
        } catch (err) {
            setError("Erro ao carregar intenções");
        } finally {
            setLoading(false);
        }
    }

    async function approveIntention(id: string) {
        const response = await api.post(`/admin/intentions/${id}/approve`);

        alert(`✅ Intenção aprovada!\n\nConvite:\n${response.data.inviteLink}`);
        console.log("Convite gerado:", response.data);
        return response.data; 
    }
    async function rejectIntention(id: string) {
        await api.post(`admin/intentions/${id}/reject`);
        await fetchIntentions();
    }

    useEffect(() => {
        fetchIntentions();
    }, []);

    return (
        <AdminContext.Provider
            value={{ intentions, loading, error, approveIntention, rejectIntention, fetchIntentions }}
        >
            {children}
        </AdminContext.Provider>
    );
}

export const useAdmin = () => useContext(AdminContext);
