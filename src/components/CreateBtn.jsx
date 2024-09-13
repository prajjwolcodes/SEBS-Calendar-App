import React from 'react';

const CreateBtn = ({ setIsModalOpen, setOpenedByButton }) => {
    return (
        <div className="w-full md:w-[400px] lg:w-[260px] bg-white shadow-lg rounded-xl pb-4 px-2 md:px-4 mb-4">
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




        </div >
    );
};

export default CreateBtn;
