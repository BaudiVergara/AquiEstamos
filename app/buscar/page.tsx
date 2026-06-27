"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

type Incident = {
  id: string;
  address: string;
  people_estimated: number;
  certainty: string;
  created_at: string;
};

export default function BuscarPage() {
  const [incidents, setIncidents] = useState<Incident[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadIncidents();
  }, []);

  async function loadIncidents() {
    const { data, error } = await supabase
      .from("incidents")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      console.error(error);
      return;
    }

    setIncidents(data);
    setLoading(false);
  }

  if (loading) {
    return <p className="p-8">Cargando...</p>;
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">

      <h1 className="text-4xl font-bold mb-8">
        Reportes
      </h1>

      <div className="space-y-4">

        {incidents.map((incident) => (

          <div
            key={incident.id}
            className="bg-white rounded-xl shadow p-5"
          >

            <h2 className="text-xl font-bold">
              {incident.address}
            </h2>

            <p>
              Personas estimadas: {incident.people_estimated}
            </p>

            <p>
              Nivel de certeza: {incident.certainty}
            </p>

            <p className="text-gray-500 text-sm">
              {new Date(incident.created_at).toLocaleString()}
            </p>

          </div>

        ))}

      </div>

    </main>
  );
}