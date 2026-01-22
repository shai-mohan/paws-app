type Props = {
  liked: { id: number; url: string }[];
  onReset: () => void;
};

export function Summary({ liked, onReset }: Props) {
  return (
    <div className="summary">
      <p className="eyebrow">All caught up</p>
      <h1>You liked {liked.length} cats 😺</h1>
      <p className="subhead">Here are the ones that made the cut.</p>
      <div className="liked-grid">
        {liked.length === 0 && <p className="muted">No favorites yet — maybe try again?</p>}
        {liked.map(cat => (
          <div key={cat.id} className="thumb">
            <img src={cat.url} alt="Liked cat" loading="lazy" />
          </div>
        ))}
      </div>
        <button className="btn-reset" onClick={onReset}>
            Try Again
        </button>
    </div>
  );
}
