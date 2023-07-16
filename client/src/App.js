import React from "react";
import { Route, Routes, Navigate } from "react-router-dom";

import CoursePage from './components/review-page';
import Home from './components/Home';
import ErrorPage from "./components/ErrorPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/review/:id" element={<CoursePage />} />
        <Route exact path="/404-page" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/404-page" replace />} />
      </Routes>
    </div>
  );
}

export default App;
