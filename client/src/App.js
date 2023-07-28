import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import CoursePage from './components/review-page';
import Home from './components/Home';
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/review/:id" element={<CoursePage />} />
        <Route path="/404-page" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404-page" replace />} />
      </Routes>
    </div>
  );
}

export default App;
