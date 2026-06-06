"use client";

/**
 * Premium animated SVG icons for /sobre Mission / Vision / Values cards.
 *
 * Each icon has:
 *   - A pulsing aura background ring
 *   - Multiple stroked / filled layers with multi-stop gradients
 *   - A dedicated drop-shadow filter so it "lifts off" the card
 *   - Small sparkle accents for that extra flashiness the client asked for
 *
 * Replaces the previous flat-emoji versions; renders crisply at any size.
 */

type Kind = "mission" | "vision" | "values";

type MissionIconProps = {
  kind: Kind;
  size?: number;
  className?: string;
};

const THEME: Record<Kind, { c1: string; c2: string; c3: string; glow: string; aura: string }> = {
  mission: {
    c1: "#FFD8A1",
    c2: "#FF8A2C",
    c3: "#E11D48",
    glow: "rgba(255, 138, 44, 0.55)",
    aura: "rgba(255, 138, 44, 0.20)",
  },
  vision: {
    c1: "#FFF6CC",
    c2: "#FFD24A",
    c3: "#F59E0B",
    glow: "rgba(255, 196, 60, 0.65)",
    aura: "rgba(255, 210, 74, 0.22)",
  },
  values: {
    c1: "#B7F2D7",
    c2: "#34D399",
    c3: "#0F77E5",
    glow: "rgba(15, 119, 229, 0.55)",
    aura: "rgba(52, 211, 153, 0.20)",
  },
};

export function MissionIcon({ kind, size = 110, className = "" }: MissionIconProps) {
  const t = THEME[kind];
  const uid = `mi-${kind}-${size}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 120 120"
      className={`mission-svg mission-svg-${kind} ${className}`.trim()}
      role="img"
      aria-label={kind}
    >
      <defs>
        {/* Main multi-stop gradient */}
        <linearGradient id={`${uid}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.c1} />
          <stop offset="55%" stopColor={t.c2} />
          <stop offset="100%" stopColor={t.c3} />
        </linearGradient>

        {/* Glass/specular highlight gradient */}
        <linearGradient id={`${uid}-spec`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.85)" />
          <stop offset="100%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Soft aura halo behind the icon */}
        <radialGradient id={`${uid}-aura`} cx="50%" cy="50%" r="55%">
          <stop offset="0%" stopColor={t.aura} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Strong glow filter for the main glyph */}
        <filter id={`${uid}-glow`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="1.8" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Aura — pulses via CSS animation */}
      <circle
        className="mission-svg-aura"
        cx="60"
        cy="60"
        r="54"
        fill={`url(#${uid}-aura)`}
      />

      {/* Concentric decorative rings (back layer) */}
      <circle cx="60" cy="60" r="48" fill="none" stroke={`url(#${uid}-g)`} strokeWidth="0.8" opacity="0.35" strokeDasharray="2 4" />
      <circle cx="60" cy="60" r="44" fill="none" stroke={`url(#${uid}-g)`} strokeWidth="0.6" opacity="0.25" />

      {/* Icon glyph */}
      <g filter={`url(#${uid}-glow)`}>
        {kind === "mission" && <MissionGlyph uid={uid} />}
        {kind === "vision" && <VisionGlyph uid={uid} />}
        {kind === "values" && <ValuesGlyph uid={uid} />}
      </g>

      {/* Sparkle accents */}
      <Sparkle x={14} y={26} size={4} delay="0s" color={t.c2} />
      <Sparkle x={102} y={22} size={3} delay=".4s" color={t.c2} />
      <Sparkle x={18} y={96} size={3} delay=".8s" color={t.c1} />
      <Sparkle x={102} y={98} size={5} delay="1.2s" color={t.c1} />
    </svg>
  );
}

