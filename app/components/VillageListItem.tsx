/*
 ** origamix, 2025
 ** village-ai
 ** File description:
 ** VillageListItem
 */

import React from "react";
import {
  ListItem,
  ListItemText,
  Checkbox,
  ListItemButton,
} from "@mui/material";

import { Village } from "../models/Village";

interface VillageListItemProps {
  village: Village;
  selected: boolean;
  onToggle: (id: number) => void;
}

const VillageListItem: React.FC<VillageListItemProps> = ({
  village,
  selected,
  onToggle,
}) => {
  return (
    <ListItem key={village.id} disablePadding>
      <ListItemButton dense onClick={() => onToggle(village.id)}>
        <Checkbox edge="start" checked={selected} tabIndex={-1} disableRipple />
        <ListItemText primary={village.name} />
      </ListItemButton>
    </ListItem>
  );
};

export default VillageListItem;
