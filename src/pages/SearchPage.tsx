import { useNavigate } from "react-router-dom";
import { Layout } from "../components/Layout";
import { SearchPanel } from "../components/SearchPanel";
import { useLanguage } from "../context/LanguageContext";

export function SearchPage() {
  const navigate = useNavigate();
  const { t } = useLanguage();

  return (
    <Layout title={t("search_title")} subtitle={t("search_subtitle")}>
      <SearchPanel onOpenNode={(nodeId) => navigate("/diagnostico", { state: { nodeId } })} />
    </Layout>
  );
}
