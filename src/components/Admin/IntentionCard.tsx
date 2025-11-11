import { useState } from "react";
import { useAdmin } from "../../contexts/AdminContext";

interface Props {
    id: string;
    name: string;
    email: string;
    phone: string;
    message: string;
    status: string;
}

export function IntentionCard({ id, name, email, phone, message, status }: Props) {
    const { approveIntention, rejectIntention } = useAdmin();
    const [inviteLink, setInviteLink] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);

    const handleApprove = async () => {
        try {
            setLoading(true);
            const res = await approveIntention(id);
            if (res?.inviteLink) {
                setInviteLink(res.inviteLink);
            } else {
                alert("A intenção foi aprovada, mas o link não foi retornado.");
            }
        } catch (err: any) {
            alert(err.message || "Erro ao aprovar intenção");
        } finally {
            setLoading(false);
        }
    };

    async function handleCopy() {
        if (inviteLink) {
            await navigator.clipboard.writeText(inviteLink);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        }
    }
    return (
        <div className="border border-gray-200 rounded-xl p-4 shadow-sm bg-white">
            <h3 className="font-semibold text-lg">Nome: {name}</h3>
            <p className="text-gray-600 text-sm">
                Email: {email} • Telefone: {phone}
            </p>
            <p className="mt-2 text-gray-700">Mensagem: {message}</p>
            <p className="mt-2 text-gray-700">Status: {status}</p>
            <p className="mt-2 text-gray-700">ID: {id}</p>

            <div className="mt-4 flex gap-2">
                <button
                    onClick={handleApprove}
                    disabled={loading}
                    className="bg-green-500 text-white px-3 py-1 rounded-md hover:bg-green-600 disabled:opacity-50"
                >
                    {loading ? "Aprovando..." : "Aprovar"}
                </button>
                <button
                    onClick={() => rejectIntention(id)}
                    className="bg-red-500 text-white px-3 py-1 rounded-md hover:bg-red-600"
                >
                    Rejeitar
                </button>
            </div>

            {inviteLink && (
                <div className="mt-3 p-3 border border-green-300 bg-green-50 rounded-md">
                    <p className="text-sm font-medium text-green-800 mb-1">✅ Convite gerado: esse link retorna no email simulado do backend, como nao enviamos por email, deixei ele aqui para copiar</p>
                    <p>OBS: se clicar em rejeitar em qualquer card antes de copiar o link ele some, por causa de um useEffect la no contexto</p>
                    <a
                        href={inviteLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 underline break-words"
                    >
                        {inviteLink}
                    </a>
                    <button
                        onClick={handleCopy}
                        className="mt-2 bg-blue-500 text-white px-3 py-1 rounded-md hover:bg-blue-600"
                    >
                        {copied ? "✅ Link copiado!" : "📋 Copiar link"}
                    </button>
                </div>
            )}
        </div>
    );
}
