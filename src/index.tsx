/*
 ** EPITECH PROJECT, 2025
 ** village-ai
 ** File description:
 ** index
 */

import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./i18n";

const root = ReactDOM.createRoot(document.getElementById("app") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
