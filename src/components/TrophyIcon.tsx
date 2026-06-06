"use client";

/**
 * Championship trophy SVG — gold / silver / bronze variants.
 *
 * Inspired by the reference image the client provided: elegant cup with
 * decorative handles, laurel-wreath crown on top, ornate body and a
 * wooden base with an engraved metal plate. Replaces the flat 🥇🥈🥉
 * emoji that was previously used for the WeeklyTop podium ranking.
 *
 * All visuals are pure SVG (gradients + filters), so they scale crisply
 * and animate smoothly.
 */

type Rank = 1 | 2 | 3;

type TrophyIconProps = {
  rank: Rank;
  size?: number;
  className?: string;
  ariaLabel?: string;
};

const PALETTES: Record<
  Rank,
  {
    light: string;
    mid: string;
    deep: string;
    shadow: string;
    rim: string;
    glow: string;
    glowOuter: string;
  }
> = {
  // Gold — boosted brightness + hot white core
  1: {
    light: "#FFFCE0",
    mid: "#FFD24A",
    deep: "#C58400",
    shadow: "#8A5A00",
    rim: "#FFF6B8",
    glow: "rgba(255, 213, 75, 0.95)",
    glowOuter: "rgba(255, 173, 30, 0.55)",
  },
  2: {
    light: "#FBFCFE",
    mid: "#D1D9E3",
    deep: "#7C8595",
    shadow: "#4F5763",
    rim: "#EEF1F7",
    glow: "rgba(220, 230, 245, 0.85)",
    glowOuter: "rgba(170, 185, 205, 0.45)",
  },
  3: {
    light: "#F8D2B0",
    mid: "#D08245",
    deep: "#8A4A1F",
    shadow: "#5A2F12",
    rim: "#EFB888",
    glow: "rgba(235, 152, 78, 0.85)",
    glowOuter: "rgba(190, 100, 40, 0.45)",
  },
};

