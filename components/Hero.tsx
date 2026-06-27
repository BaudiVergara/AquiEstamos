import ActionButton from "./ActionButton";

export default function Hero() {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center px-6 py-12">

      <h1 className="text-5xl font-bold text-blue-700">
        AquíEstamos
      </h1>

      <p className="mt-4 text-center text-xl text-gray-700 max-w-xl">
        Plataforma ciudadana para emergencias.
      </p>

      <p className="mt-2 text-center text-gray-600 max-w-xl">
        Conectando personas, voluntarios y equipos de rescate cuando más se necesitan.
      </p>

      <div className="mt-10 flex flex-col gap-4 w-full items-center">

        <ActionButton
  icon="🔴"
  title="Reportar Personas Atrapadas"
  href="/reportar"
/>

<ActionButton
  icon="🔍"
  title="Buscar Personas Reportadas"
  href="/buscar"
/>

<ActionButton
  icon="🗺️"
  title="Ver Mapa"
  href="/mapa"
/>

<ActionButton
  icon="🤝"
  title="Solidaridad Vecinal"
  href="/ayuda"
/>

      </div>

      <p className="mt-12 text-sm text-center text-gray-500 max-w-xl">
        La información publicada es compartida por la comunidad y puede actualizarse
        conforme avancen las labores de rescate.
      </p>

    </main>
  );
}