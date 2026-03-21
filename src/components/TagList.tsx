interface TagListProps {
  tags?: string[];
}

export function TagList({ tags }: TagListProps) {
  if (!tags?.length) return null;

  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-steel">
          {tag}
        </span>
      ))}
    </div>
  );
}
