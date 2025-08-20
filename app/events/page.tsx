"use client";

import { useState } from "react";
import { FaCalendarAlt } from "react-icons/fa";
import { MdDeleteForever } from "react-icons/md";

interface Event {
  id: number;
  name: string;
  date: string;
}

export default function EventsPage() {
  const [events, setEvents] = useState<Event[]>([]);
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const addEvent = () => {
    if (!name || !date) return;
    const newEvent = { id: Date.now(), name, date };
    setEvents([...events, newEvent]);
    setName("");
    setDate("");
  };

  const deleteEvent = (id: number) => {
    setEvents(events.filter((event) => event.id !== id));
  };

  const filteredEvents = events.filter((event) =>
    event.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div
      className="min-h-screen flex flex-col items-center justify-center p-6 
     bg-[url('/images/image1.jpg')] bg-cover bg-center"
    >
  <h1 className="text-4xl font-bold mb-6 text-black drop-shadow-lg flex items-center gap-2">
  <FaCalendarAlt className="text-black" />
  Mini Event Manager
</h1>

      <div className="bg-white p-12 rounded w-full max-w-md shadow-2xl">
        {/* Form */}
        <input
          type="text"
          placeholder="Event Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />
        <input
          type="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="border p-3 w-full mb-4 rounded"
          required
        />
        <button
          onClick={addEvent}
          className="bg-blue-500 text-white px-4 py-3 rounded font-semibold w-full cursor-pointer"
        >
          Add Event
        </button>

        {/* Show search only if events exist */}
        {events.length > 0 && (
          <>
            <input
              type="text"
              placeholder="🔍 Search events..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-3 w-full mt-6 mb-4 rounded"
            />
            <ul className="space-y-3">
              {filteredEvents.length > 0 ? (
                filteredEvents.map((event) => (
                  <li
                    key={event.id}
                    className="flex justify-between items-center bg-white p-4 rounded-lg shadow-sm border"
                  >
                    <span className="font-semibold">
                      {event.name} – {event.date}
                    </span>
                    <button
                      onClick={() => deleteEvent(event.id)}
                      className="text-red-500 hover:text-red-600 text-2xl cursor-pointer"
                    >
                      <MdDeleteForever />
                    </button>
                  </li>
                ))
              ) : (
                <p className="text-gray-500 text-center">No matching events found</p>
              )}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
