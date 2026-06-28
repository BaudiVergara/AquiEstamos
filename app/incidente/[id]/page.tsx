import { supabase } from "@/lib/supabase";
import StatusSelector from "@/components/StatusSelector";

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

  /* const { data: photos } = await supabase
    .from("incident_photos")
    .select("*")
    .eq("incident_id", id); */

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
        <h1 className="text-4xl font-bold text-blue-700">🚨 Incidente</h1>

        <div className="mt-8 bg-white rounded-xl shadow p-6">
          <h2 className="text-2xl font-semibold">
            📍 {incident.address || "Ubicación no especificada"}
          </h2>

          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">👥 Personas estimadas</p>
              <p className="text-2xl font-bold">{incident.people_estimated}</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4">
              <p className="text-sm text-gray-500">🎯 Nivel de certeza</p>
              <p className="text-xl font-semibold">{incident.certainty}</p>
              <p className="mt-2">
<div className="mt-4">
  <p className="font-semibold mb-2">
    🚦 Estado
  </p>

  <StatusSelector
    incidentId={incident.id}
    currentStatus={incident.status}
  />
</div>
</p>
            </div>

            <div className="bg-slate-50 rounded-lg p-4 md:col-span-2">
              <p className="text-sm text-gray-500">📅 Fecha del reporte</p>
              <p className="font-semibold">
                {new Date(incident.created_at).toLocaleString("es-VE")}
              </p>
            </div>
          </div>

          <div className="mt-6">
            <p className="text-sm text-gray-500 mb-2">📝 Observaciones</p>

            <div className="bg-slate-50 rounded-lg p-4">
              {incident.notes || "No se agregaron observaciones."}
            </div>
          </div>

          {/*{photos && photos.length > 0 && (

  <div className="mt-8">

    <h2 className="text-2xl font-bold mb-4">
      📷 Fotografías
    </h2>

    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

      {photos.map((photo) => (

        <img
          key={photo.id}
          src={photo.photo_url}
          alt="Fotografía del incidente"
          className="rounded-xl shadow border w-full"
        />

      ))}

    </div>

  </div> */}



          <h2 className="text-2xl font-bold mb-6">👥 Personas reportadas</h2>

          {persons?.length === 0 && <p>No hay personas identificadas.</p>}

          {persons?.map((person) => (
            <div key={person.id} className="border-b last:border-0 py-4">
              <h3 className="font-semibold text-lg">
                {person.name || "Persona sin identificar"}
              </h3>

              <p>Edad: {person.age || "No conocida"}</p>

              <p>Sexo: {person.sex || "No conocido"}</p>

              <p>
                Condiciones médicas:{" "}
                {person.medical_conditions || "Ninguna reportada"}
              </p>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
