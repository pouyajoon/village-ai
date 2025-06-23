/*
 ** origamix, 2025
 ** village-ai
 ** File description:
 ** Tableau
 */

"use client";

import React from "react";
import { useTranslation } from "react-i18next";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";
import { useAtom } from "jotai";
import { filteredVillagesAtom } from "@/app/modules/villages/villages.atom";

const Tableau: React.FC = () => {
  const { t } = useTranslation();
  const [filteredVillages] = useAtom(filteredVillagesAtom);
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("ID")}</TableCell>
            <TableCell>{t("Village")}</TableCell>
            <TableCell>{t("Adresse")}</TableCell>
            <TableCell>{t("Latitude")}</TableCell>
            <TableCell>{t("Longitude")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredVillages.map((village) => (
            <TableRow key={village.id}>
              <TableCell>{village.id}</TableCell>
              <TableCell>{village.name}</TableCell>
              <TableCell>{village.address}</TableCell>
              <TableCell>{village.latitude}</TableCell>
              <TableCell>{village.longitude}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tableau;
