"use client";

import { useState } from "react";
import { useEffect } from "react";
import { supabase } from "@/lib/supabase";
import Link from "next/link";

export default function BuscarPage() {

  const [search, setSearch] = useState("");
  const [results, setResults] = useState<any[]>([]);
  async function searchPersons() {

  if (search.trim() === "") {
    setResults([]);
    return;
  }

  const { data, error } = await supabase
    .from("persons")
    .select(`
      *,
      incidents(*)
    `)
    .ilike("name", `%${search}%`);

  if (error) {
    console.error(error);
    return;
  }

  setResults(data || []);

}
  useEffect(() => {

async function searchPersons() {

  if (search.trim() === "") {
    setResults([]);
    return;
  }

  const { data, error } = await supabase
    .from("persons")
    .select(`
      *,
      incidents(*)
    `)
    .ilike("name", `%${search}%`);

  if (error) {
    console.error(error);
    return;
  }

  setResults(data || []);

}


}, [search]);

  return (

    <main className="min-h-screen bg-slate-100 p-6">

      <div className="max-w-2xl mx-auto">

        <h1 className="text-4xl font-bold text-blue-700">
          🔍 Buscar Personas
        </h1>

        <p className="mt-2 text-gray-600">
          Busca una persona por nombre.
        </p>

        <input
          type="text"
          placeholder="Ej: Juan Pérez"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full mt-8 border rounded-lg p-3"
        />

        <button
  onClick={searchPersons}
  className="mt-4 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
>
  🔍 Buscar
</button>

<div className="mt-8 space-y-4">

  {results.map((person) => (

    <div
      key={person.id}
      className="bg-white rounded-xl shadow p-5 border"
    >

      <h2 className="text-xl font-bold">
        👤 {person.name}
      </h2>

      <p className="mt-2">
        📍 {person.incidents.address}
      </p>

      <p>
        👥 Personas estimadas: {person.incidents.people_estimated}
      </p>

      <p>
        📝 {person.incidents.notes}
      </p>

      <Link
  href={`/incidente/${person.incident_id}`}
  className="inline-block mt-4 bg-blue-600 text-white px-5 py-2 rounded-lg hover:bg-blue-700"
>
  🗺️ Ver incidente
</Link>

    </div>

  ))}

</div>


      </div>

    </main>

  );

}