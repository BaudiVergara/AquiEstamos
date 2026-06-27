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
const [persons, setPersons] = useState([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

const { data, error } = await supabase
  .from("incidents")
  .insert({
    address,
    people_estimated: Number(peopleEstimated),
    certainty,
    notes,
    latitude: position?.lat,
    longitude: position?.lng,
  })
  .select()
  .single();
  console.log(data);

    if (error) {
  console.error(error);
  alert(JSON.stringify(error, null, 2));
  return;
    }

    if (persons.length > 0) {

  const personsToInsert = persons.map((person) => ({
    incident_id: data.id,
    name: person.name,
    age: person.age ? Number(person.age) : null,
    sex: person.sex,
    medical_conditions: person.medical_conditions,
    notes: person.notes,
  }));

  const { error: personsError } = await supabase
    .from("persons")
    .insert(personsToInsert);

  if (personsError) {
    console.error(personsError);
    alert("Error guardando las personas.");
    return;
  }

}

    alert("✅ Reporte enviado correctamente");

    setAddress("");
    setPeopleEstimated("");
    setCertainty("Estoy seguro");
    setNotes("");
  }
function addPerson() {
  setPersons([
    ...persons,
    {
      name: "",
      age: "",
      sex: "",
      medical_conditions: "",
      notes: "",
    },
  ]);
}
function updatePerson(
  index: number,
  field: string,
  value: string
) {
  const updated = [...persons];

  updated[index] = {
    ...updated[index],
    [field]: value,
  };

  setPersons(updated);
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
<h2 className="text-2xl font-bold mt-10">
  Personas reportadas
</h2>

<div className="space-y-6 mt-4">

<hr className="my-10" />

<h2 className="text-2xl font-bold">
  👤 Personas identificadas (Opcional)
</h2>

<p className="text-gray-600 mt-2 mb-6">
  Si conoces información de alguna persona atrapada puedes agregarla aquí.
  Si no conoces a nadie, simplemente envía el reporte.
</p>

  {persons.map((person, index) => (

    <div
      key={index}
      className="border rounded-xl p-5 bg-white"
    >

      <h3 className="font-semibold mb-4">
        Persona {index + 1}
      </h3>

      <input
        type="text"
        placeholder="Nombre (si se conoce)"
        value={person.name}
onChange={(e) =>
  updatePerson(index, "name", e.target.value)
}
        className="w-full border rounded-lg p-3 mb-3"
      />

      <input
  type="number"
  placeholder="Edad aproximada"
  value={person.age}
  onChange={(e) =>
    updatePerson(index, "age", e.target.value)
  }
  className="w-full border rounded-lg p-3 mb-3"
/>

<select
  value={person.sex}
  onChange={(e) =>
    updatePerson(index, "sex", e.target.value)
  }
  className="w-full border rounded-lg p-3 mb-3"
>
        <option value="">Sexo</option>
        <option>Hombre</option>
        <option>Mujer</option>
        <option>No binario</option>
        <option>No se sabe</option>
      </select>

<textarea
  placeholder="Condiciones médicas o información importante"
  value={person.medical_conditions}
  onChange={(e) =>
    updatePerson(
      index,
      "medical_conditions",
      e.target.value
    )
  }
  className="w-full border rounded-lg p-3"
/>

    </div>

  ))}

</div>

<div className="mt-8 flex flex-col gap-4">
<button
  type="button"
  onClick={addPerson}
  className="border border-blue-600 text-blue-600 px-5 py-3 rounded-lg hover:bg-blue-50"
>
  ➕ Agregar una persona
</button>

          <button
            type="submit"
            className="bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700"
          >
            Enviar Reporte
          </button>
</div>

        </form>

      </div>
    </main>
  );
}