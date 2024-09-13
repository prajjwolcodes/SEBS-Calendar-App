import React from 'react';

const CreateBtn = ({ setIsModalOpen, setOpenedByButton }) => {
    return (
        <div className="w-full md:w-[400px] lg:w-[260px] bg-white shadow-lg rounded-xl pb-4 md:px-4 mb-4">
            <button
                onClick={() => {
                    setIsModalOpen(true);
                    setOpenedByButton(true); // Indicate it was opened via the button
                }}
                className="w-full text-sm md:text-base bg-blue-500 hover:bg-blue-600 text-white font-semibold p-2 rounded-lg mb-3">
                Book Appointment
            </button>

            <p className="text-gray-600 text-sm mb-2">
                Click on book appointment or Press the date on Calender to book a new event.
            </p>

            <div className="hidden lg:block mt-8 space-y-2">
                <div className="flex items-center border border-gray-500 text-blue-600 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-2"></span>
                    Today
                </div>

                <div className="flex items-center border border-gray-500 text-blue-800 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-blue-800 rounded-full mr-2"></span>
                    Booked Appointments
                </div>
                <div className='flex items-center  p-2 rounded-lg pl-2 pt-6 pb-1'>Priority:</div>
                <div className="flex items-center  border border-gray-500 text-red-700 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-red-700 rounded-full mr-2"></span>
                    High
                </div>
                <div className="flex items-center border border-gray-500 text-green-700 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                    Normal
                </div>
                <div className="flex items-center border border-gray-500 text-yellow-700 p-2 rounded-lg">
                    <span className="w-2 h-2 bg-yellow-600 rounded-full mr-2"></span>
                    Low
                </div>

            </div>


        </div >
    );
};

export default CreateBtn;
