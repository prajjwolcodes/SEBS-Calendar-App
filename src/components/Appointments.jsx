import React, { useState, useEffect } from "react";
import Modal from "./Modal";

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
            <ul className="mb-6">
                {appointments.map((appointment) => (
                    <li key={appointment.id} className="flex justify-between items-center mb-2">
                        <span>
                            {appointment.title} - {new Date(appointment.start).toLocaleString()} (Priority: {appointment.extendedProps.priority})
                        </span>
                        <button
                            onClick={() => handleAppointmentClick(appointment)}
                            className="ml-4 px-2 py-1 bg-blue-500 text-white rounded"
                        >
                            View More
                        </button>
                        <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>

            {isDescModalOpen && selectedEvent && (
                <Modal onClose={() => setIsDescModalOpen(false)}>

                    <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
                    <p>
                        <strong>Start:</strong> {new Date(selectedEvent.start).toLocaleString()}
                    </p>
                    <p>
                        <strong>End:</strong> {new Date(selectedEvent.end).toLocaleString()}
                    </p>
                    {selectedEvent.extendedProps.priority && (
                        <p>
                            <strong>Priority:</strong> {selectedEvent.extendedProps.priority}
                        </p>
                    )}

                    HELLOS
                </Modal>
            )
            }
        </div>
    );
};

export default Appointments;
