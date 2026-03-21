import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { SearchPanel } from "../components/SearchPanel";

export function SearchPage() {
  const navigate = useNavigate();

  return (
    <Layout title="Buscar" subtitle="Encontre diagnósticos, padrões morfológicos, palavras-chave e sinônimos em toda a árvore.">
      <SearchPanel onOpenNode={(nodeId) => navigate("/diagnostico", { state: { nodeId } })} />
    </Layout>
  );
}
