import { supabase } from "@/lib/supabase";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function IncidentePage({ params }: Props) {

  const { id } = await params;

  const { data: incident, error } = await supabase
  .from("incidents")
  .select("*")
  .eq("id", id)
  .single();

  const { data: persons } = await supabase
  .from("persons")
  .select("*")
  .eq("incident_id", id);

if (error || !incident) {
  return (
    <main className="p-8">
      <h1 className="text-3xl font-bold text-red-600">
        Incidente no encontrado
      </h1>
    </main>
  );
}

  return (

<main className="min-h-screen bg-slate-100 p-8">

  <div className="max-w-3xl mx-auto">

    <h1 className="text-4xl font-bold text-blue-700">
      🚨 Incidente
    </h1>

    <div className="mt-8 bg-white rounded-xl shadow p-6">

      <h2 className="text-2xl font-semibold">
        📍 {incident.address}
      </h2>

      <p className="mt-4">
        👥 Personas estimadas: {incident.people_estimated}
      </p>

      <p className="mt-2">
        📝 {incident.notes}
      </p>

    </div>

    <div className="mt-8 bg-white rounded-xl shadow p-6">

  <h2 className="text-2xl font-bold mb-6">
    👥 Personas reportadas
  </h2>

  {persons?.length === 0 && (
    <p>No hay personas identificadas.</p>
  )}

  {persons?.map((person) => (

    <div
      key={person.id}
      className="border-b last:border-0 py-4"
    >

      <h3 className="font-semibold text-lg">
        {person.name || "Persona sin identificar"}
      </h3>

      <p>Edad: {person.age || "No conocida"}</p>

      <p>Sexo: {person.sex || "No conocido"}</p>

      <p>
        Condiciones médicas:
        {" "}
        {person.medical_conditions || "Ninguna reportada"}
      </p>

    </div>

  ))}

</div>

  </div>

</main>

  );

}