/** Tiny 4-point sparkle */
function Sparkle({
  x,
  y,
  size,
  color,
  delay,
}: {
  x: number;
  y: number;
  size: number;
  color: string;
  delay: string;
}) {
  return (
    <g
      className="mission-svg-sparkle"
      style={{ animationDelay: delay, transformOrigin: `${x}px ${y}px` }}
    >
      <path
        d={`M${x} ${y - size} L${x + size * 0.35} ${y - size * 0.35} L${x + size} ${y} L${x + size * 0.35} ${y + size * 0.35} L${x} ${y + size} L${x - size * 0.35} ${y + size * 0.35} L${x - size} ${y} L${x - size * 0.35} ${y - size * 0.35} Z`}
        fill={color}
        opacity="0.85"
      />
    </g>
  );
}

/** Mission — bullseye target with an arrow piercing the center. */
function MissionGlyph({ uid }: { uid: string }) {
  const grad = `url(#${uid}-g)`;
  return (
    <g>
      {/* Outer ring */}
      <circle cx="60" cy="60" r="28" fill="none" stroke={grad} strokeWidth="3.2" />
      {/* Middle ring */}
      <circle cx="60" cy="60" r="20" fill="none" stroke={grad} strokeWidth="2.8" opacity="0.85" />
      {/* Inner ring */}
      <circle cx="60" cy="60" r="12" fill="none" stroke={grad} strokeWidth="2.4" opacity="0.75" />
      {/* Bullseye fill */}
      <circle cx="60" cy="60" r="6" fill={grad} />
      {/* Bullseye specular */}
      <circle cx="58" cy="58" r="2" fill="#ffffff" opacity="0.9" />

      {/* Arrow shaft (drawn over the target on the diagonal) */}
      <line
        x1="68" y1="52" x2="100" y2="20"
        stroke={grad}
        strokeWidth="4"
        strokeLinecap="round"
      />
      {/* Arrow shaft inner highlight */}
      <line
        x1="68" y1="52" x2="100" y2="20"
        stroke="rgba(255,255,255,0.6)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
      {/* Arrow head */}
      <path d="M96 16 L108 12 L104 24 Z" fill={grad} stroke={`url(#${uid}-g)`} strokeWidth="0.5" />
      {/* Arrow fletching */}
      <path d="M68 52 L60 48 L64 56 Z" fill={grad} opacity="0.9" />
      <path d="M68 52 L64 44 L72 48 Z" fill={grad} opacity="0.6" />
    </g>
  );
}

/** Vision — detailed glowing light-bulb with filament, glass shine and rays. */
function VisionGlyph({ uid }: { uid: string }) {
  const grad = `url(#${uid}-g)`;
  return (
    <g>
      {/* Rays — long + short alternating around the bulb */}
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * 30 * Math.PI) / 180 - Math.PI / 2;
        const isLong = i % 2 === 0;
        const r1 = isLong ? 34 : 36;
        const r2 = isLong ? 48 : 42;
        const cx = 60;
        const cy = 50;
        return (
          <line
            key={i}
            x1={cx + Math.cos(a) * r1}
            y1={cy + Math.sin(a) * r1}
            x2={cx + Math.cos(a) * r2}
            y2={cy + Math.sin(a) * r2}
            stroke={grad}
            strokeWidth={isLong ? 3 : 1.6}
            strokeLinecap="round"
            opacity={isLong ? 0.95 : 0.6}
          />
        );
      })}

      {/* Bulb glow halo */}
      <circle cx="60" cy="50" r="22" fill={grad} opacity="0.18" />

      {/* Bulb glass body */}
      <path
        d="M60 22
           C46 22, 36 32, 36 46
           C36 55, 41 60, 46 65
           L46 76
           L74 76
           L74 65
           C79 60, 84 55, 84 46
           C84 32, 74 22, 60 22 Z"
        fill={grad}
        stroke={grad}
        strokeWidth="1"
      />

      {/* Inside filament — twin loops */}
      <path
        d="M50 50 C50 44, 58 42, 60 50 C62 58, 70 56, 70 50"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.95"
      />
      {/* Filament inner glow */}
      <circle cx="60" cy="52" r="3.5" fill="#ffffff" opacity="0.6" />
      <circle cx="60" cy="52" r="1.6" fill="#ffffff" />

      {/* Glass shine highlight */}
      <path
        d="M44 36 C42 42, 41 48, 42 54"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.4"
        strokeLinecap="round"
        opacity="0.8"
      />
      <path
        d="M50 28 C48 30, 47 32, 46 34"
        fill="none"
        stroke="#ffffff"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.6"
      />

      {/* Base threads (1) */}
      <rect x="46" y="78" width="28" height="4" rx="1.2" fill="#475569" />
      <rect x="46" y="78" width="28" height="4" rx="1.2" fill="url(#mi-vision-thread)" opacity="0.4" />
      {/* Base threads (2) */}
      <rect x="48" y="84" width="24" height="3.5" rx="1.2" fill="#334155" />
      {/* Base bottom contact */}
      <rect x="52" y="89" width="16" height="3.5" rx="1.6" fill="#0f172a" />

      {/* Spec dot on the bulb */}
      <circle cx="48" cy="38" r="2.2" fill="#ffffff" opacity="0.9" />
    </g>
  );
}

