"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

type Props = {
  incidentId: string;
  currentStatus: string;
};

export default function StatusSelector({
  incidentId,
  currentStatus,
}: Props) {
  const [status, setStatus] = useState(currentStatus);

  async function updateStatus(newStatus: string) {
    setStatus(newStatus);

    await supabase
      .from("incidents")
      .update({ status: newStatus })
      .eq("id", incidentId);
  }

  return (
<select
  value={status}
  onChange={(e) => updateStatus(e.target.value)}
  className={`border rounded-lg p-2 font-semibold text-white transition-colors ${
    status === "pending"
      ? "bg-yellow-500"
      : status === "rescuing"
      ? "bg-orange-500"
      : status === "rescued"
      ? "bg-green-600"
      : "bg-gray-700"
  }`}
>
      <option value="pending">🟡 Pendiente</option>
      <option value="rescuing">🟠 En rescate</option>
      <option value="rescued">🟢 Rescatado</option>
      <option value="closed">⚫ Cerrado</option>
    </select>
  );
}