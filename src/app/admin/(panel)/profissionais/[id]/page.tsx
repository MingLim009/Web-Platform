import Link from "next/link";
import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { ProForm } from "../ProForm";

export default async function EditProPage({ params }: { params: { id: string } }) {
  const [pro, categories, cities] = await Promise.all([
    prisma.professional.findUnique({ where: { id: params.id } }),
    prisma.category.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.city.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  if (!pro) notFound();

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Editar: {pro.name}</h1>
          <p><Link href="/admin/profissionais">← Voltar para lista</Link></p>
        </div>
        <Link href={`/profissional/${pro.slug}`} target="_blank" className="btn btn-ghost">
          Ver no site ↗
        </Link>
      </div>

      <div className="admin-panel" style={{ padding: "2rem" }}>
        <ProForm categories={categories} cities={cities} mode="edit" initial={pro} />
      </div>
    </>
  );
}
