import ActionButton from "./ActionButton";
import StatCard from "./StatCard";
import Image from "next/image";
type HeroProps = {
  reports: number;
  reportsCompleted: number;
  peopleReported: number;
  peopleRescued: number;
};

export default function Hero({
  reports,
  reportsCompleted,
  peopleReported,
  peopleRescued,
}: HeroProps) {
  return (
    <main className="min-h-screen bg-slate-100 flex flex-col items-center px-6 py-12">
      <div className="flex items-center justify-center gap-3">
            <Image
    src="/ve.png"
    alt="Bandera de Venezuela"
    width={38}
    height={28}
    className="mb-2"
  />
</div>
  <h1 className="text-5xl font-bold text-blue-700">
    📍AquíEstamos
  </h1>
      <p className="mt-4 text-center text-xl text-gray-700 max-w-xl">
        Plataforma para registrar la ubicacion de personas atrapadas en los escombros.
      </p>

      <p className="mt-3 text-center text-gray-600 max-w-xl font-bold">
        Si conoces la ubicación de una o varias personas atrapadas bajo los escombros, ¡regístrala aquí!
      </p>

      <div className="mt-10 grid grid-cols-2 lg:grid-cols-4 gap-4 w-full max-w-5xl">
        <StatCard icon="🚨" value={reports} label="Reportes" />

        <StatCard icon="✅" value={reportsCompleted} label="Atendidos" />

        <StatCard
          icon="👥"
          value={peopleReported}
          label="Personas reportadas"
        />

        <StatCard icon="🛟" value={peopleRescued} label="Personas rescatadas" />
      </div>

      <div className="mt-10 flex flex-col gap-4 w-full items-center">
        <ActionButton
          icon="🔴"
          title="Reportar personas atrapadas"
          href="/reportar"
        />

        <ActionButton
          icon="🔍"
          title="Buscar personas reportadas"
          href="/buscar"
        />

        <ActionButton icon="🗺️" title="Mapa de ubicaciones críticas" href="/mapa" />

        

      </div>

      <p className="mt-12 text-sm text-center text-gray-500 max-w-xl">
        La información publicada es de dominio público, compartida por la comunidad y puede
        actualizarse conforme avancen las labores de rescate.
      </p>
    </main>
  );
}


/* <ActionButton icon="🤝" title="Solidaridad vecinal (Ofrece o solicita apoyo)" href="/ayuda" /> */