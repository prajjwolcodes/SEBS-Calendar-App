import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm"; // Import the EventForm component
import { Link } from "react-router-dom";
import Modal from "./Modal";
import { FaCalendarAlt, FaRegStickyNote, FaRegClock } from "react-icons/fa";
import { IoClose } from "react-icons/io5";
import { formattedDate, formattedTime } from "../assets/utils/utils";
import CreateBtn from "./CreateBtn";
import toast from "react-hot-toast";
import { motion } from "framer-motion";

const CalendarComponent = () => {
    const calendarRef = useRef(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // To store the clicked event

    const [recentAppointments, setRecentAppointments] = useState([]);
    const [events, setEvents] = useState(localStorage.getItem("appointments") ? JSON.parse(localStorage.getItem("appointments")) : []); // Get events from local storage
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isDescModalOpen, setIsDescModalOpen] = useState(false);
    const [selectInfo, setSelectInfo] = useState(null);
    const [openedByButton, setOpenedByButton] = useState(false); // Track how the modal was opened


    // Function to get the 3 most recent appointments
    const getBookedAppointments = () => {
        const calendarApi = calendarRef.current.getApi(); // Access the FullCalendar API
        let bookedAppointments = calendarApi.getEvents(); // Get all events
        localStorage.setItem("appointments", JSON.stringify(bookedAppointments)); // Store in local storage

        // Sort by start date and take the 3 most recent appointments
        bookedAppointments = bookedAppointments.sort((a, b) => {
            return new Date(a.start) - new Date(b.start); // Sort in descending order of start date
        }).slice(0, 3); // Get the first 3 recent appointments

        setRecentAppointments(bookedAppointments); // Update state with the recent appointments
    };


    useEffect(() => {
        getBookedAppointments()
    }, [events]);

    const handleDeleteAppointment = (id) => {
        const calendarApi = calendarRef.current.getApi();
        const eventToDelete = calendarApi.getEventById(id); // Find the event by ID
        eventToDelete.remove(); // Remove the event from the calendar

        // Update recent appointments to reflect the deletion
        setRecentAppointments((prevAppointments) =>
            prevAppointments.filter((appointment) => appointment.id !== id)
        );
        localStorage.removeItem("appointments");
        localStorage.removeItem("event");
        toast.success("Event removed successfully");
    };


    // Handle selecting a date in FullCalendar
    const handleDateSelect = (info) => {
        setSelectInfo({
            start: info.startStr,
            end: info.endStr,
            allDay: info.allDay,
        });
        setOpenedByButton(false); // Set to false since it's opened via date selection
        setIsModalOpen(true); // Open the form modal
    };

    // Handle form submission
    const handleFormSubmit = (eventDetails) => {
        setEvents([
            ...events,
            {
                id: Date.now().toString(),
                title: eventDetails.title,
                description: eventDetails.description,
                start: eventDetails.start,
                end: eventDetails.end,
                allDay: false,
                priority: eventDetails.priority,
            },
        ]);
        setIsModalOpen(false);
    };


    const handleEventClick = (clickInfo) => {
        setSelectedEvent(clickInfo.event); // Store the clicked event
        setIsDescModalOpen(true); // Open the modal
    };

    const handleAppointmentClick = (appointment) => {
        setSelectedEvent(appointment); // Store the clicked event
        setIsDescModalOpen(true)
    };

    return (
        <div className="w-full py-5 px-6 relative">
            <div className="flex gap-3 w-full">
                <div>
                    <CreateBtn setIsModalOpen={setIsModalOpen} setOpenedByButton={setOpenedByButton} />
                </div>
                <div className="w-full">
                    <FullCalendar
                        ref={calendarRef}
                        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                        initialView={"dayGridMonth"}
                        eventClick={handleEventClick}
                        headerToolbar={{
                            start: "today prev,next",
                            center: "title",
                            end: "dayGridMonth,timeGridWeek,timeGridDay",
                        }}
                        events={events}
                        selectable={true}
                        select={handleDateSelect}
                        height={"90vh"}
                        allDaySlot={false}
                        eventTimeFormat={{
                            hour: 'numeric',
                            minute: '2-digit',
                            meridiem: 'short'
                        }}
                    />
                </div>
            </div>

            {isDescModalOpen && selectedEvent && (
                <Modal onClose={() => setIsDescModalOpen(false)}>
                    <div className="flex justify-between items-center bg-blue-200 p-4 relative rounded-t-lg">
                        <h2 className="text-xl font-semibold">{selectedEvent.title}</h2>
                        <button onClick={() => setIsDescModalOpen(false)} className="absolute flex justify-center items-center text-2xl top-5 right-3 text-gray-700 hover:text-gray-900">
                            <IoClose />
                        </button>
                    </div>

                    {/* Body */}
                    <div className="p-6 space-y-4">
                        <div className="flex items-center space-x-2">

                            <span
                                className={`inline-block w-3 h-3 rounded-full mr-2 ${selectedEvent.extendedProps.priority === "High"
                                    ? "bg-red-500"
                                    : selectedEvent.extendedProps.priority === "Normal"
                                        ? "bg-green-500"
                                        : "bg-yellow-500"
                                    }`}
                            ></span>
                            Priority : {selectedEvent.extendedProps.priority}
                        </div>
                        <div className="flex items-center space-x-2">
                            <FaCalendarAlt className="text-gray-600" />
                            <p>{formattedDate(selectedEvent.start)}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaRegClock className="text-gray-600" />
                            <p>{formattedTime(selectedEvent.start)} - {formattedTime(selectedEvent.end)}</p>
                        </div>

                        <div className="flex items-center space-x-2">
                            <FaRegStickyNote className="text-gray-600" />
                            <p>{selectedEvent.extendedProps.description}</p>
                        </div>
                    </div>
                </Modal>
            )}

            {/* Render the EventForm modal when the modal is open */}
            {
                isModalOpen && (
                    <EventForm
                        onClose={() => setIsModalOpen(false)}
                        onSubmit={handleFormSubmit}
                        initialEvent={selectInfo}
                        openedByButton={openedByButton} // Pass prop to EventForm
                    />
                )
            }
            <div>
                <div className="flex justify-between items-center my-5">
                    <h1 className="text-xl font-semibold  ">Upcoming Appointments</h1>
                    <Link to="/appointments" className="cursor-pointer hover:underline">View All</Link>
                </div>
                {recentAppointments.length === 0 && (
                    <p className="text-gray-600 text-sm">No appointments booked yet</p>
                )}
                <ul className="grid grid-cols-1 gap-6 mb-6">
                    {recentAppointments.map((appointment) => (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.5 }}
                            key={appointment.id}
                            onClick={() => handleAppointmentClick(appointment)}
                            className="bg-white relative cursor-pointer border border-gray-200 rounded-lg shadow-md p-6">
                            <div className="flex justify-between items-center mb-4">
                                <div className="text-sm text-gray-600 flex items-center">
                                    <span
                                        className={`inline-block w-3 h-3 rounded-full mr-2 ${appointment.extendedProps.priority === "High"
                                            ? "bg-red-500"
                                            : appointment.extendedProps.priority === "Normal"
                                                ? "bg-green-500"
                                                : "bg-yellow-500"
                                            }`}
                                    ></span>
                                    <p>{formattedDate(appointment.start)}</p>
                                </div>
                                {/* Full day event badge */}
                                <div className="bg-blue-100 text-blue-600 text-xs font-medium py-1 px-3 rounded-lg">
                                    {appointment.extendedProps.priority}
                                </div>
                            </div>

                            {/* Title and Description */}
                            <div className="text-gray-900 font-bold text-xl mb-2">
                                {appointment.title}
                            </div>
                            <p className="text-gray-700 text-base">
                                {appointment.extendedProps.description}
                            </p>
                            <button
                                onClick={() => handleDeleteAppointment(appointment.id)}
                                className="absolute bottom-3 right-5 ml-4 px-6 py-1 bg-red-500 text-white rounded"
                            >
                                Delete
                            </button>
                        </motion.div>
                    ))}
                </ul>

            </div>
        </div >
    );
};

export default CalendarComponent;
