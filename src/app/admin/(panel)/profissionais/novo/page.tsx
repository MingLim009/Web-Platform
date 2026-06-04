import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { ProForm } from "../ProForm";

export default async function NewProPage() {
  const [categories, cities] = await Promise.all([
    prisma.category.findMany({ where: { isActive: true }, orderBy: { order: "asc" } }),
    prisma.city.findMany({ where: { isActive: true }, orderBy: { name: "asc" } }),
  ]);

  return (
    <>
      <div className="admin-page-head">
        <div>
          <h1>Novo Profissional</h1>
          <p><Link href="/admin/profissionais">← Voltar para lista</Link></p>
        </div>
      </div>

      <div className="admin-panel" style={{ padding: "2rem" }}>
        <ProForm categories={categories} cities={cities} mode="create" />
      </div>
    </>
  );
}
