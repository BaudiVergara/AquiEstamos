"use client";

import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import BackToHome from "@/components/BackToHome";

const MapPicker = dynamic(
  () => import("@/components/MapPicker"),
  {
    ssr: false,
  }
);

    const IncidentMap = dynamic(
  () => import("@/components/IncidentMap"),
  { ssr: false }
);

export default function MapaPage() {

  const [incidents, setIncidents] = useState<any[]>([]);

  useEffect(() => {

  async function loadIncidents() {

    const { data, error } = await supabase
      .from("incidents")
      .select("*");

    if (error) {
      console.error(error);
      return;
    }

    setIncidents(data || []);

  }

  loadIncidents();

}, []);

  return (

    <main className="min-h-screen bg-slate-100 p-6">

            <div className="mb-6">
              <BackToHome />
            </div>

      <div className="max-w-6xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700">
          🗺️ Mapa de Incidentes
        </h1>

        <p className="text-gray-600 mt-2">
          Visualiza todos los reportes registrados.
        </p>

        <div className="mt-8">

<IncidentMap incidents={incidents} />

        </div>

      </div>

<p className="mt-6 font-semibold">
  Incidentes cargados: {incidents.length}
</p>

    </main>

  );

}

