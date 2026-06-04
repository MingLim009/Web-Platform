/** Animação 3D estilo PeachWeb (partículas + anéis, tons quentes) */
export function drawPeachHeroFrame(
  ctx: CanvasRenderingContext2D,
  w: number,
  h: number,
  t: number,
  reduced: boolean
) {
  const time = reduced ? 0 : t;

  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#fffbf7");
  bg.addColorStop(0.5, "#fff4ec");
  bg.addColorStop(1, "#ffedbc");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  const cx = w * 0.5;
  const cy = h * 0.45;

  for (let ring = 0; ring < 5; ring++) {
    const radius = 40 + ring * 36 + Math.sin(time * 0.8 + ring) * 8;
    const alpha = 0.08 + ring * 0.04;
    ctx.beginPath();
    ctx.arc(cx, cy, radius, 0, Math.PI * 2);
    ctx.strokeStyle = `rgba(237, 66, 100, ${alpha})`;
    ctx.lineWidth = 1.5;
    ctx.stroke();
  }

  const particles = 28;
  for (let i = 0; i < particles; i++) {
    const angle = (i / particles) * Math.PI * 2 + time * 0.4;
    const dist = 80 + (i % 7) * 22 + Math.sin(time + i) * 15;
    const px = cx + Math.cos(angle) * dist;
    const py = cy + Math.sin(angle) * dist * 0.85;
    const size = 3 + (i % 4);
    const g = ctx.createRadialGradient(px, py, 0, px, py, size * 4);
    const warm = i % 3 === 0;
    g.addColorStop(0, warm ? "rgba(237,66,100,0.55)" : "rgba(255,201,168,0.65)");
    g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.beginPath();
    ctx.arc(px, py, size * 4, 0, Math.PI * 2);
    ctx.fill();
  }

  if (!reduced) {
    for (let i = 0; i < 6; i++) {
      const y = ((time * 0.12 + i * 0.16) % 1) * h;
      const alpha = 0.04 + (i % 3) * 0.02;
      ctx.strokeStyle = `rgba(255, 140, 100, ${alpha})`;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(w, y + 30);
      ctx.stroke();
    }
  }
}
