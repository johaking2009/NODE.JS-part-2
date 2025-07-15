import React from "react";
import Navbar from "./navbar/navbar";
import UserForm from "./components/UserForm";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/userform" element={<UserForm />} />
        <Route path="/" element={<div>Bosh sahifa</div>} />
      </Routes>
    </Router>
  );
}

export default App;