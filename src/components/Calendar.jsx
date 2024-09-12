import React, { useState, useRef, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import EventForm from "./EventForm"; // Import the EventForm component
import { Link } from "react-router-dom";

const CalendarComponent = () => {
    const calendarRef = useRef(null);

    const [recentAppointments, setRecentAppointments] = useState([]);
    const [events, setEvents] = useState(localStorage.getItem("appointments") ? JSON.parse(localStorage.getItem("appointments")) : []); // Get events from local storage
    const [isModalOpen, setIsModalOpen] = useState(false);
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
            },
        ]);
        setIsModalOpen(false);
    };


    return (
        <div className="w-full lg:w-3/4 mx-auto py-5 relative">
            <div className="w-full flex justify-between items-center mb-4 ">
                <h1 className="text-2xl tracking-wide">Book your Appoiontment now</h1>
                {/* Button to open modal with extra date-time input */}
                <button
                    className="bg-blue-500 w-44  text-white py-2 px-4 rounded mt-4"
                    onClick={() => {
                        setIsModalOpen(true);
                        setOpenedByButton(true); // Indicate it was opened via the button
                    }}
                >
                    Book Appointment
                </button>
            </div>
            <FullCalendar
                className="w-full"
                ref={calendarRef}
                plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
                initialView={"dayGridMonth"}
                headerToolbar={{
                    start: "today prev,next",
                    center: "title",
                    end: "dayGridMonth,timeGridWeek,timeGridDay",
                }}
                events={events}
                selectable={true}
                select={handleDateSelect}
                height={"70vh"}
                allDaySlot={false}
                eventTimeFormat={{
                    hour: 'numeric',
                    minute: '2-digit',
                    meridiem: 'short' // This displays the time in 12-hour format with AM/PM
                }}

            />


            {/* Render the EventForm modal when the modal is open */}
            {isModalOpen && (
                <EventForm
                    onClose={() => setIsModalOpen(false)}
                    onSubmit={handleFormSubmit}
                    initialEvent={selectInfo}
                    openedByButton={openedByButton} // Pass prop to EventForm
                />
            )}
            <div>
                <div className="flex justify-between items-center">
                    <h1>Upcoming Appointments</h1>
                    <Link to="/appointments" className="cursor-pointer hover:underline">View All</Link>
                </div>
                <ul className="mb-6">
                    {recentAppointments.map((appointment) => (
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
        </div>
    );
};

export default CalendarComponent;
