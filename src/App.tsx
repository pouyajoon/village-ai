/*
 ** origamix, 2025
 ** village-ai
 ** File description:
 ** App
 */

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Tableau from "./Tableau";
import Map from "./Map";
import Layout from "./components/Layout";

const App: React.FC = () => {
  return (
    <Router>
      <Layout>
        <Routes>
          <Route path="/table" element={<Tableau />} />
          <Route path="/map" element={<Map />} />
          <Route path="/" element={<Map />} />
        </Routes>
      </Layout>
    </Router>
  );
};

export default App;
