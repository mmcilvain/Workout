import type { WorkoutCategory } from "../App";

type CategoryCardProps = {
  category: WorkoutCategory;
  isSelected: boolean;
  onSelect: () => void;
};

function CategoryCard({ category, isSelected, onSelect }: CategoryCardProps) {
  return (
    <button
      className={`category-card ${category.gradient}${isSelected ? " is-selected" : ""}`}
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
    >
      <span className="category-card__topline">
        <span className="category-card__icon" aria-hidden="true">
          {category.icon}
        </span>
        <span className="category-card__duration">{category.duration}</span>
      </span>
      <span className="category-card__name">{category.name}</span>
      <span className="category-card__tagline">{category.tagline}</span>
      <span className="category-card__meta">
        <span>{category.intensity}</span>
        <span>{category.focus[0]}</span>
      </span>
    </button>
  );
}

export default CategoryCard;
