/*
 ** origamix, 2025
 ** village-ai
 ** File description:
 ** SelectionButtons
 */

import React from "react";
import { Box, IconButton } from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import { useAtom } from "jotai";
import {
  selectedVillagesAtom,
  filteredVillagesAtom,
} from "../modules/villages/villages.atom";
import { useTranslation } from "react-i18next";

const SelectionButtons: React.FC = () => {
  const { t } = useTranslation();
  const [filteredVillages] = useAtom(filteredVillagesAtom);
  const [, setSelectedVillages] = useAtom(selectedVillagesAtom);

  const handleSelectAll = () => {
    setSelectedVillages(filteredVillages.map((village) => village.id));
  };

  const handleDeselectAll = () => {
    setSelectedVillages([]);
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
      <IconButton onClick={handleSelectAll} title={t("Select All")}>
        <CheckBoxIcon />
      </IconButton>
      <IconButton onClick={handleDeselectAll} title={t("Deselect All")}>
        <CheckBoxOutlineBlankIcon />
      </IconButton>
    </Box>
  );
};

export default SelectionButtons;
