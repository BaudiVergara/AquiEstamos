"use client";

import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

import Link from "next/link";


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
      center={[10.6007, -66.9340]}
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
    (incident) =>
      incident.latitude != null &&
      incident.longitude != null
  )
  .map((incident) => (
    <Marker
      key={incident.id}
      position={[incident.latitude, incident.longitude]}
    >
          <Popup>

            <strong>{incident.address}</strong>

            <br />

            <Link href={`/incidente/${incident.id}`}>
              Ver incidente →
            </Link>

          </Popup>
        </Marker>
      ))}

    </MapContainer>
  );
}
