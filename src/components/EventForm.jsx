import React, { useState } from "react";

const EventForm = ({ onClose, onSubmit, initialEvent, openedByButton }) => {
    const [eventDetails, setEventDetails] = useState({
        title: "",
        description: "",
        date: initialEvent?.start || "",
        startTime: "",
        endTime: "",
        additionalDateTime: "", // Store the additional date
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

        // Use the selected or additional date for event start and end
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
        };

        localStorage.setItem("event", JSON.stringify(eventData));
        onSubmit(eventData); // Pass event details back to the parent
    };

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-96">
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

                    <div className="mb-4">
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
                    <div className="mb-4">
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
        </div>
    );
};

export default EventForm;
