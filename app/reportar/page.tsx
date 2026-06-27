"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";

const MapPicker = dynamic(
  () => import("@/components/MapPicker"),
  {
    ssr: false,
  }
);

export default function ReportarPage() {
  const [address, setAddress] = useState("");
  const [peopleEstimated, setPeopleEstimated] = useState("");
  const [certainty, setCertainty] = useState("Estoy seguro");
  const [notes, setNotes] = useState("");
  const [position, setPosition] = useState<{
  lat: number;
  lng: number;
} | null>(null);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const { error } = await supabase.from("incidents").insert({
      address,
      people_estimated: Number(peopleEstimated),
      certainty,
      notes,
      latitude: position?.lat,
      longitude: position?.lng,
    });

    if (error) {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
  return;
    }

    alert("✅ Reporte enviado correctamente");

    setAddress("");
    setPeopleEstimated("");
    setCertainty("Estoy seguro");
    setNotes("");
  }

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold text-red-600">
          🚨 Reportar Personas Atrapadas
        </h1>

        <p className="mt-2 text-gray-600">
          Registra la última ubicación donde sabes o crees que hay personas atrapadas.
        </p>

        <form
          onSubmit={handleSubmit}
          className="mt-8 space-y-6"
        >

          <div>
            <label className="font-semibold">
              Dirección
            </label>

            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Personas estimadas
            </label>

            <input
              type="number"
              value={peopleEstimated}
              onChange={(e) => setPeopleEstimated(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>

          <div>
            <label className="font-semibold">
              Nivel de certeza
            </label>

            <select
              value={certainty}
              onChange={(e) => setCertainty(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            >
              <option>Estoy seguro</option>
              <option>Creo que están allí</option>
              <option>No estoy seguro</option>
            </select>
          </div>

          <div>
            <label className="font-semibold">
              Observaciones
            </label>

            <textarea
              rows={5}
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full mt-2 border rounded-lg p-3"
            />
          </div>
          <div>
  <label className="font-semibold block mb-2">
    Ubicación en el mapa
  </label>

  <p className="text-sm text-gray-600 mb-3">
    Si no conoces la dirección exacta, marca el lugar en el mapa.
  </p>

  <MapPicker
    position={position}
    onSelect={setPosition}
  />

  {position && (
    <p className="mt-3 text-sm text-gray-600">
      Latitud: {position.lat.toFixed(6)}
      <br />
      Longitud: {position.lng.toFixed(6)}
    </p>
  )}
</div>

          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
          >
            Enviar Reporte
          </button>

        </form>

      </div>
    </main>
  );
}