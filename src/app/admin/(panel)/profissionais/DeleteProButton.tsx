"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function DeleteProButton({ id, name }: { id: string; name: string }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function handleDelete() {
    if (!confirm(`Tem certeza que deseja remover "${name}"?\n\nEsta ação não pode ser desfeita.`)) return;
    setLoading(true);
    const res = await fetch(`/api/profissionais/${id}`, { method: "DELETE" });
    if (res.ok) {
      router.refresh();
    } else {
      alert("Erro ao remover. Tente novamente.");
      setLoading(false);
    }
  }

  return (
    <button type="button" onClick={handleDelete} disabled={loading} className="danger" title="Remover">
      {loading ? "..." : "🗑️"}
    </button>
  );
}
