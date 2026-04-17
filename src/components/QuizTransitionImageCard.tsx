interface QuizTransitionImageCardProps {
  src: string;
  alt: string;
  maxHeightClass: string;
}

export function QuizTransitionImageCard({ src, alt, maxHeightClass }: QuizTransitionImageCardProps) {
  return (
    <article className="quiz-transition-image-card">
      <div className="quiz-transition-image-card__media">
        <img src={src} alt={alt} className={`quiz-transition-image-card__img ${maxHeightClass}`} />
      </div>
    </article>
  );
}
