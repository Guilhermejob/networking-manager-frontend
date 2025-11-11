import { useAdmin } from "../../contexts/AdminContext";
import { IntentionCard } from "./IntentionCard";

export function IntentionList() {
  const { intentions, loading } = useAdmin();

  if (loading) return <p>Carregando intenções...</p>;
  if (!intentions.length) return <p>Nenhuma intenção encontrada.</p>;

  return (
    <div className="grid gap-4">
      {intentions.map((intention) => (
        <IntentionCard key={intention.id} {...intention} />
      ))}
    </div>
  );
}
