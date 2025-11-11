import { useIntention } from "@/contexts/IntentionContext";
import { Link } from "react-router-dom";

export default function IntentionForm() {
  const { formData, handleChange, handleSubmit, loading, success, error } = useIntention();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="bg-white shadow-lg rounded-2xl p-8 w-full max-w-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-800">Formulário de Intenção</h1>
        <p className="text-gray-600 mb-6">
          Preencha os campos abaixo para participar do grupo.
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="name"
            type="text"
            placeholder="Nome"
            value={formData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
            required
          />
          <input
            name="phone"
            type="tel"
            placeholder="Telefone"
            value={formData.phone}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg"
          />
          <textarea
            name="message"
            placeholder="Mensagem"
            value={formData.message}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg h-24"
          />
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-60"
          >
            {loading ? "Enviando..." : "Enviar Intenção"}
          </button>
          <div className="text-center mt-4">
          <Link
            to="/admin/login"
            className="text-sm text-gray-500 hover:text-gray-800 underline"
          >
            Área do Administrador
          </Link>
        </div>
        </form>

        {success && <p className="mt-4 text-green-600">{success}</p>}
        {error && <p className="mt-4 text-red-600">{error}</p>}
      </div>
    </div>
  );
}
