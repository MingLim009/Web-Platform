"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export function ReviewActions({ id, isApproved }: { id: string; isApproved: boolean }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  async function action(type: "approve" | "reject" | "delete") {
    if (type === "delete" && !confirm("Remover esta avaliação?")) return;

    setLoading(true);
    const res = await fetch(`/api/avaliacoes/${id}`, {
      method: type === "delete" ? "DELETE" : "PATCH",
      headers: { "Content-Type": "application/json" },
      body: type !== "delete" ? JSON.stringify({ isApproved: type === "approve" }) : undefined,
    });

    if (res.ok) {
      router.refresh();
    } else {
      alert("Erro");
      setLoading(false);
    }
  }

  return (
    <div className="table-actions">
      {!isApproved && (
        <button type="button" onClick={() => action("approve")} disabled={loading} title="Aprovar" style={{ color: "var(--c-green)" }}>
          ✓
        </button>
      )}
      {isApproved && (
        <button type="button" onClick={() => action("reject")} disabled={loading} title="Despublicar">
          🔕
        </button>
      )}
      <button type="button" onClick={() => action("delete")} disabled={loading} className="danger" title="Remover">
        🗑️
      </button>
    </div>
  );
}
