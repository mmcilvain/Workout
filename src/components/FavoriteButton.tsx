type FavoriteButtonProps = {
  isFavorite: boolean;
  onToggle: () => void;
  workoutName?: string;
};

export const FavoriteButton = ({ isFavorite, onToggle, workoutName }: FavoriteButtonProps) => {
  const label = isFavorite ? 'Unsave workout' : 'Save workout';
  const accessibleName = workoutName ? `${label}: ${workoutName}` : label;

  return (
    <button
      aria-label={accessibleName}
      aria-pressed={isFavorite}
      className={`favorite-button${isFavorite ? ' favorite-button--active' : ''}`}
      onClick={onToggle}
      type="button"
    >
      <span aria-hidden="true">{isFavorite ? '★' : '☆'}</span>
      {isFavorite ? 'Saved' : 'Save'}
    </button>
  );
};
