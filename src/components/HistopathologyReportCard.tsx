import { useLanguage } from "../context/LanguageContext";

interface HistopathologyReportCardProps {
  subtitle: string;
  paragraphs: string[];
}

export function HistopathologyReportCard({ subtitle, paragraphs }: HistopathologyReportCardProps) {
  const { tx } = useLanguage();

  return (
    <section className="relative overflow-hidden rounded-[24px] border border-[#b8c9df] bg-white p-6 shadow-[0_22px_55px_-34px_rgba(8,45,92,0.38)]">
      <span className="absolute inset-y-0 left-0 w-1.5 bg-[linear-gradient(180deg,#d6b766_0%,#0a4a86_100%)]" aria-hidden="true" />
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[#9a711c]">MODELO DE LAUDO HISTOPATOLÓGICO</p>
        <h3 className="font-serif text-2xl text-[#082d5c]">{tx(subtitle)}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-6xl text-sm leading-6 text-[#41536c] sm:text-base">
            {tx(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
}
