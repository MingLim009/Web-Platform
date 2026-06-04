"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export function ReviewForm({ professionalId, professionalName }: { professionalId: string; professionalName: string }) {
  const router = useRouter();
  const [name, setName] = useState("");
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!name.trim() || !comment.trim()) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/avaliacoes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          professionalId,
          reviewerName: name.trim(),
          rating,
          comment: comment.trim(),
        }),
      });

      if (!res.ok) {
        const data = await res.json().catch(() => ({}));
        throw new Error(data.error || "Erro ao enviar avaliação");
      }

      setSuccess(true);
      setName("");
      setComment("");
      setRating(5);
      router.refresh();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro desconhecido");
    } finally {
      setLoading(false);
    }
  }

  if (success) {
    return (
      <div className="review-success">
        <strong>✓ Avaliação enviada!</strong>
        <p>Obrigado pelo feedback. Após análise, ela será publicada.</p>
        <button type="button" onClick={() => setSuccess(false)} className="btn btn-ghost btn-sm">
          Enviar outra
        </button>
      </div>
    );
  }

  return (
    <form className="review-form" onSubmit={handleSubmit}>
      <h3>Deixe sua avaliação</h3>
      <p style={{ color: "var(--c-gray-600)", fontSize: ".875rem", marginBottom: "1rem" }}>
        Já contratou {professionalName.split(" ")[0]}? Compartilhe sua experiência.
      </p>

      <div className="form-row">
        <label>
          Seu nome
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            maxLength={60}
            placeholder="João Silva"
          />
        </label>

        <label>
          Sua nota (1 a 5)
          <div className="rating-input">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                type="button"
                className={`star-btn${n <= rating ? " active" : ""}`}
                onClick={() => setRating(n)}
                aria-label={`${n} estrelas`}
              >
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2l2.39 7.26L22 9.27l-5 4.87L18.18 22 12 18.27 5.82 22 7 14.14 2 9.27l7.61-2.01z" />
                </svg>
              </button>
            ))}
          </div>
        </label>
      </div>

      <label>
        Comentário
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          required
          maxLength={1000}
          rows={4}
          placeholder="Conte como foi a experiência..."
        />
      </label>

      {error && <p style={{ color: "#dc2626", fontSize: ".875rem" }}>{error}</p>}

      <button type="submit" className="btn btn-primary" disabled={loading}>
        {loading ? "Enviando..." : "Enviar avaliação"}
      </button>
    </form>
  );
}
