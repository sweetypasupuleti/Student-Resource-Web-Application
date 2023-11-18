import React, { useState, useEffect } from "react";
import "./Calendar.css";
import { Calendar, dateFnsLocalizer } from "react-big-calendar";
import format from "date-fns/format";
import parse from "date-fns/parse";
import startOfWeek from "date-fns/startOfWeek";
import getDay from "date-fns/getDay";
import enUS from "date-fns/locale/en-US";
import "react-big-calendar/lib/css/react-big-calendar.css";
import DatePicker from "react-date-picker";
import "react-date-picker/dist/DatePicker.css";
import "react-calendar/dist/Calendar.css";
import axios from "axios";

const locales = {
  "en-US": enUS,
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

// Define the EventComponent here
function EventComponent({ event }) {
  return (
    <div>
      <strong>{event.title}</strong>
      {event.link && <p>Link: {event.link}</p>}
      {event.time && <p>Time: {event.time}</p>}
      {event.endtime && <p>End Time: {event.endtime}</p>}
    </div>
  );
}

function CalendarApp() {
  const [isAdmin, setIsAdmin] = useState(false);
  useEffect(() => {
    const isAuthenticated = localStorage.getItem("authenticatedAdmin");
    if (isAuthenticated === "true") {
      setIsAdmin(true);
    }
  }, []);

  const [allEvents, setAllEvents] = useState([]);
  const [newEvent, setNewEvent] = useState({
    title: "",
    start: new Date(), // Default start date
    end: new Date(), // Default end date
    link: "",
    time: "",
    endtime: "", // Default end time
  });

  useEffect(() => {
    // Fetch events from the server
    axios
      .get("http://localhost:8081/events")
      .then((response) => {
        setAllEvents(response.data.Result); // Assuming events are in the 'Result' property of the response
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const handleAddEvent = () => {
    // Ensure 'start' and 'end' are Date objects
    const formattedStart = new Date(newEvent.start);
    const formattedEnd = new Date(newEvent.end);

    // Send the new event to the server
    axios
      .post("http://localhost:8081/insertevents", {
        title: newEvent.title,
        start: formattedStart,
        end: formattedEnd,
        link: newEvent.link,
        time: newEvent.time,
        endtime: newEvent.endtime,
      })
      .then(() => {
        const newEventArray = [
          ...allEvents,
          { ...newEvent, start: formattedStart, end: formattedEnd },
        ];
        setAllEvents(newEventArray);
        setNewEvent({
          title: "",
          start: new Date(), // Reset start date
          end: new Date(), // Reset end date
          link: "",
          time: "",
          endtime: "", // Reset end time
        });
      })
      .catch((error) => {
        console.error(error);
      });
  };

  return (
    <div>
      <Calendar
        localizer={localizer}
        events={allEvents}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 500 }}
        views={["month", "agenda"]} // Only 'month' and 'agenda' views
        defaultView="month"
        components={{
          event: EventComponent,
        }}
      />
      {isAdmin && (
        <div className="add-events-admin">
          <div className="add-events-header">Add Event</div>
          <div className="add-events-inputs">
            <div className="add-event-dates">
              <div>Title :</div>
              <input
                className="add-events-title"
                type="text"
                placeholder="Add event title.."
                value={newEvent.title}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, title: e.target.value })
                }
              />
            </div>
            <div className="add-event-dates">
              <div>Link :</div>
              <input
                className="add-events-link"
                type="text"
                placeholder="Add event link.."
                value={newEvent.link}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, link: e.target.value })
                }
              />
            </div>
            <div className="add-event-dates">
              <div>Time :</div>
              <input
                className="add-events-time"
                type="text"
                placeholder="Add event time.."
                value={newEvent.time}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, time: e.target.value })
                }
              />
            </div>
            <div className="add-event-dates">
              <div>End Time :</div>
              <input
                className="add-events-end-time"
                type="text"
                placeholder="Add event end time.."
                value={newEvent.endtime}
                onChange={(e) =>
                  setNewEvent({ ...newEvent, endtime: e.target.value })
                }
              />
            </div>
            <div className="add-event-dates">
              <div>Start date :</div>
              <DatePicker
                value={newEvent.start}
                onChange={(date) => setNewEvent({ ...newEvent, start: date })}
              />
            </div>
            <div className="add-event-dates">
              <div>End date :</div>
              <DatePicker
                value={newEvent.end}
                onChange={(date) => setNewEvent({ ...newEvent, end: date })}
              />
            </div>
            <button className="add-event-button" onClick={handleAddEvent}>
              Add event
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default CalendarApp;
