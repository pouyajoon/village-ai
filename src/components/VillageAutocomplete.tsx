/*
 ** village-ai
 ** File description:
 ** VillageAutocomplete
 */

import React from "react";
import { Autocomplete, TextField } from "@mui/material";
import { useAtom } from "jotai";
import { villagesAtom, filterAtom } from "../modules/villages/villages.atom";
import { useTranslation } from "react-i18next";

const VillageAutocomplete: React.FC = () => {
  const { t } = useTranslation();
  const [villages] = useAtom(villagesAtom);
  const [, setFilter] = useAtom(filterAtom);

  return (
    <Autocomplete
      options={villages
        .filter((village) => village.active)
        .map((option) => option.name)}
      onInputChange={(event, newInputValue) => {
        setFilter(newInputValue);
      }}
      renderInput={(params) => (
        <TextField {...params} label={t("Search")} variant="standard" />
      )}
    />
  );
};

export default VillageAutocomplete;
