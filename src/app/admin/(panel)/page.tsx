import Link from "next/link";
import { getStats } from "@/lib/queries";
import { prisma } from "@/lib/prisma";
import { timeAgoBR } from "@/lib/utils";

export default async function AdminDashboard() {
  const [stats, recentPros, pendingReviews] = await Promise.all([
    getStats(),
    prisma.professional.findMany({
      include: { category: true, city: true },
      orderBy: { createdAt: "desc" },
      take: 10,
    }),
    prisma.review.findMany({
      where: { isApproved: false },
      include: { professional: { select: { name: true, slug: true } } },
      orderBy: { createdAt: "desc" },
      take: 5,
    }),
  ]);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Dashboard</h1>
          <p>Visão geral da plataforma AchouPro</p>
        </div>
        <Link href="/admin/profissionais/novo" className="btn btn-primary">
          + Novo Profissional
        </Link>
      </div>

      <div className="stat-cards">
        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-label">Profissionais Ativos</span>
            <div className="stat-icon">👥</div>
          </div>
          <div className="stat-value">{stats.totalPros}</div>
          <div className="stat-delta">Fase de lançamento</div>
        </div>

        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-label">Vagas Fundador Restantes</span>
            <div className="stat-icon">⭐</div>
          </div>
          <div className="stat-value">{stats.foundersRemaining}</div>
          <div className="stat-delta">{stats.foundersTaken} / 200 ocupadas</div>
        </div>

        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-label">Avaliações</span>
            <div className="stat-icon">⭐</div>
          </div>
          <div className="stat-value">{stats.totalReviews}</div>
          <div className="stat-delta">Média {stats.avgRating.toFixed(1)} ★</div>
        </div>

        <div className="stat-card">
          <div className="stat-head">
            <span className="stat-label">Aguardando aprovação</span>
            <div className="stat-icon">⏳</div>
          </div>
          <div className="stat-value">{pendingReviews.length}</div>
          <div className="stat-delta" style={{ color: "var(--c-orange)" }}>
            {pendingReviews.length > 0 ? "Revisar agora" : "Tudo em dia!"}
          </div>
        </div>
      </div>

      <div className="admin-grid-2">
        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Profissionais cadastrados ({stats.totalPros})</h3>
            <Link href="/admin/profissionais">Ver todos →</Link>
          </div>
          <table className="admin-table">
            <thead>
              <tr>
                <th>Profissional</th>
                <th>Categoria</th>
                <th>Cidade</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {recentPros.map((p) => (
                <tr key={p.id}>
                  <td>
                    <div className="user-cell">
                      {p.photoUrl ? (
                        <img src={p.photoUrl} alt="" />
                      ) : (
                        <div style={{ width: 36, height: 36, borderRadius: "50%", background: "var(--c-gray-200)" }} />
                      )}
                      <div>
                        <strong>{p.name}</strong>
                        <small>{p.email || "—"}</small>
                      </div>
                    </div>
                  </td>
                  <td>{p.category.name}</td>
                  <td>{p.neighborhood ? `${p.neighborhood}, ${p.city.name}` : p.city.name}</td>
                  <td>
                    <span className={`status-pill ${p.isActive ? "active" : "pending"}`}>
                      {p.isActive ? "Ativo" : "Inativo"}
                      {p.isFounder && " · Fundador"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="admin-panel">
          <div className="admin-panel-header">
            <h3>Avaliações pendentes ({pendingReviews.length})</h3>
            <Link href="/admin/avaliacoes">Ver todas →</Link>
          </div>
          {pendingReviews.length === 0 ? (
            <p style={{ padding: "2rem", textAlign: "center", color: "var(--c-gray-600)" }}>
              Nenhuma avaliação pendente.
            </p>
          ) : (
            <ul className="pending-reviews">
              {pendingReviews.map((r) => (
                <li key={r.id}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <strong>{r.reviewerName}</strong>
                    <span>{"★".repeat(r.rating)}</span>
                  </div>
                  <p style={{ fontSize: ".875rem", color: "var(--c-gray-700)", margin: "0 0 .25rem" }}>
                    {r.comment.length > 120 ? r.comment.slice(0, 120) + "..." : r.comment}
                  </p>
                  <small style={{ color: "var(--c-gray-500)" }}>
                    Para <Link href={`/profissional/${r.professional.slug}`}>{r.professional.name}</Link> · {timeAgoBR(r.createdAt)}
                  </small>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </>
  );
}
