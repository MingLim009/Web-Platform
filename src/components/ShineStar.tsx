type ShineStarProps = {
  size?: number;
  className?: string;
  rays?: number;
  showLabel?: boolean;
  label?: string;
  sublabel?: string;
};

/** Estrela grande com raios de brilho — sem fundo, visível em tema claro e escuro */
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
  const cy = 58;
  const scale = size / 120;

  const rayLines = Array.from({ length: rays }, (_, i) => {
    const angle = (i / rays) * Math.PI * 2 - Math.PI / 2;
    const inner = 22 * scale;
    const outer = 52 * scale;
    return {
      x1: cx + Math.cos(angle) * inner,
      y1: cy + Math.sin(angle) * inner,
      x2: cx + Math.cos(angle) * outer,
      y2: cy + Math.sin(angle) * outer,
      i,
    };
  });

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
              strokeWidth={2.2 * scale}
              strokeLinecap="round"
              className="shine-star-ray"
              style={{ animationDelay: `${i * 0.09}s` }}
            />
          ))}
        </g>

        <path
          className="shine-star-body"
          d={`M${cx} ${cy - 28 * scale}l${8 * scale} ${24 * scale}h${26 * scale}l-${21 * scale} ${16 * scale}l${8 * scale} ${24 * scale}l-${21 * scale}-${16 * scale}l-${21 * scale} ${16 * scale}z`}
          fill={`url(#${uid}-g)`}
          stroke="#fff"
          strokeWidth={0.8 * scale}
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
