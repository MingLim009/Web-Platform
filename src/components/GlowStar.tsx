import { ShineStar } from "./ShineStar";

type GlowStarProps = {
  size?: number;
  className?: string;
};

/** Estrela com raios de brilho (nota média, badges) */
export function GlowStar({ size = 20, className = "" }: GlowStarProps) {
  return <ShineStar size={size} className={className} />;
}
