import React from 'react';
import { Event } from '../types';
import EventCard from './EventCard';

interface CalendarViewProps {
  events: Event[];
  onViewEvent?: (eventId: string) => void;
}

const CalendarView: React.FC<CalendarViewProps> = ({ events, onViewEvent }) => {
  if (!events || events.length === 0) {
    return <p className="text-gray-400 text-center col-span-full py-8">No upcoming events.</p>;
  }

  const sortedEvents = [...events].sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

  return (
    <div className="space-y-6">
      {sortedEvents.map(event => (
        <EventCard key={event.id} event={event} onViewEvent={onViewEvent} />
      ))}
    </div>
  );
};

export default CalendarView;
