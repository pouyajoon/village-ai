/*
 ** EPITECH PROJECT, 2025
 ** village-ai
 ** File description:
 ** Tableau
 */

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
import lieuxDits from "./lieux-dits.json";

const Tableau: React.FC = () => {
  const { t } = useTranslation();
  return (
    <TableContainer component={Paper}>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>{t("ID")}</TableCell>
            <TableCell>{t("Lieu-dit")}</TableCell>
            <TableCell>{t("Adresse")}</TableCell>
            <TableCell>{t("Latitude")}</TableCell>
            <TableCell>{t("Longitude")}</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {lieuxDits
            .filter((ld) => ld.active)
            .map((ld) => (
              <TableRow key={ld.id}>
                <TableCell>{ld.id}</TableCell>
                <TableCell>{ld.name}</TableCell>
                <TableCell>{ld.address}</TableCell>
                <TableCell>{ld.latitude}</TableCell>
                <TableCell>{ld.longitude}</TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default Tableau;
