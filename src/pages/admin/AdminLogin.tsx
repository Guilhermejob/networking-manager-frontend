/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Input } from "@/components/Form/Input";
import { SubmitButton } from "@/components/Form/SubmitButton";

const AdminLogin: React.FC = () => {
  const navigate = useNavigate();
  const [key, setKey] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setLoading(true);

    try {
      const response = await axios.post("http://localhost:4000/admin/login", { key }); 
      if (response.status === 200) {
        navigate("/admin/dashboard");
        localStorage.setItem("admin_accessKey", key);
      }
    } catch (err: unknown) {
      setError("Chave de acesso inválida.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="bg-white shadow-md rounded-xl p-8 w-full max-w-md text-center">
        <h1 className="text-2xl font-bold mb-2">Login do Admin</h1>
        <p className="text-gray-600 mb-6">
          Insira sua chave de acesso para continuar
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <Input
            label="Chave de acesso"
            name="key"
            type="password"
            value={key}
            onChange={(e) => setKey(e.target.value)}
            required
          />

          {error && <p className="text-red-500 text-sm">{error}</p>}

          <SubmitButton label={loading ? "Entrando..." : "Entrar"} />
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;
