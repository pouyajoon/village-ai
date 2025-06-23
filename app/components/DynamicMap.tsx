"use client";

import React from "react";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useAtom } from "jotai";
import {
    selectedVillagesAtom,
    villagesAtom,
} from "@/app/modules/villages/villages.atom";
import VillageMarker from "./VillageMarker";
import SaintMesminPolygon from "./SaintMesminPolygon";

const DynamicMap: React.FC = () => {
    const [selectedVillages] = useAtom(selectedVillagesAtom);
    const [villages] = useAtom(villagesAtom);

    return (
        <MapContainer
            center={[45.355, 1.206]}
            zoom={13}
            style={{ height: "calc(100vh - 128px)", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <SaintMesminPolygon />
            {villages
                .filter((village) => selectedVillages.includes(village.id))
                .map((village) => (
                    <VillageMarker key={village.id} village={village} />
                ))}
        </MapContainer>
    );
};

export default DynamicMap;