export function TrophyIcon({
  rank,
  size = 64,
  className = "",
  ariaLabel,
}: TrophyIconProps) {
  const palette = PALETTES[rank];
  const uid = `trophy-${rank}-${size}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      viewBox="0 0 100 120"
      className={`trophy-svg trophy-rank-${rank} ${className}`.trim()}
      role={ariaLabel ? "img" : "presentation"}
      aria-label={ariaLabel}
      aria-hidden={!ariaLabel}
      style={{ overflow: "visible" }}
    >
      <defs>
        {/* Cup body — vertical metallic gradient with brighter top */}
        <linearGradient id={`${uid}-cup`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#ffffff" />
          <stop offset="15%" stopColor={palette.light} />
          <stop offset="45%" stopColor={palette.mid} />
          <stop offset="75%" stopColor={palette.deep} />
          <stop offset="100%" stopColor={palette.shadow} />
        </linearGradient>

        {/* Specular highlight running down the left side of the cup */}
        <linearGradient id={`${uid}-spec`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
          <stop offset="30%" stopColor="rgba(255,255,255,0.35)" />
          <stop offset="60%" stopColor="rgba(255,255,255,0)" />
        </linearGradient>

        {/* Base — warm wood tone */}
        <linearGradient id={`${uid}-base`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#5A3A22" />
          <stop offset="55%" stopColor="#3D2614" />
          <stop offset="100%" stopColor="#1F1207" />
        </linearGradient>

        {/* Brass plate on the base */}
        <linearGradient id={`${uid}-plate`} x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stopColor="#FFE48A" />
          <stop offset="100%" stopColor="#B98A1F" />
        </linearGradient>

        {/* Two-stop radial aura: hot core + soft outer halo */}
        <radialGradient id={`${uid}-aura`} cx="50%" cy="40%" r="65%">
          <stop offset="0%" stopColor={palette.glow} />
          <stop offset="55%" stopColor={palette.glowOuter} />
          <stop offset="100%" stopColor="rgba(0,0,0,0)" />
        </radialGradient>

        {/* Strong drop-shadow / glow filter for the cup */}
        <filter id={`${uid}-shine`} x="-50%" y="-50%" width="200%" height="200%">
          <feGaussianBlur stdDeviation="0.6" result="b1" />
          <feGaussianBlur stdDeviation="2" result="b2" />
          <feMerge>
            <feMergeNode in="b2" />
            <feMergeNode in="b1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>

        {/* Extra-strong outer glow filter for the gold rank only */}
        <filter id={`${uid}-superglow`} x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="2.5" result="g1" />
          <feGaussianBlur stdDeviation="6"   result="g2" />
          <feGaussianBlur stdDeviation="10"  result="g3" />
          <feMerge>
            <feMergeNode in="g3" />
            <feMergeNode in="g2" />
            <feMergeNode in="g1" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>

      {/* Soft aura glow — bigger ellipse so it spills past the SVG bounds */}
      <ellipse
        className="trophy-aura"
        cx="50"
        cy="48"
        rx="58"
        ry="56"
        fill={`url(#${uid}-aura)`}
      />

      {/* Rays of light radiating out from behind the cup — gold rank only */}
      {rank === 1 && (
        <g className="trophy-rays" opacity="0.85">
          {Array.from({ length: 14 }).map((_, i) => {
            const a = (i * (360 / 14) * Math.PI) / 180 - Math.PI / 2;
            const cx = 50;
            const cy = 48;
            const r1 = 36;
            const r2 = 60;
            return (
              <line
                key={i}
                x1={cx + Math.cos(a) * r1}
                y1={cy + Math.sin(a) * r1}
                x2={cx + Math.cos(a) * r2}
                y2={cy + Math.sin(a) * r2}
                stroke={`url(#${uid}-cup)`}
                strokeWidth={1.4}
                strokeLinecap="round"
                opacity={0.55}
              />
            );
          })}
        </g>
      )}

      {/* Laurel-wreath crown on top of the lid */}
      <g
        className="trophy-laurel"
        fill={palette.mid}
        stroke={palette.deep}
        strokeWidth="0.6"
        filter={`url(#${uid}-shine)`}
      >
        {/* Left half of wreath */}
        <path d="M50 6 C41 6, 34 10, 30 16 C32 18, 36 18, 39 16 C37 13, 41 10, 45 9 C47 11, 49 12, 50 12 Z" />
        {/* Right half of wreath */}
        <path d="M50 6 C59 6, 66 10, 70 16 C68 18, 64 18, 61 16 C63 13, 59 10, 55 9 C53 11, 51 12, 50 12 Z" />
        {/* Central crown tip */}
        <circle cx="50" cy="6.5" r="2.4" />
        {/* Crown sparkle */}
        <circle cx="50" cy="6.5" r="0.9" fill="#ffffff" />
      </g>

      {/* Cup handles — left */}
      <path
        d="M22 38 C12 40, 8 50, 14 60 C18 66, 24 66, 28 62 L26 58 C22 60, 18 58, 18 52 C18 46, 22 44, 26 44 Z"
        fill={`url(#${uid}-cup)`}
        stroke={palette.deep}
        strokeWidth="0.6"
      />
      {/* Cup handles — right */}
      <path
        d="M78 38 C88 40, 92 50, 86 60 C82 66, 76 66, 72 62 L74 58 C78 60, 82 58, 82 52 C82 46, 78 44, 74 44 Z"
        fill={`url(#${uid}-cup)`}
        stroke={palette.deep}
        strokeWidth="0.6"
      />

      {/* Cup body — ornate vase shape (gold gets the super-glow filter) */}
      <path
        d="M28 32
           C28 28, 30 26, 34 26
           L66 26
           C70 26, 72 28, 72 32
           L72 50
           C72 60, 68 68, 60 72
           L58 78
           L42 78
           L40 72
           C32 68, 28 60, 28 50
           Z"
        fill={`url(#${uid}-cup)`}
        stroke={palette.deep}
        strokeWidth="0.9"
        filter={rank === 1 ? `url(#${uid}-superglow)` : `url(#${uid}-shine)`}
      />

      {/* Decorative ring around the rim of the cup */}
      <rect
        x="27"
        y="28"
        width="46"
        height="3.5"
        rx="1"
        fill={palette.rim}
        stroke={palette.deep}
        strokeWidth="0.4"
      />

      {/* Specular highlight on the cup body */}
      <path
        d="M34 30 L34 60 C34 64, 36 67, 40 70 L42 68 C38 65, 36 62, 36 58 L36 32 Z"
        fill={`url(#${uid}-spec)`}
        opacity="0.9"
      />

      {/* Small engraved star medallion on the front of the cup */}
      <g
        transform="translate(50 50)"
        fill={palette.light}
        stroke={palette.deep}
        strokeWidth="0.5"
      >
        <circle r="6.5" fill={palette.deep} />
        <path
          d="M0 -4 L1.2 -1.2 L4 -1.2 L1.8 0.6 L2.6 3.4 L0 1.8 L-2.6 3.4 L-1.8 0.6 L-4 -1.2 L-1.2 -1.2 Z"
          fill={palette.light}
        />
      </g>

      {/* Stem connecting cup to base */}
      <path
        d="M44 78 L42 88 L58 88 L56 78 Z"
        fill={`url(#${uid}-cup)`}
        stroke={palette.deep}
        strokeWidth="0.6"
      />

      {/* Wooden base */}
      <path
        d="M30 88 L70 88 L74 100 L26 100 Z"
        fill={`url(#${uid}-base)`}
        stroke="#1A0E05"
        strokeWidth="0.6"
      />

      {/* Engraved brass plate on the base */}
      <rect
        x="36"
        y="92"
        width="28"
        height="5"
        rx="0.6"
        fill={`url(#${uid}-plate)`}
        stroke="#7C5A12"
        strokeWidth="0.3"
      />
      <text
        x="50"
        y="95.7"
        textAnchor="middle"
        fontFamily="ui-sans-serif, system-ui, sans-serif"
        fontSize="3.2"
        fontWeight="700"
        fill="#3A2705"
        letterSpacing="0.2"
      >
        {rank === 1 ? "1° LUGAR" : rank === 2 ? "2° LUGAR" : "3° LUGAR"}
      </text>

      {/* Floor shadow under the base */}
      <ellipse
        cx="50"
        cy="104"
        rx="28"
        ry="3"
        fill="rgba(0,0,0,0.28)"
      />
    </svg>
  );
}
