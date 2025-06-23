"use client";

import React from "react";
import dynamic from "next/dynamic";

const DynamicMap = dynamic(() => import("../components/DynamicMap"), {
  ssr: false,
});

const Map: React.FC = () => {
  return <DynamicMap />;
};

export default Map;
