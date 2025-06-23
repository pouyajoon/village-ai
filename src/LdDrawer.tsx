/*
 ** EPITECH PROJECT, 2025
 ** village-ai
 ** File description:
 ** LdDrawer
 */

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Drawer,
  List,
  Toolbar,
  Autocomplete,
  TextField,
  Box,
  IconButton,
} from "@mui/material";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import CheckBoxOutlineBlankIcon from "@mui/icons-material/CheckBoxOutlineBlank";
import LdListItem from "./LdListItem";
import lieuxDitsData from "./lieux-dits.json";

const drawerWidth = 240;

interface LdSelectionActions {
  onToggleLd: (id: number) => void;
  onSelectAll: () => void;
  onDeselectAll: () => void;
}

interface LdDrawerState {
  mobileOpen: boolean;
  handleDrawerToggle: () => void;
}

interface DrawerContentProps {
  lieuxDits: { id: number; name: string; active?: boolean }[];
  selectedLds: number[];
  selectionActions: LdSelectionActions;
  onFilterChange: (filter: string) => void;
}

const DrawerContent: React.FC<DrawerContentProps> = ({
  lieuxDits: filteredLieuxDits,
  selectedLds,
  selectionActions,
  onFilterChange,
}) => {
  const { t } = useTranslation();
  const { onToggleLd, onSelectAll, onDeselectAll } = selectionActions;

  return (
    <div>
      <Toolbar />
      <Box sx={{ p: 2 }}>
        <Autocomplete
          options={lieuxDitsData
            .filter((ld) => ld.active)
            .map((option) => option.name)}
          onInputChange={(event, newInputValue) => {
            onFilterChange(newInputValue);
          }}
          renderInput={(params) => (
            <TextField {...params} label={t("Search")} variant="standard" />
          )}
        />
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 1 }}>
          <IconButton onClick={onSelectAll} title={t("Select All")}>
            <CheckBoxIcon />
          </IconButton>
          <IconButton onClick={onDeselectAll} title={t("Deselect All")}>
            <CheckBoxOutlineBlankIcon />
          </IconButton>
        </Box>
      </Box>
      <List>
        {filteredLieuxDits.map((ld) => (
          <LdListItem
            key={ld.id}
            ld={ld}
            selected={selectedLds.includes(ld.id)}
            onToggle={onToggleLd}
          />
        ))}
      </List>
    </div>
  );
};

interface LdDrawerProps extends DrawerContentProps {
  drawerState: LdDrawerState;
}

const LdDrawer: React.FC<LdDrawerProps> = (props) => {
  const { drawerState, ...contentProps } = props;
  const { mobileOpen, handleDrawerToggle } = drawerState;

  const content = <DrawerContent {...contentProps} />;

  return (
    <>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
      >
        {content}
      </Drawer>
      <Drawer
        variant="permanent"
        sx={{
          display: { xs: "none", sm: "block" },
          "& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
        }}
        open
      >
        {content}
      </Drawer>
    </>
  );
};

export default LdDrawer;
