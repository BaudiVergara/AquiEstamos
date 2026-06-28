import Hero from "@/components/Hero";
import { supabase } from "@/lib/supabase";

export default async function Home() {
  const { count: reports } = await supabase
    .from("incidents")
    .select("*", { count: "exact", head: true });
  const { data: incidents } = await supabase
    .from("incidents")
    .select("people_estimated, status");

  const peopleReported =
    incidents?.reduce(
      (total, incident) => total + (incident.people_estimated ?? 0),
      0
    ) ?? 0;

  const reportsCompleted =
    incidents?.filter(
      (incident) =>
        incident.status === "rescued" || incident.status === "closed"
    ).length ?? 0;

  const peopleRescued =
    incidents?.reduce((total, incident) => {
      if (incident.status === "rescued" || incident.status === "closed") {
        return total + (incident.people_estimated ?? 0);
      }

      return total;
    }, 0) ?? 0;

  return (
    <Hero
      reports={reports ?? 0}
      reportsCompleted={reportsCompleted}
      peopleReported={peopleReported}
      peopleRescued={peopleRescued}
    />
  );
}
