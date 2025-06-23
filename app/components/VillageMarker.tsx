import React from "react";
import { Marker, Popup, Tooltip } from "react-leaflet";
import { Village } from "../models/Village";
import L from "leaflet";
import { ListItem, ListItemText } from "@mui/material";

interface VillageMarkerProps {
    village: Village;
}

const VillageMarker: React.FC<VillageMarkerProps> = ({ village }) => {
    const icon = L.divIcon({
        className: "village-marker",
        html: `<div class="marker-pin"></div>`,
        iconSize: [30, 40],
        iconAnchor: [15, 40],
    });

    return (
        <Marker position={[village.latitude, village.longitude]} icon={icon}>
            <Tooltip permanent={true}>
                <ListItem component="div">
                    <ListItemText primary={village.name} />
                </ListItem>
            </Tooltip>
        </Marker>
    );
};

export default VillageMarker;
