import "./App.css";
import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Modal from "./Components/Modal/Modal";

function App() {
  return (
    <Routes>
      <Route path="/quadb/" element={<Home />} />
      <Route path="/quadb/About/:id" element={<About />} />
      <Route path="/quadb/About/:id/Modal/:id" element={<Modal />} />
    </Routes>
  );
}

export default App;
