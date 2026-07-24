type MarqueeProps = {
  items: string[];
};

export function Marquee({ items }: MarqueeProps) {
  const repeated = [...items, ...items];

  return (
    <div className="marquee" aria-label={items.join(", ")}>
      <div className="marquee__track" aria-hidden="true">
        {repeated.map((item, index) => (
          <span key={`${item}-${index}`}>
            {item}
            <i>✦</i>
          </span>
        ))}
      </div>
    </div>
  );
}
