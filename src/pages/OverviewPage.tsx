import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { OverviewTree } from "../components/OverviewTree";

export function OverviewPage() {
  const navigate = useNavigate();

  return (
    <Layout title="Visão geral" subtitle="Mapa resumido da árvore com foco nos módulos implementados e placeholders para expansão futura.">
      <OverviewTree onOpenNode={(nodeId) => navigate("/diagnostico", { state: { nodeId } })} />
    </Layout>
  );
}
