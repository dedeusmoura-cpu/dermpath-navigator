interface TedFeedbackMessageProps {
  variant: "idle" | "error" | "success";
  message?: string;
}

export function TedFeedbackMessage({ variant, message }: TedFeedbackMessageProps) {
  if (!message || variant === "idle") {
    return null;
  }

  return (
    <div
      className={`rounded-[20px] border px-4 py-4 text-sm font-semibold ${
        variant === "success"
          ? "border-emerald-200 bg-emerald-50 text-emerald-800"
          : "border-rose-200 bg-rose-50 text-rose-700"
      }`}
      role="status"
      aria-live="polite"
    >
      {message}
    </div>
  );
}
