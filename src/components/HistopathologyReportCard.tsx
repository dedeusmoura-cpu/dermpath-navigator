import { useLanguage } from "../context/LanguageContext";

interface HistopathologyReportCardProps {
  subtitle: string;
  paragraphs: string[];
}

export function HistopathologyReportCard({ subtitle, paragraphs }: HistopathologyReportCardProps) {
  const { tx } = useLanguage();

  return (
    <section className="rounded-[24px] border border-sand bg-white p-6 shadow-panel">
      <div className="space-y-3">
        <p className="text-xs font-semibold uppercase tracking-[0.22em] text-accent">MODELO DE LAUDO HISTOPATOLÓGICO</p>
        <h3 className="font-serif text-2xl text-ink">{tx(subtitle)}</h3>
        {paragraphs.map((paragraph) => (
          <p key={paragraph} className="max-w-6xl text-sm leading-6 text-steel sm:text-base">
            {tx(paragraph)}
          </p>
        ))}
      </div>
    </section>
  );
}
