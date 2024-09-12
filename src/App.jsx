// App.js or a parent component
import React, { useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import Calendar from "./components/Calendar";
import Appointments from "./components/Appointments";
import Sidebar from "./components/Sidebar";
import "./App.css"

const App = () => {

  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Calendar />} />
          <Route path="/appointments" element={<Appointments />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