/** Values — two hands clasping over a soft heart silhouette. */
function ValuesGlyph({ uid }: { uid: string }) {
  const grad = `url(#${uid}-g)`;
  return (
    <g>
      {/* Soft heart shape behind */}
      <path
        d="M60 92
           C 60 92, 24 72, 24 50
           C 24 38, 32 30, 42 30
           C 50 30, 56 35, 60 42
           C 64 35, 70 30, 78 30
           C 88 30, 96 38, 96 50
           C 96 72, 60 92, 60 92 Z"
        fill={grad}
        opacity="0.18"
      />
      {/* Heart outline */}
      <path
        d="M60 90
           C 60 90, 28 72, 28 52
           C 28 41, 35 34, 44 34
           C 51 34, 56 38, 60 44
           C 64 38, 69 34, 76 34
           C 85 34, 92 41, 92 52
           C 92 72, 60 90, 60 90 Z"
        fill="none"
        stroke={grad}
        strokeWidth="1.5"
        opacity="0.55"
      />

      {/* Right arm/sleeve */}
      <path
        d="M88 64
           L96 56
           L100 60
           L92 70 Z"
        fill={grad}
        opacity="0.7"
      />
      {/* Left arm/sleeve */}
      <path
        d="M32 64
           L24 56
           L20 60
           L28 70 Z"
        fill={grad}
        opacity="0.7"
      />

      {/* Left hand */}
      <path
        d="M28 64
           Q 30 56, 38 56
           L 52 60
           Q 58 64, 60 68
           Q 56 74, 50 76
           L 36 76
           Q 28 74, 28 64 Z"
        fill={grad}
        stroke={grad}
        strokeWidth="1"
      />
      {/* Left finger creases */}
      <path d="M38 60 L42 62" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
      <path d="M40 64 L46 66" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
      <path d="M42 68 L48 70" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />

      {/* Right hand */}
      <path
        d="M92 64
           Q 90 56, 82 56
           L 68 60
           Q 62 64, 60 68
           Q 64 74, 70 76
           L 84 76
           Q 92 74, 92 64 Z"
        fill={grad}
        stroke={grad}
        strokeWidth="1"
      />
      {/* Right finger creases */}
      <path d="M82 60 L78 62" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
      <path d="M80 64 L74 66" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />
      <path d="M78 68 L72 70" stroke="rgba(255,255,255,0.45)" strokeWidth="1" strokeLinecap="round" />

      {/* Clasp / handshake highlight */}
      <circle cx="60" cy="68" r="3.4" fill="#ffffff" opacity="0.9" />
      <circle cx="60" cy="68" r="6" fill="none" stroke="#ffffff" strokeWidth="1" opacity="0.4" />
    </g>
  );
}
