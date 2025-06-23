import React, { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useAtom } from "jotai";
import {
  selectedVillagesAtom,
  villagesAtom,
} from "./modules/villages/villages.atom";

const Map: React.FC = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedVillages] = useAtom(selectedVillagesAtom);
  const [villages] = useAtom(villagesAtom);
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current).setView([45.355, 1.206], 13);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(mapInstance.current);
    }

    if (mapInstance.current) {
      if (featureGroupRef.current) {
        featureGroupRef.current.clearLayers();
      }

      const selectedMarkers = villages
        .filter((village) => selectedVillages.includes(village.id))
        .map((village) =>
          L.marker([village.latitude, village.longitude]).bindPopup(
            `<b>${village.name}</b><br>${village.address}`,
          ),
        );

      if (selectedMarkers.length > 0) {
        featureGroupRef.current = L.featureGroup(selectedMarkers).addTo(
          mapInstance.current,
        );
        mapInstance.current.fitBounds(featureGroupRef.current.getBounds());
      }
    }
  }, [selectedVillages, villages]);

  return (
    <div ref={mapRef} style={{ height: "calc(100vh - 64px)", width: "100%" }} />
  );
};

export default Map;
