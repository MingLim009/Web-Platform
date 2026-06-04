/**
 * Ícones SVG para cada categoria do AchouPro.
 * Estilo: linha consistente, viewBox 24×24, controle de tamanho via prop.
 */

type IconProps = { className?: string; size?: number; strokeWidth?: number };

const base = (props: IconProps) => ({
  width: props.size ?? 32,
  height: props.size ?? 32,
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: props.strokeWidth ?? 1.75,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  className: props.className,
});

const Eletricista = (p: IconProps) => (
  <svg {...base(p)}><path d="M13 2L4.09 12.97a.5.5 0 0 0 .39.81H11l-1 8.22a.5.5 0 0 0 .89.34L19.91 11.03a.5.5 0 0 0-.39-.81H13l1-8.22Z" fill="currentColor" stroke="none" /></svg>
);

const Diarista = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 2l-7 7" />
    <path d="M10 11l-6 6c-1 1-1 3 0 4s3 1 4 0l6-6" />
    <path d="M13 8l3 3" />
    <path d="M10 11l3 3" />
    <path d="M19 13l-6 6 2 2 6-6c1-1 1-3 0-4s-2-1-2 0Z" />
  </svg>
);

const Pedreiro = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M12 2 2 7l10 5 10-5-10-5Z" />
    <path d="M2 17l10 5 10-5" />
    <path d="M2 12l10 5 10-5" />
  </svg>
);

const PersonalTrainer = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M6.5 6.5 17.5 17.5" />
    <path d="m21 21-1-1" />
    <path d="m3 3 1 1" />
    <path d="m18 22 4-4" />
    <path d="m2 6 4-4" />
    <path d="m3 10 7-7" />
    <path d="m14 21 7-7" />
  </svg>
);

const Encanador = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76Z" />
  </svg>
);

const Manicure = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M9 11V5a2 2 0 0 1 4 0v6" />
    <path d="M5 11h14v6a4 4 0 0 1-4 4H9a4 4 0 0 1-4-4v-6Z" />
    <path d="M12 3v0" />
    <path d="m5 3 1 2" />
    <path d="m19 3-1 2" />
  </svg>
);

const ArCondicionado = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <path d="m4.93 4.93 14.14 14.14" />
    <path d="m19.07 4.93-14.14 14.14" />
    <path d="M12 6 9 3" />
    <path d="m12 6 3-3" />
    <path d="M12 18l-3 3" />
    <path d="m12 18 3 3" />
  </svg>
);

const Cuidador = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.29 1.51 4.04 3 5.5l7 7Z" />
    <path d="M12 5 9.04 7.96a2.17 2.17 0 0 0 0 3.08v0c.82.82 2.13.85 3 .07l2.07-1.9a2.82 2.82 0 0 1 3.79 0l2.96 2.66" />
    <path d="m18 15-2-2" />
    <path d="m15 18-2-2" />
  </svg>
);

const Mecanico = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M19 17h2c.6 0 1-.4 1-1v-3c0-.9-.7-1.7-1.5-1.9C18.7 10.6 16 10 16 10s-1.3-1.4-2.2-2.3c-.5-.4-1.1-.7-1.8-.7H5c-.6 0-1.1.4-1.4.9l-1.4 2.9A3.7 3.7 0 0 0 2 12v4c0 .6.4 1 1 1h2" />
    <circle cx="7" cy="17" r="2" />
    <path d="M9 17h6" />
    <circle cx="17" cy="17" r="2" />
  </svg>
);

const TecInformatica = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="3" y="4" width="18" height="12" rx="1.5" />
    <path d="M2 20h20" />
    <path d="M9 16v4" />
    <path d="M15 16v4" />
  </svg>
);

const Pintor = (p: IconProps) => (
  <svg {...base(p)}>
    <rect x="2" y="4" width="14" height="6" rx="1" />
    <path d="M16 7h3a2 2 0 0 1 2 2v3a2 2 0 0 1-2 2h-7a2 2 0 0 0-2 2v6" />
    <rect x="9" y="20" width="4" height="3" rx="1" />
  </svg>
);

const Jardineiro = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M11 20A7 7 0 0 1 9.8 6.1C15.5 5 17 4.48 19.2 2.3c.4 2.7.75 5.5.42 8.5-.5 4.6-4.13 8-9.62 9.2Z" />
    <path d="M2 21c0-3 1.85-5.36 5.08-6" />
  </svg>
);

const Cabeleireiro = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="6" cy="6" r="3" />
    <path d="m8.12 8.12 12.65 12.65" />
    <path d="M20 4 8.12 15.88" />
    <circle cx="6" cy="18" r="3" />
    <path d="M14.8 14.8 20 20" />
  </svg>
);

const Fretista = (p: IconProps) => (
  <svg {...base(p)}>
    <path d="M10 17h4V5H2v12h3" />
    <path d="M20 17h2v-3.34a4 4 0 0 0-1.17-2.83L19 9h-5v8h2" />
    <circle cx="7.5" cy="17.5" r="2.5" />
    <circle cx="17.5" cy="17.5" r="2.5" />
  </svg>
);

const Default = (p: IconProps) => (
  <svg {...base(p)}>
    <circle cx="12" cy="12" r="10" />
    <path d="M9 12l2 2 4-4" />
  </svg>
);

const ICONS: Record<string, (p: IconProps) => React.JSX.Element> = {
  eletricista: Eletricista,
  diarista: Diarista,
  pedreiro: Pedreiro,
  "personal-trainer": PersonalTrainer,
  encanador: Encanador,
  manicure: Manicure,
  "ar-condicionado": ArCondicionado,
  cuidador: Cuidador,
  mecanico: Mecanico,
  "tec-informatica": TecInformatica,
  pintor: Pintor,
  jardineiro: Jardineiro,
  cabeleireiro: Cabeleireiro,
  fretista: Fretista,
};

export function CategoryIcon({ slug, size = 32, strokeWidth, className }: { slug: string; size?: number; strokeWidth?: number; className?: string }) {
  const Component = ICONS[slug] || Default;
  return <Component size={size} strokeWidth={strokeWidth} className={className} />;
}
