import React, { useEffect, useRef, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Calendar from "./components/Calendar";
import Appointments from "./components/Appointments";
import Sidebar from "./components/Sidebar";
import "./App.css";
import { Toaster } from "react-hot-toast";
import { useInView, motion } from "framer-motion";
import { VscThreeBars } from "react-icons/vsc";


const App = () => {
  const sidebarRef = useRef(null);
  const contentRef = useRef(null);

  const [sidebarAnimated, setSidebarAnimated] = useState(false);
  const [contentAnimated, setContentAnimated] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const sidebarInView = useInView(sidebarRef, { margin: "-100px 0px" });
  const contentInView = useInView(contentRef, { margin: "-100px 0px" });

  const variants = {
    hidden: { opacity: 0, x: -100 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.8, ease: "easeInOut" } },
  };

  useEffect(() => {
    if (sidebarInView && !sidebarAnimated) {
      setSidebarAnimated(true);
    }
    if (contentInView && !contentAnimated) {
      setContentAnimated(true);
    }
  }, [sidebarInView, contentInView, sidebarAnimated, contentAnimated]);

  return (
    <Router>
      <Toaster />
      <div className="flex h-screen">
        <motion.div
          ref={sidebarRef}
          initial="hidden"
          animate={sidebarAnimated ? "visible" : "hidden"}
          variants={variants}
          className={`${isSidebarOpen ? "block" : "hidden"
            } lg:block w-56 lg:w-64 h-screen bg-gray-800 text-white fixed z-30`}>
          <Sidebar />
        </motion.div>

        <motion.div
          ref={contentRef}
          initial="hidden"
          animate={contentAnimated ? "visible" : "hidden"}
          variants={variants}
          className="flex-1 lg:ml-64 w-full relative">
          <div className="p-4">
            <button
              onClick={() => setIsSidebarOpen(!isSidebarOpen)}
              className="lg:hidden text-2xl absolute right-3 top-5 z-50 mb-4 text-black px-4 py-2 rounded">
              <VscThreeBars />
            </button>

            <Routes>
              <Route path="/" element={<Calendar />} />
              <Route path="/appointments" element={<Appointments />} />
            </Routes>
          </div>
        </motion.div>
      </div>
    </Router>
  );
};

export default App;
