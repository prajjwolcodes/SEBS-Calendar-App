// App.js or a parent component
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import Appointments from "./components/Appointments";
import Sidebar from "./components/Sidebar";
import "./App.css"
import { Toaster } from "react-hot-toast";

const App = () => {

  return (
    <Router>
      <Toaster />
      <div className="flex">
        <div className="w-64 h-screen bg-gray-800 text-white fixed">
          <Sidebar />
        </div>

        <div className="flex-1 ml-64">
          <Routes>
            <Route path="/" element={<Calendar />} />
            <Route path="/appointments" element={<Appointments />} />
          </Routes>
        </div>
      </div>

    </Router>
  );
};

export default App;
