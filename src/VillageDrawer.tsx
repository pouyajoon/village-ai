/*
 ** origamix, 2025
 ** village-ai
 ** File description:
 ** VillageDrawer
 */

import React from "react";
import { List, Box } from "@mui/material";
import VillageListItem from "./VillageListItem";
import { useAtom } from "jotai";
import {
  selectedVillagesAtom,
  filteredVillagesAtom,
} from "./modules/villages/villages.atom";
import VillageAutocomplete from "./components/VillageAutocomplete";
import SelectionButtons from "./components/SelectionButtons";

const VillageDrawerContent: React.FC = () => {
  const [filteredVillages] = useAtom(filteredVillagesAtom);
  const [selectedVillages, setSelectedVillages] = useAtom(selectedVillagesAtom);

  const handleToggleVillage = (id: number) => {
    setSelectedVillages((prev) =>
      prev.includes(id)
        ? prev.filter((villageId) => villageId !== id)
        : [...prev, id],
    );
  };

  return (
    <div>
      <Box sx={{ p: 2 }}>
        <VillageAutocomplete />
        <SelectionButtons />
      </Box>
      <List>
        {filteredVillages.map((village) => (
          <VillageListItem
            key={village.id}
            village={village}
            selected={selectedVillages.includes(village.id)}
            onToggle={handleToggleVillage}
          />
        ))}
      </List>
    </div>
  );
};

export default VillageDrawerContent;
