"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";
import dynamic from "next/dynamic";
import BackToHome from "@/components/BackToHome";

const MapPicker = dynamic(() => import("@/components/MapPicker"), {
  ssr: false,
});

export default function ReportarPage() {
  const [address, setAddress] = useState("");
  const [peopleEstimated, setPeopleEstimated] = useState("");
  const [certainty, setCertainty] = useState("");
  const [notes, setNotes] = useState("");
  const [position, setPosition] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [locationError, setLocationError] = useState("");
  const [certaintyError, setCertaintyError] = useState("");

  type Person = {
    name: string;
    age: string;
    sex: string;
    medical_conditions: string;
    notes: string;
  };

  const [persons, setPersons] = useState<Person[]>([]);
  const [photos, setPhotos] = useState<File[]>([]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    setLocationError("");
    setCertaintyError("");

    if (!position) {
      setLocationError(
        "📍 Debes marcar la ubicación en el mapa antes de enviar el reporte."
      );
      return;
    }

    if (!certainty) {
      setCertaintyError("🎯 Debes seleccionar el nivel de certeza.");
      return;
    }
    if (!certainty) {
      return;
    }

    setLoading(true);
    //setSuccessMessage("");

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

    if (error) {
      console.error(error);
      alert(JSON.stringify(error, null, 2));
      return;
    }

    if (persons.length > 0) {
    }

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
      setLoading(false);
    }

    
  if (photos.length > 0) {

  const photo = photos[0];

  const fileName = `${data.id}/${photo.name}`;

  const { error: uploadError } = await supabase.storage
    .from("incident-photos")
    .upload(fileName, photo);

  if (uploadError) {
    console.error(uploadError);
  } else {
    console.log("✅ Foto subida");
  }

  const { data: publicUrl } = supabase.storage
  .from("incident-photos")
  .getPublicUrl(fileName);

await supabase
  .from("incident_photos")
  .insert({
    incident_id: data.id,
    photo_url: publicUrl.publicUrl,
  });

} 

    setSuccessMessage(
      "✅ Reporte enviado correctamente. Gracias por tu ayuda."
    );
    setTimeout(() => {
      setSuccessMessage("");
    }, 10000);

    setAddress("");
    setPeopleEstimated("");
    setCertainty("");
    setNotes("");
    setPersons([]);
    setPosition(null);
    setLoading(false);
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
  function updatePerson(index: number, field: string, value: string) {
    const updated = [...persons];

    updated[index] = {
      ...updated[index],
      [field]: value,
    };

    setPersons(updated);
  }
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      
      <div className="mb-6">
        <BackToHome />
      </div>

      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl font-bold text-red-600">
          🚨 Reportar Personas Atrapadas
        </h1>

        <p className="mt-2 text-gray-600">
          Registra la última ubicación donde sabes o crees que hay personas
          atrapadas
        </p>

        {successMessage && (
          <div className="mt-6 rounded-lg bg-green-100 border border-green-300 text-green-800 p-4">
            {successMessage}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">

                  <div className="space-y-6 mt-4">
            <hr className="my-10" />

            <h2 className="text-2xl font-bold">
              👤 Personas identificadas bajo los escombros
            </h2>

            {/* <p className="text-gray-600 mt-2 mb-6">
              Si conoces el nombre de personas atrapadas, agregala aqui. Si no, simplemente envía el reporte.
            </p> */}

            {persons.map((person, index) => (
              <div key={index} className="border rounded-xl p-5 bg-white">
                <h3 className="font-semibold mb-4">Persona {index + 1}</h3>

                <input
                  type="text"
                  placeholder="Nombre (si se conoce)"
                  value={person.name}
                  onChange={(e) => updatePerson(index, "name", e.target.value)}
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <input
                  type="number"
                  placeholder="Edad aproximada"
                  value={person.age}
                  onChange={(e) => updatePerson(index, "age", e.target.value)}
                  className="w-full border rounded-lg p-3 mb-3"
                />

                <select
                  value={person.sex}
                  onChange={(e) => updatePerson(index, "sex", e.target.value)}
                  className="w-full border rounded-lg p-3 mb-3"
                >
                  <option value="">Sexo</option>
                  <option>Hombre</option>
                  <option>Mujer</option>
                  <option>No binario</option>
                  <option>No se sabe</option>
                </select>

                <textarea
                  placeholder="Condiciones médicas, señas fisicas, estado actual de la persona o algun dato importante"
                  value={person.medical_conditions}
                  onChange={(e) =>
                    updatePerson(index, "medical_conditions", e.target.value)
                  }
                  className="w-full border rounded-lg p-3"
                />
              </div>
            ))}
          </div>

          {successMessage && (
            <div className="rounded-lg bg-green-100 border border-green-300 text-green-800 p-4">
              {successMessage}
            </div>
          )}

          <div className="mt-8 flex flex-col gap-4">
            <button
              type="button"
              onClick={addPerson}
              className="border border-blue-600 text-blue-600 px-5 py-3 rounded-lg hover:bg-blue-50"
            >
              ➕ Agregar una persona
            </button>

          <div>
            <label className="font-semibold">Número de personas estimadas</label>

            <input
              type="number"
              value={peopleEstimated}
              onChange={(e) => setPeopleEstimated(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-3 bg-white text-black placeholder:text-gray-500"
              min={0}
            />
            <p className="mt-1 text-sm text-gray-500">
              Solo el número de personas, puedes dar detalles adicionales en las
              observaciones.
            </p>
          </div>

          <div>
            <label className="font-semibold">Nivel de certeza</label>

            <select
              value={certainty}
              onChange={(e) => setCertainty(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 mb-3 bg-white text-black"
            >
              <option value="">Selecciona una opción...</option>
              <option>Estoy seguro</option>
              <option>Creo que están allí</option>
              <option>No estoy seguro</option>
            </select>
            {certaintyError && (
              <div className="mt-2 rounded-lg bg-red-100 border border-red-300 text-red-700 p-3">
                {certaintyError}
              </div>
            )}
          </div>

          <div>
            <label className="font-semibold">Observaciones</label>

            <textarea
              rows={5}
              placeholder="Describe lo que viste o sabes. Por ejemplo: cuántas personas había, si escuchaste voces, si el acceso está bloqueado o cualquier otro detalle que pueda ayudar a los equipos de rescate."
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black placeholder:text-gray-500"
            />
          </div>

          <div>
            <label className="font-semibold">Dirección</label>

            <input
              type="text"
              placeholder="Dirección exacta o una referencia del lugar. Por ejemplo: Calle 123, Edificio ABC, Sector XYZ."
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full mt-2 border border-gray-300 rounded-lg p-3 bg-white text-black placeholder:text-gray-500"
            />
            <p className="mt-1 text-sm text-gray-500">
              Si no conoces la dirección, describe un punto de referencia
              cercano.
            </p>
          </div>

          
          <div className="mt-6">
            <label className="block font-semibold mb-2">
              📷 Fotografías
            </label>
            <p className="mt-2 text-sm text-gray-500">
  Puedes subir hasta 3 fotografías del incidente.
</p>

            <input
              type="file"
              multiple
              accept="image/*"
onChange={(e) => {
  const files = Array.from(e.target.files || []);

  if (files.length > 3) {
    alert("Puedes subir un máximo de 3 fotografías.");
  }

  setPhotos(files.slice(0, 3));
}}
              className="w-full border border-gray-300 rounded-lg p-3 bg-white text-black"
            />

            <p className="mt-1 text-sm text-gray-500">
              Agrega fotografías de la(s) persona(s) por rescatar y/o del lugar del incidente.
            </p>
            {photos.length > 0 && (
              <p className="mt-2 text-green-700 font-medium">
                ✅ {photos.length} fotografía{photos.length > 1 ? "s" : ""}{" "}
                seleccionada{photos.length > 1 ? "s" : ""}.
              </p>
            )}
          </div>

          

          <div>
            <label className="font-semibold block mb-2">
              Ubicación en el mapa
            </label>

            <p className="text-sm text-gray-600 mb-3">
              Si no conoces la dirección exacta, marca el lugar en el mapa.
            </p>

            <MapPicker position={position} onSelect={setPosition} />

            {position && (
              <p className="mt-3 text-sm text-gray-600">
                Latitud: {position.lat.toFixed(6)}
                <br />
                Longitud: {position.lng.toFixed(6)}
              </p>
            )}

            {locationError && (
              <div className="mt-3 rounded-lg bg-red-100 border border-red-300 text-red-700 p-3">
                {locationError}
              </div>
            )}
          </div>



            {successMessage && (
              <div className="rounded-lg bg-green-100 border border-green-300 text-green-800 p-4">
                {successMessage}
              </div>
            )}

            {locationError && (
              <div className="rounded-lg bg-red-100 border border-red-300 text-red-700 p-3">
                {locationError}
              </div>
            )}

            {certaintyError && (
              <div className="rounded-lg bg-red-100 border border-red-300 text-red-700 p-3">
                {certaintyError}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-red-600 text-white px-8 py-3 rounded-lg hover:bg-red-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {loading ? "Enviando..." : "Enviar Reporte"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
