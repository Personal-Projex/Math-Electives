import React from "react";
import { Route, Routes } from "react-router-dom";

import CoursePage from './components/review-page';
import Home from './components/Home';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/MATH2901" element={<CoursePage />} />
      </Routes>
    </div>
  );
}

export default App;
