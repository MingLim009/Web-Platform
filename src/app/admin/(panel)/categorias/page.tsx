import { prisma } from "@/lib/prisma";

export default async function AdminCategoriesPage() {
  const categories = await prisma.category.findMany({
    orderBy: { order: "asc" },
    include: { _count: { select: { professionals: true } } },
  });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Categorias ({categories.length})</h1>
          <p>Categorias de profissionais da plataforma</p>
        </div>
      </div>

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>#</th>
              <th>Nome</th>
              <th>Slug</th>
              <th>Profissionais</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((c) => (
              <tr key={c.id}>
                <td>{c.order}</td>
                <td><strong>{c.name}</strong></td>
                <td><code>{c.slug}</code></td>
                <td>{c._count.professionals}</td>
                <td>
                  <span className={`status-pill ${c.isActive ? "active" : "pending"}`}>
                    {c.isActive ? "Ativa" : "Inativa"}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <p style={{ marginTop: "1.5rem", padding: "1rem", background: "var(--c-blue-light)", borderRadius: 8, color: "var(--c-gray-700)", fontSize: ".875rem" }}>
        💡 <strong>Fase 2:</strong> Adicionar funcionalidade para criar, editar e desativar categorias direto pelo painel.
      </p>
    </>
  );
}
