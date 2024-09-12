import React, { useState, useEffect } from "react";
import Modal from "./Modal";
import { FaCalendarAlt, FaRegStickyNote, FaRegClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { formattedDate, formattedTime } from "../assets/utils/utils";
import { motion } from "framer-motion";

const Appointments = () => {
    const [appointments, setAppointments] = useState([]);
    const [selectedEvent, setSelectedEvent] = useState(null); // To store the clicked event
    const [isDescModalOpen, setIsDescModalOpen] = useState(false);


    useEffect(() => {
        const storedAppointments = JSON.parse(localStorage.getItem("appointments")) || [];
        setAppointments(storedAppointments);
        console.log(storedAppointments);
    }, []);

    const handleAppointmentClick = (appointment) => {
        setSelectedEvent(appointment); // Store the clicked event
        setIsDescModalOpen(true); // Open the modal
    };

    // Handle deletion of an appointment
    const handleDeleteAppointment = (id) => {
        // Filter out the appointment that needs to be deleted
        const updatedAppointments = appointments.filter(
            (appointment) => appointment.id !== id
        );

        // Update the localStorage with the filtered appointments array
        localStorage.setItem("appointments", JSON.stringify(updatedAppointments));

        // Update the state to re-render the component
        setAppointments(updatedAppointments);
    };

    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
            {appointments.length === 0 && (
                <p className="text-gray-600 text-lg">No appointments booked yet</p>
            )}
            <ul className="grid grid-cols-2 gap-6 mb-6">
                {appointments.map((appointment) => (
                    <li key={appointment.id} onClick={() => handleAppointmentClick(appointment)} className="bg-white cursor-pointer border border-gray-200 rounded-lg shadow-md p-6">
                        <div className="flex justify-between items-center mb-4">
                            <div className="text-sm text-gray-600 flex items-center">
                                <span
                                    className={`inline-block w-3 h-3 rounded-full mr-2 ${appointment.extendedProps.priority === "High"
                                        ? "bg-red-500"
                                        : appointment.extendedProps.priority === "Normal"
                                            ? "bg-green-500"
                                            : "bg-yellow-500"
                                        }`}
                                ></span>
                                <p>{formattedDate(appointment.start)}</p>
                            </div>
                            {/* Full day event badge */}
                            <div className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-lg">
                                {appointment.extendedProps.priority}
                            </div>

                        </div>

                        {/* Title and Description */}
                        <div className="text-gray-900 font-bold text-xl mb-2">
                            {appointment.title}
                        </div>
                        <p className="text-gray-700 text-base">
                            {appointment.extendedProps.description}
                        </p>
                    </li>
                ))}
            </ul>


            {isDescModalOpen && selectedEvent && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.5 }}
                >
                    <Modal onClose={() => setIsDescModalOpen(false)}>
                        <div className="flex justify-between items-center bg-blue-200 p-4 relative rounded-t-lg">
                            <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
                            <button onClick={() => setIsDescModalOpen(false)} className="absolute flex justify-center items-center text-2xl top-5 right-3 text-gray-700 hover:text-gray-900">
                                <IoClose />
                            </button>
                        </div>

                        {/* Body */}
                        <div className="p-6 space-y-4">
                            <div className="flex items-center space-x-2">

                                <span
                                    className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedEvent.extendedProps.priority === "High"
                                        ? "bg-red-500"
                                        : selectedEvent.extendedProps.priority === "Normal"
                                            ? "bg-green-500"
                                            : "bg-yellow-500"
                                        }`}
                                ></span>
                                Priority : {selectedEvent.extendedProps.priority}
                            </div>
                            <div className="flex items-center space-x-2">
                                <FaCalendarAlt className="text-gray-600" />
                                <p>{formattedDate(selectedEvent.start)}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FaRegClock className="text-gray-600" />
                                <p>{formattedTime(selectedEvent.start)} - {formattedTime(selectedEvent.end)}</p>
                            </div>

                            <div className="flex items-center space-x-2">
                                <FaRegStickyNote className="text-gray-600" />
                                <p>{selectedEvent.extendedProps.description}</p>
                            </div>
                        </div>
                    </Modal>
                </motion.div>
            )}
        </div>
    );
};

export default Appointments;
