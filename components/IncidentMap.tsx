"use client";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Link from "next/link";

import L from "leaflet";

function getIncidentIcon(status: string) {
  let color = "#eab308"; // amarillo

  if (status === "rescuing") color = "#f97316";
  if (status === "rescued") color = "#16a34a";
  if (status === "closed") color = "#374151";

  return L.divIcon({
    html: `<div style="font-size:30px;color:${color};">📍</div>`,
    className: "",
    iconSize: [30, 30],
    iconAnchor: [15, 30],
  });
}

type Incident = {
  id: string;
  address: string;
  latitude: number;
  longitude: number;
};

type Props = {
  incidents: Incident[];
};

export default function IncidentMap({ incidents }: Props) {
  return (
    <MapContainer
      center={[10.6007, -66.934]}
      zoom={12}
      style={{
        height: "600px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {incidents
        .filter(
          (incident) => incident.latitude != null && incident.longitude != null
        )
        .map((incident) => (
          <Marker
            key={incident.id}
            position={[incident.latitude, incident.longitude]}
            icon={getIncidentIcon(incident.status)}
          >
            <Popup>
              <strong>{incident.address}</strong>

              <br />

              <Link href={`/incidente/${incident.id}`}>Ver incidente →</Link>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
