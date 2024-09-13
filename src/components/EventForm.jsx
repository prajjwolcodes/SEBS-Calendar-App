import React, { useState } from "react";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const EventForm = ({ onClose, onSubmit, initialEvent, openedByButton }) => {
    const [eventDetails, setEventDetails] = useState({
        title: "",
        description: "",
        date: initialEvent?.start || "",
        startTime: "",
        endTime: "",
        additionalDateTime: "",
        priority: "Normal" // Store the additional date
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEventDetails((prevDetails) => ({
            ...prevDetails,
            [name]: value,
        }));
    };

    const handleFormSubmit = (e) => {
        e.preventDefault();
        const selectedDate = openedByButton
            ? eventDetails.additionalDateTime
            : eventDetails.date;

        const startDateTime = new Date(`${selectedDate}T${eventDetails.startTime}`);
        const endDateTime = new Date(`${selectedDate}T${eventDetails.endTime}`);

        const eventData = {
            title: eventDetails.title,
            description: eventDetails.description,
            start: startDateTime,
            end: endDateTime,
            priority: eventDetails.priority,
        };

        localStorage.setItem("event", JSON.stringify(eventData));
        onSubmit(eventData);
        toast.success("Event added successfully");

    };

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}

            className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex justify-center items-center" >
            <div className="bg-white p-6 rounded-lg shadow-lg w-[380px] lg:w-[450px] ">
                <h2 className="text-2xl mb-4">Add New Event</h2>
                <form onSubmit={handleFormSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700">Event Title:</label>
                        <input
                            type="text"
                            name="title"
                            value={eventDetails.title}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700">Description:</label>
                        <textarea
                            name="description"
                            value={eventDetails.description}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                        />
                    </div>

                    {/* Conditionally render additional date input */}
                    {openedByButton && (
                        <div className="mb-4">
                            <label className="block text-gray-700">Date:</label>
                            <input
                                type="date"
                                name="additionalDateTime"
                                value={eventDetails.additionalDateTime}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                    )}

                    <div className="flex gap-2">
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700">Start Time:</label>
                            <input
                                type="time"
                                name="startTime"
                                value={eventDetails.startTime}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                        <div className="mb-4 w-1/2">
                            <label className="block text-gray-700">End Time:</label>
                            <input
                                type="time"
                                name="endTime"
                                value={eventDetails.endTime}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded-lg"
                                required
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label className="block text-gray-700">Priority:</label>
                        <select
                            name="priority"
                            value={eventDetails.priority}
                            onChange={handleInputChange}
                            className="w-full border border-gray-300 p-2 rounded-lg"
                        >
                            <option value="High">High</option>
                            <option value="Normal">Normal</option>
                            <option value="Low">Low</option>
                        </select>
                    </div>

                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-gray-500 text-white py-2 px-4 rounded mr-2"
                            onClick={onClose}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white py-2 px-4 rounded"
                        >
                            Add Event
                        </button>
                    </div>
                </form>
            </div>
        </motion.div >
    );
};

export default EventForm;
