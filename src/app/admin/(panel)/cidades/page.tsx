import { prisma } from "@/lib/prisma";

export default async function AdminCitiesPage() {
  const cities = await prisma.city.findMany({
    orderBy: { name: "asc" },
    include: { _count: { select: { professionals: true } } },
  });

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Cidades ({cities.length})</h1>
          <p>Cidades atendidas pelo AchouPro</p>
        </div>
      </div>

      <div className="admin-panel">
        <table className="admin-table">
          <thead>
            <tr>
              <th>Cidade</th>
              <th>Estado</th>
              <th>Slug</th>
              <th>Profissionais</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {cities.map((c) => (
              <tr key={c.id}>
                <td><strong>{c.name}</strong></td>
                <td>{c.state}</td>
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
        💡 <strong>Fase 2:</strong> Expansão multi-estado já preparada na arquitetura — basta cadastrar novas cidades.
      </p>
    </>
  );
}
