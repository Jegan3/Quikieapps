import React from "react";
import Header from "./components/Header";
import { Route, Routes, BrowserRouter } from "react-router-dom";
import Home from "./components/Home";
import View from "./components/View";
import "../src/App.scss";

function App() {
  return (
    <BrowserRouter>
      <header>
        <Header />
      </header>
      <main>
        <Routes>
          <Route path="/" element={<Home />} exact />
          <Route path="/view" element={<View />} exact />
        </Routes>
      </main>
    </BrowserRouter>
  );
}

export default App;
