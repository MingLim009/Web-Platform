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

/** Large luminous 5-point star with radiating beams — no background disc.
 *  Beefed up: brighter gradient core, twin halo discs, two ray bands
 *  (long thin + short thick), a slow pulsing aura, and a pulse animation
 *  on the star body for an "alive" shine. */
export function ShineStar({
  size = 120,
  className = "",
  rays = 14,
  showLabel = false,
  label = "FUNDADOR",
  sublabel = "2026",
}: ShineStarProps) {
  const uid = `shine-${size}-${rays}`;
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

  // Secondary band of shorter rays offset by half-step, for sparkle density.
  const shortRays = Array.from({ length: rays }, (_, i) => {
    const angle = ((i + 0.5) / rays) * Math.PI * 2 - Math.PI / 2;
    return {
      x1: cx + Math.cos(angle) * (rayInner + 2),
      y1: cy + Math.sin(angle) * (rayInner + 2),
      x2: cx + Math.cos(angle) * (rayOuter - 12),
      y2: cy + Math.sin(angle) * (rayOuter - 12),
      i,
    };
  });

  const starPath = buildStarPath(cx, cy, starOuter, starInner);
  const innerPath = buildStarPath(cx, cy, starOuter * 0.55, starInner * 0.55);

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
          {/* Body — bright cream → amber gradient with a hot white core */}
          <radialGradient id={`${uid}-g`} cx="38%" cy="35%" r="65%">
            <stop offset="0%" stopColor="#ffffff" />
            <stop offset="25%" stopColor="#fffce0" />
            <stop offset="55%" stopColor="#fde68a" />
            <stop offset="100%" stopColor="#d97706" />
          </radialGradient>

          {/* Ray gradient — warmer, with brighter tip */}
          <linearGradient id={`${uid}-ray`} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#fffce0" />
            <stop offset="55%" stopColor="#fcd34d" />
            <stop offset="100%" stopColor="#f59e0b" />
          </linearGradient>

          {/* Aura halo behind the star */}
          <radialGradient id={`${uid}-halo`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="rgba(255, 232, 130, 0.7)" />
            <stop offset="55%" stopColor="rgba(255, 196, 60, 0.18)" />
            <stop offset="100%" stopColor="rgba(255, 196, 60, 0)" />
          </radialGradient>

          {/* Strong glow filter — wider blur, more passes */}
          <filter id={`${uid}-glow`} x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="1.5" result="b0" />
            <feGaussianBlur stdDeviation="3.5" result="b1" />
            <feGaussianBlur stdDeviation="7" result="b2" />
            <feMerge>
              <feMergeNode in="b2" />
              <feMergeNode in="b1" />
              <feMergeNode in="b0" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>

          {/* Soft glow filter for the rays */}
          <filter id={`${uid}-rayglow`} x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="1.6" result="b" />
            <feMerge>
              <feMergeNode in="b" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
        </defs>

        {/* Pulsing aura — soft golden cloud behind everything */}
        <circle
          className="shine-star-aura"
          cx={cx}
          cy={cy}
          r={52}
          fill={`url(#${uid}-halo)`}
        />

        {/* Long rays */}
        <g className="shine-star-rays" filter={`url(#${uid}-rayglow)`}>
          {rayLines.map(({ x1, y1, x2, y2, i }) => (
            <line
              key={`l-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#${uid}-ray)`}
              strokeWidth={2.4}
              strokeLinecap="round"
              className="shine-star-ray"
              style={{ animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </g>

        {/* Short rays — offset half-step for sparkle density */}
        <g className="shine-star-rays-short" filter={`url(#${uid}-rayglow)`}>
          {shortRays.map(({ x1, y1, x2, y2, i }) => (
            <line
              key={`s-${i}`}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke={`url(#${uid}-ray)`}
              strokeWidth={1.4}
              strokeLinecap="round"
              opacity={0.85}
              className="shine-star-ray-short"
              style={{ animationDelay: `${i * 0.11 + 0.4}s` }}
            />
          ))}
        </g>

        {/* Main star body with strong glow */}
        <path
          className="shine-star-body"
          d={starPath}
          fill={`url(#${uid}-g)`}
          stroke="#fff8d6"
          strokeWidth={0.9}
          strokeLinejoin="round"
          filter={`url(#${uid}-glow)`}
        />

        {/* Inner brighter highlight star for depth */}
        <path
          d={innerPath}
          fill="#ffffff"
          opacity={0.55}
        />

        {/* Hot specular pinpoint */}
        <circle cx={cx - 5} cy={cy - 6} r={2.4} fill="#ffffff" opacity={0.9} />
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
