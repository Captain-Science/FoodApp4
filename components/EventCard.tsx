import React from 'react';
import { Event } from '../types';

interface EventCardProps {
  event: Event;
  onViewEvent?: (eventId: string) => void; // Optional: for future navigation to event detail page
}

const EventCard: React.FC<EventCardProps> = ({ event, onViewEvent }) => {
  const { title, date, time, location, description, image } = event;
  const formattedDate = new Date(date).toLocaleDateString(undefined, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    weekday: 'long',
  });

  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden transition-all duration-300 hover:shadow-amber-300/50 m-2 border border-lime-200 flex flex-col">
      {image && <img src={image} alt={title} className="w-full h-48 object-cover" />}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-xl font-bold text-amber-700 mb-2">{title}</h3>
        <p className="text-sm text-gray-600 mb-1">
          <strong className="text-amber-600">Date:</strong> {formattedDate}
        </p>
        {time && (
          <p className="text-sm text-gray-600 mb-1">
            <strong className="text-amber-600">Time:</strong> {time}
          </p>
        )}
        {location && (
          <p className="text-sm text-gray-600 mb-3">
            <strong className="text-amber-600">Location:</strong> {location}
          </p>
        )}
        <p className="text-gray-700 text-sm leading-relaxed mb-4 flex-grow">{description}</p>
        {onViewEvent && (
           <button
            onClick={() => onViewEvent(event.id)}
            className="mt-auto text-amber-600 hover:text-amber-500 font-semibold py-1.5 px-3 rounded-lg transition-colors duration-200 border border-amber-500 hover:border-amber-400 text-sm self-start"
          >
            View Details
          </button>
        )}
      </div>
    </div>
  );
};

export default EventCard;
