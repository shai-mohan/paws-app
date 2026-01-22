type Props = {
  liked: { id: number; url: string }[];
};

export function Summary({ liked }: Props) {
  return (
    <div>
      <h2>You liked {liked.length} cats 😺</h2>
      <div className="grid">
        {liked.map(cat => (
          <img key={cat.id} src={cat.url} />
        ))}
      </div>
    </div>
  );
}
