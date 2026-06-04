type ShineStarProps = {
  size?: number;
  className?: string;
  rays?: number;
  showLabel?: boolean;
  label?: string;
  sublabel?: string;
};

/** Generate a proper symmetric 5-point star path. */
function buildStarPath(cx: number, cy: number, outer: number, inner: number): string {
  const points: string[] = [];
  for (let i = 0; i < 10; i++) {
    const angle = (Math.PI / 5) * i - Math.PI / 2;
    const r = i % 2 === 0 ? outer : inner;
    const x = cx + Math.cos(angle) * r;
    const y = cy + Math.sin(angle) * r;
    points.push(`${x.toFixed(2)},${y.toFixed(2)}`);
  }
  return `M${points.join(" L")} Z`;
}

/** Large luminous 5-point star with radiating beams — no background disc. */
export function ShineStar({
  size = 120,
  className = "",
  rays = 14,
  showLabel = false,
  label = "FUNDADOR",
  sublabel = "2026",
}: ShineStarProps) {
  const uid = `shine-${size}`;
  const cx = 60;
  const cy = 60;
  const starOuter = 30;
  const starInner = 13;
  const rayInner = 36;
  const rayOuter = 58;

  const rayLines = Array.from({ length: rays }, (_, i) => {
    const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
    return {
      x1: cx + Math.cos(angle) * rayInner,
      y1: cy + Math.sin(angle) * rayInner,
      x2: cx + Math.cos(angle) * rayOuter,
      y2: cy + Math.sin(angle) * rayOuter,
      i,
    };
  });

  const starPath = buildStarPath(cx, cy, starOuter, starInner);

  return (
    <div className={`shine-star-wrap ${className}`.trim()} style={{ width: size, maxWidth: "100%" }}>
      <svg
        className="shine-star-svg"
        width={size}
        height={size}
        viewBox="0 0 120 120"
        aria-hidden={!showLabel}
        role={showLabel ? "img" : undefined}
        aria-label={showLabel ? `${label} ${sublabel}` : undefined}
      >
        <defs>
          <linearGradient id={`${uid}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffef0" />
            <stop offset="45%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>
          <filter id={`${uid}-glow`} x="-80%" y="-80%" width="260%" height="260%">
            <feGaussianBlur stdDeviation="2" result="b1" />
            <feGaussianBlur stdDeviation="5" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        <g className="shine-star-rays" filter={`url(#${uid}-glow)`}>
          {rayLines.map(({ x1, y1, x2, y2, i }) => (
            <line
              key={i}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#${uid}-g)`}
              strokeWidth={2.2}
              strokeLinecap="round"
              className="shine-star-ray"
              style={{ animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </g>

        <path
          className="shine-star-body"
          d={starPath}
          fill={`url(#${uid}-g)`}
          stroke="#fff"
          strokeWidth={0.8}
          strokeLinejoin="round"
          filter={`url(#${uid}-glow)`}
        />
      </svg>
      {showLabel && (
        <div className="shine-star-labels">
          <strong>{label}</strong>
          <span>{sublabel}</span>
        </div>
      )}
    </div>
  );
}
