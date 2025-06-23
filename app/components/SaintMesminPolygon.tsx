import React from "react";
import { Polygon } from "react-leaflet";
import saintMesminData from "../saint-mesmin.json";

import { LatLngExpression } from "leaflet";

const SaintMesminPolygon: React.FC = () => {
    const coordinates = saintMesminData[0].contour.coordinates[0].map(
        (coord: any) => [coord[1], coord[0]] as LatLngExpression
    );

    return <Polygon positions={coordinates} />;
};

export default SaintMesminPolygon;