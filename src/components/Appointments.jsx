// Appointments.js
import React from "react";

const Appointments = ({ }) => {
    const appointments = JSON.parse(localStorage.getItem("appointments"));
    console.log(appointments);
    return (
        <div className="p-6">
            <h1 className="text-2xl font-semibold mb-4">Appointments</h1>
            <ul className="mb-6">
                {appointments.map((appointment) => (
                    <li key={appointment.id} className="flex justify-between items-center mb-2">
                        <span>
                            {appointment.title} - {appointment.start.toLocaleString()}
                        </span>
                        <button
                            onClick={() => handleDeleteAppointment(appointment.id)}
                            className="ml-4 px-2 py-1 bg-red-500 text-white rounded"
                        >
                            Delete
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Appointments;
