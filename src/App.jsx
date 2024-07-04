// src/App.js
import React from "react";
import Camera from "./components/Camera/Camera.jsx";
import Menu from "./components/Menu/Menu.jsx";
import "./App.scss";

const App = () => {
  return (
    <div className="app">
      <Camera />
      <Menu />
    </div>
  );
};

export default App;
