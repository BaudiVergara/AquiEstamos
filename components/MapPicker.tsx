"use client";

import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import { LatLngLiteral } from "leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const incidentIcon = L.divIcon({
  html: `<div style="font-size:30px;">📍</div>`,
  className: "",
  iconSize: [30, 30],
  iconAnchor: [15, 30],
});

type MapPickerProps = {
  position: LatLngLiteral | null;
  onSelect: (position: LatLngLiteral) => void;
};

function ClickHandler({ onSelect }: { onSelect: (position: LatLngLiteral) => void }) {
  useMapEvents({
    click(e) {
      onSelect(e.latlng);
    },
  });

  return null;
}

export default function MapPicker({
  position,
  onSelect,
}: MapPickerProps) {
  return (
    <MapContainer
      center={[10.6007, -66.9340]}
      zoom={14}
      style={{
        height: "400px",
        width: "100%",
        borderRadius: "12px",
      }}
    >
      <TileLayer
        attribution="© OpenStreetMap"
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickHandler onSelect={onSelect} />

      {position && (
         <Marker
         position={position}
          icon={incidentIcon}
  />
)}
    </MapContainer>
  );
}