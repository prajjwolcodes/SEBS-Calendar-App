import React from "react";

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg">
                {children}
                <button
                    onClick={onClose}
                    className="mt-4 px-4 py-2 bg-red-500 text-white rounded"
                >
                    Close
                </button>
            </div>
        </div>
    );
};

export default Modal;
