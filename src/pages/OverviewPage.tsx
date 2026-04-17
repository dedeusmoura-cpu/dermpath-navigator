import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { OverviewTree } from "../components/OverviewTree";
import { useLanguage } from "../context/LanguageContext";

export function OverviewPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Layout title={t("overview_title")} subtitle={t("overview_subtitle")}>
      <OverviewTree onOpenNode={(nodeId) => navigate(`/diagnostico?nodeId=${nodeId}`)} />
    </Layout>
  );
}
