"use client";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="pt-BR">
      <body style={{ fontFamily: "system-ui,sans-serif", padding: "2rem", textAlign: "center" }}>
        <h1>Algo deu errado</h1>
        <p style={{ color: "#64748b", marginBottom: "1.5rem" }}>
          {error.message || "Erro inesperado no AchouPro."}
        </p>
        <button
          type="button"
          onClick={() => reset()}
          style={{
            padding: "0.75rem 1.5rem",
            background: "#ff6a00",
            color: "#fff",
            border: 0,
            borderRadius: 8,
            cursor: "pointer",
            fontWeight: 600,
          }}
        >
          Tentar novamente
        </button>
      </body>
    </html>
  );
}
