/*
 ** origamix, 2025
 ** village-ai
 ** File description:
 ** villages.atom
 */

import { atom } from "jotai";
import { Village } from "../../models/Village";
import villagesData from "../../villages.json";

export const villagesAtom = atom<Village[]>(
  villagesData.filter((village) => village.active),
);

export const selectedVillagesAtom = atom<number[]>(
  villagesData.map((village) => village.id),
);

export const filterAtom = atom("");

export const filteredVillagesAtom = atom((get) => {
  const filter = get(filterAtom);
  const villages = get(villagesAtom);
  return villages.filter(
    (village) =>
      village.active &&
      village.name.toLowerCase().includes(filter.toLowerCase()),
  );
});
