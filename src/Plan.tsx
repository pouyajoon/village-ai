import React, { useEffect, useRef, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useTranslation } from "react-i18next";
import { Box, AppBar, Toolbar, IconButton, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import LdDrawer from "./LdDrawer";
import lieuxDits from "./lieux-dits.json";

const drawerWidth = 240;

const Plan: React.FC = () => {
  const { t } = useTranslation();
  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<L.Map | null>(null);
  const [selectedLds, setSelectedLds] = useState<number[]>(
    lieuxDits.map((ld) => ld.id),
  );
  const [mobileOpen, setMobileOpen] = useState(false);
  const [filter, setFilter] = useState("");
  const featureGroupRef = useRef<L.FeatureGroup | null>(null);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const filteredLieuxDits = lieuxDits.filter(
    (ld) => ld.active && ld.name.toLowerCase().includes(filter.toLowerCase()),
  );

  useEffect(() => {
    if (mapRef.current && !mapInstance.current) {
      mapInstance.current = L.map(mapRef.current);
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        maxZoom: 19,
        attribution: "© OpenStreetMap",
      }).addTo(mapInstance.current);
    }

    if (mapInstance.current) {
      if (featureGroupRef.current) {
        featureGroupRef.current.clearLayers();
      }

      const selectedMarkers = lieuxDits
        .filter((ld) => selectedLds.includes(ld.id))
        .map((ld) =>
          L.marker([ld.latitude, ld.longitude]).bindPopup(
            `<b>${ld.name}</b><br>${ld.address}`,
          ),
        );

      if (selectedMarkers.length > 0) {
        featureGroupRef.current = L.featureGroup(selectedMarkers).addTo(
          mapInstance.current,
        );
        mapInstance.current.fitBounds(featureGroupRef.current.getBounds());
      } else {
        mapInstance.current.setView([45.355, 1.206], 13);
      }
    }
  }, [selectedLds]);

  const handleToggleLd = (id: number) => {
    setSelectedLds((prev) =>
      prev.includes(id) ? prev.filter((ldId) => ldId !== id) : [...prev, id],
    );
  };

  return (
    <Box sx={{ display: "flex", height: "100%" }}>
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            {t("Plan")}
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <LdDrawer
          lieuxDits={filteredLieuxDits}
          selectedLds={selectedLds}
          selectionActions={{
            onToggleLd: handleToggleLd,
            onSelectAll: () =>
              setSelectedLds(filteredLieuxDits.map((ld) => ld.id)),
            onDeselectAll: () => setSelectedLds([]),
          }}
          onFilterChange={setFilter}
          drawerState={{
            mobileOpen: mobileOpen,
            handleDrawerToggle: handleDrawerToggle,
          }}
        />
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          height: "100%",
        }}
      >
        <Toolbar />
        <div ref={mapRef} style={{ height: "100%", width: "100%" }} />
      </Box>
    </Box>
  );
};

export default Plan;
