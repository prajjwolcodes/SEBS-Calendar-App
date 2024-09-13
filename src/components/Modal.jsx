import React from "react";
import { motion } from "framer-motion";

const Modal = ({ children, onClose }) => {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="fixed inset-0 bg-black bg-opacity-50 z-10 flex justify-center px-2 lg:px-0 items-center">
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
        </motion.div>
    );
};

export default Modal;
