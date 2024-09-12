import React from "react";

const Modal = ({ children, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center items-center">
            <div className="bg-white pb-4 rounded-lg shadow-lg w-[520px]">
                {children}
                <div className="flex p-2 justify-end items-end">
                    <button
                        onClick={onClose}
                        className="px-8 py-2 bg-[#fa4949] text-white rounded"
                    >
                        Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Modal;
