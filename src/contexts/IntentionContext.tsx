import { createContext, useContext, useState, ReactNode } from "react";
import api from "../services/api";
import { IntentionFormData } from "@/types/intention";

interface IntentionContextType {
  formData: IntentionFormData;
  loading: boolean;
  success: string | null;
  error: string | null;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent) => Promise<void>;
  resetForm: () => void;
}

const IntentionContext = createContext<IntentionContextType>({} as IntentionContextType);

export function IntentionProvider({ children }: { children: ReactNode }) {
  const [formData, setFormData] = useState<IntentionFormData>({
    name: "",
    email: "",
    phone: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setSuccess(null);
    setError(null);

    try {
      await api.post("/admissions/intentions", formData);
      setSuccess("Intenção enviada com sucesso!");
      resetForm();
    } catch (err) {
      console.error(err);
      setError("Erro ao enviar a intenção. Tente novamente.");
    } finally {
      setLoading(false);
    }
  }

  function resetForm() {
    setFormData({ name: "", email: "", phone: "", message: "" });
  }

  return (
    <IntentionContext.Provider
      value={{
        formData,
        loading,
        success,
        error,
        handleChange,
        handleSubmit,
        resetForm,
      }}
    >
      {children}
    </IntentionContext.Provider>
  );
}

/* eslint-disable react-refresh/only-export-components */
export const useIntention = () => useContext(IntentionContext);
