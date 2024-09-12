import React from 'react';

const CreateBtn = ({ setIsModalOpen, setOpenedByButton }) => {
    return (
        <div className="w-64 bg-white shadow-lg rounded-xl p-4">
            {/* Create New Event Button */}
            <button
                onClick={() => {
                    setIsModalOpen(true);
                    setOpenedByButton(true); // Indicate it was opened via the button
                }}
                className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg mb-3">
                Book Appointment
            </button>

            <p className="text-gray-600 text-sm mb-2">
                Click on book appointment or Press the date on Calender to book a new event.
            </p>

            {/* Event Items */}
            {/* <div className="space-y-2">
            <div className="flex items-center bg-green-100 text-green-600 p-2 rounded-lg">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                New Event Planning
            </div>

            <div className="flex items-center bg-blue-100 text-blue-600 p-2 rounded-lg">
                <span className="w-2 h-2 bg-blue-500 rounded-full mr-2"></span>
                Meeting
            </div>

            <div className="flex items-center bg-yellow-100 text-yellow-600 p-2 rounded-lg">
                <span className="w-2 h-2 bg-yellow-500 rounded-full mr-2"></span>
                Generating Reports
            </div>

            <div className="flex items-center bg-red-100 text-red-600 p-2 rounded-lg">
                <span className="w-2 h-2 bg-red-500 rounded-full mr-2"></span>
                Create New Theme
            </div>
        </div> */}
        </div >
    );
};

export default CreateBtn;
