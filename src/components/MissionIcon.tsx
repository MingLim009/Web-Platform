"use client";

/**
 * Cool gradient SVG icons replacing the flat emojis 🎯💡🤝 on /sobre.
 * Each icon uses its own multi-stop gradient, soft glow filter and a
 * concentric ring backdrop so they read as premium UI rather than
 * generic emoji.
 */

type Kind = "mission" | "vision" | "values";

type MissionIconProps = {
  kind: Kind;
  size?: number;
  className?: string;
};

const THEME: Record<Kind, { from: string; to: string; ring: string; glow: string }> = {
  mission: {
    from: "#FF8A2C",
    to: "#E11D48",
    ring: "rgba(255, 138, 44, 0.18)",
    glow: "rgba(255, 138, 44, 0.45)",
  },
  vision: {
    from: "#FFD24A",
    to: "#F59E0B",
    ring: "rgba(255, 210, 74, 0.20)",
    glow: "rgba(245, 158, 11, 0.45)",
  },
  values: {
    from: "#34D399",
    to: "#0077FF",
    ring: "rgba(52, 211, 153, 0.18)",
    glow: "rgba(15, 119, 229, 0.45)",
  },
};

export function MissionIcon({ kind, size = 72, className = "" }: MissionIconProps) {
  const t = THEME[kind];
  const uid = `mi-${kind}-${size}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className={`mission-svg mission-svg-${kind} ${className}`.trim()}
      role="img"
      aria-label={kind}
    >
      <defs>
        <linearGradient id={`${uid}-g`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor={t.from} />
          <stop offset="100%" stopColor={t.to} />
        </linearGradient>
        <radialGradient id={`${uid}-ring`} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor={t.ring} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>
        <filter id={`${uid}-glow`} x="-25%" y="-25%" width="150%" height="150%">
          <feGaussianBlur stdDeviation="1.6" result="b" />
          <feMerge>
            <feMergeNode in="b" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Background concentric ring */}
      <circle cx="50" cy="50" r="46" fill={`url(#${uid}-ring)`} />
      <circle
        cx="50"
        cy="50"
        r="38"
        fill="none"
        stroke={`url(#${uid}-g)`}
        strokeWidth="1.2"
        strokeDasharray="2 5"
        opacity="0.55"
      />

      {/* Icon glyph */}
      <g filter={`url(#${uid}-glow)`}>
        {kind === "mission" && <MissionGlyph uid={uid} />}
        {kind === "vision" && <VisionGlyph uid={uid} />}
        {kind === "values" && <ValuesGlyph uid={uid} />}
      </g>
    </svg>
  );
}

/** 🎯 Mission — target / dartboard with an arrow piercing the bullseye. */
function MissionGlyph({ uid }: { uid: string }) {
  const grad = `url(#${uid}-g)`;
  return (
    <g>
      {/* Outer ring */}
      <circle cx="50" cy="50" r="22" fill="none" stroke={grad} strokeWidth="3" />
      {/* Middle ring */}
      <circle cx="50" cy="50" r="15" fill="none" stroke={grad} strokeWidth="2.5" opacity="0.85" />
      {/* Inner ring */}
      <circle cx="50" cy="50" r="8" fill="none" stroke={grad} strokeWidth="2" opacity="0.7" />
      {/* Bullseye */}
      <circle cx="50" cy="50" r="3.4" fill={grad} />

      {/* Arrow shaft */}
      <line x1="65" y1="35" x2="86" y2="14" stroke={grad} strokeWidth="3.2" strokeLinecap="round" />
      {/* Arrow head */}
      <path d="M82 12 L92 8 L88 18 Z" fill={grad} />
      {/* Arrow fletching */}
      <path d="M65 35 L58 32 L62 39 Z" fill={grad} opacity="0.85" />
      {/* Hit-spot highlight */}
      <circle cx="50" cy="50" r="1.4" fill="#ffffff" />
    </g>
  );
}

/** 💡 Vision — light bulb with rays. */
function VisionGlyph({ uid }: { uid: string }) {
  const grad = `url(#${uid}-g)`;
  return (
    <g>
      {/* Rays */}
      {[0, 60, 120, 180, 240, 300].map((deg) => {
        const a = (deg * Math.PI) / 180;
        const x1 = 50 + Math.cos(a) * 26;
        const y1 = 38 + Math.sin(a) * 26;
        const x2 = 50 + Math.cos(a) * 34;
        const y2 = 38 + Math.sin(a) * 34;
        return (
          <line
            key={deg}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke={grad}
            strokeWidth="2.6"
            strokeLinecap="round"
            opacity="0.8"
          />
        );
      })}

      {/* Bulb glass */}
      <path
        d="M50 22
           C40 22, 32 30, 32 40
           C32 47, 36 51, 40 55
           L40 64
           L60 64
           L60 55
           C64 51, 68 47, 68 40
           C68 30, 60 22, 50 22 Z"
        fill={grad}
        stroke={grad}
        strokeWidth="1"
      />
      {/* Inner shine on bulb */}
      <path
        d="M42 30 C40 34, 39 39, 39 43"
        fill="none"
        stroke="#ffffff"
        strokeWidth="2.2"
        strokeLinecap="round"
        opacity="0.85"
      />

      {/* Base threads */}
      <rect x="40" y="66" width="20" height="3" rx="1" fill="#475569" />
      <rect x="42" y="71" width="16" height="2.5" rx="1" fill="#475569" />
      {/* Base bottom contact */}
      <rect x="44" y="76" width="12" height="3" rx="1.5" fill="#1f2937" />
    </g>
  );
}

/** 🤝 Values — two hands forming a heart-shaped handshake. */
function ValuesGlyph({ uid }: { uid: string }) {
  const grad = `url(#${uid}-g)`;
  return (
    <g>
      {/* Heart background */}
      <path
        d="M50 76
           C 50 76, 22 60, 22 42
           C 22 32, 30 26, 38 26
           C 44 26, 48 30, 50 34
           C 52 30, 56 26, 62 26
           C 70 26, 78 32, 78 42
           C 78 60, 50 76, 50 76 Z"
        fill={grad}
        opacity="0.18"
      />

      {/* Left hand */}
      <path
        d="M22 56
           L35 46
           L46 50
           L52 56
           L46 64
           L34 66
           L22 64 Z"
        fill={grad}
        stroke={grad}
        strokeWidth="1"
      />
      {/* Left wrist cuff */}
      <rect x="18" y="60" width="10" height="6" rx="1.2" fill={grad} opacity="0.7" />

      {/* Right hand */}
      <path
        d="M78 56
           L65 46
           L54 50
           L48 56
           L54 64
           L66 66
           L78 64 Z"
        fill={grad}
        stroke={grad}
        strokeWidth="1"
      />
      {/* Right wrist cuff */}
      <rect x="72" y="60" width="10" height="6" rx="1.2" fill={grad} opacity="0.7" />

      {/* Clasp highlight */}
      <circle cx="50" cy="56" r="2.6" fill="#ffffff" opacity="0.9" />
    </g>
  );
}
