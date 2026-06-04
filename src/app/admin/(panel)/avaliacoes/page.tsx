import { prisma } from "@/lib/prisma";
import { timeAgoBR } from "@/lib/utils";
import { ReviewActions } from "./ReviewActions";

export default async function AdminReviewsPage() {
  const [pending, approved] = await Promise.all([
    prisma.review.findMany({
      where: { isApproved: false },
      include: { professional: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
    }),
    prisma.review.findMany({
      where: { isApproved: true },
      include: { professional: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 50,
    }),
  ]);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Avaliações</h1>
          <p>{pending.length} pendentes · {approved.length} aprovadas</p>
        </div>
      </div>

      {pending.length > 0 && (
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>⏳ Aguardando aprovação ({pending.length})</h3>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avaliador</th>
                <th>Profissional</th>
                <th>Nota</th>
                <th>Comentário</th>
                <th>Quando</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {pending.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.reviewerName}</strong></td>
                  <td>{r.professional.name}</td>
                  <td>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                  <td style={{ maxWidth: 320 }}>
                    {r.comment.length > 100 ? r.comment.slice(0, 100) + "..." : r.comment}
                  </td>
                  <td>{timeAgoBR(r.createdAt)}</td>
                  <td>
                    <ReviewActions id={r.id} isApproved={false} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      <div className="admin-panel">
        <div className="admin-panel-header">
          <h3>✓ Aprovadas ({approved.length})</h3>
        </div>
        {approved.length === 0 ? (
          <p style={{ padding: "2rem", textAlign: "center", color: "var(--c-gray-600)" }}>
            Nenhuma avaliação aprovada ainda.
          </p>
        ) : (
          <table className="admin-table">
            <thead>
              <tr>
                <th>Avaliador</th>
                <th>Profissional</th>
                <th>Nota</th>
                <th>Comentário</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {approved.map((r) => (
                <tr key={r.id}>
                  <td><strong>{r.reviewerName}</strong></td>
                  <td>{r.professional.name}</td>
                  <td>{"★".repeat(r.rating)}{"☆".repeat(5 - r.rating)}</td>
                  <td style={{ maxWidth: 320 }}>
                    {r.comment.length > 100 ? r.comment.slice(0, 100) + "..." : r.comment}
                  </td>
                  <td>
                    <ReviewActions id={r.id} isApproved={true} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}
