/*
 ** EPITECH PROJECT, 2025
 ** village-ai
 ** File description:
 ** App
 */

import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Tabs, Tab, Box } from "@mui/material";
import Tableau from "./Tableau";
import Plan from "./Plan";

const App: React.FC = () => {
  const { t } = useTranslation();
  const [selectedTab, setSelectedTab] = useState(1);

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    setSelectedTab(newValue);
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
        <Tabs
          value={selectedTab}
          onChange={handleChange}
          aria-label="basic tabs example"
        >
          <Tab label={t("Tableau")} />
          <Tab label={t("Plan")} />
        </Tabs>
      </Box>
      <Box sx={{ flexGrow: 1, overflow: "auto" }}>
        {selectedTab === 0 && <Tableau />}
        {selectedTab === 1 && <Plan />}
      </Box>
    </Box>
  );
};

export default App;
