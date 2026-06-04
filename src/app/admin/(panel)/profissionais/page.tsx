import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { DeleteProButton } from "./DeleteProButton";

export default async function AdminProsPage() {
  const pros = await prisma.professional.findMany({
    include: { category: true, city: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Profissionais ({pros.length})</h1>
          <p>Gerencie todos os profissionais da plataforma</p>
        </div>
        <Link href="/admin/profissionais/novo" className="btn btn-primary">
          + Novo Profissional
        </Link>
      </div>

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Profissional</th>
              <th>Categoria</th>
              <th>Cidade</th>
              <th>Avaliação</th>
              <th>Status</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {pros.map((p) => (
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
                      <small>{p.title}</small>
                    </div>
                  </div>
                </td>
                <td>{p.category.name}</td>
                <td>{p.neighborhood ? `${p.neighborhood}, ${p.city.name}` : p.city.name}</td>
                <td>{p.rating.toFixed(1)} ★ ({p.reviewCount})</td>
                <td>
                  <span className={`status-pill ${p.isActive ? "active" : "pending"}`}>
                    {p.isActive ? "Ativo" : "Inativo"}
                  </span>
                </td>
                <td>
                  <div className="table-actions">
                    <Link href={`/profissional/${p.slug}`} target="_blank" title="Ver no site">👁️</Link>
                    <Link href={`/admin/profissionais/${p.id}`} title="Editar">✏️</Link>
                    <DeleteProButton id={p.id} name={p.name} />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
