import type { Flight } from '../../types';
import { Card, Button } from '../common';
import { Plane, Clock, DollarSign, Users } from 'lucide-react';
import { formatCurrency, formatDate, formatTime, calculateDuration } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

export const FlightCard = ({ flight, onBook }: FlightCardProps) => {
  const isLowSeats = flight.seats_available <= 2;
  const isSoldOut = flight.seats_available === 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="h-full flex flex-col">
        {/* Route Header */}
        <div className="flex items-center justify-between mb-04 pb-04 border-b border-carbon-border-subtle">
          <div className="flex items-center gap-03">
            <div className="p-02 bg-carbon-interactive">
              <Plane className="text-carbon-text-on-color" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-normal text-carbon-text-primary">
                {flight.origin} → {flight.destination}
              </h3>
              <p className="text-sm text-carbon-text-secondary">
                Flight #{flight.flight_id}
              </p>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="space-y-03 mb-05 flex-1">
          {/* Departure & Arrival */}
          <div className="grid grid-cols-2 gap-04">
            <div>
              <p className="text-xs text-carbon-text-secondary mb-01">Departure</p>
              <p className="text-sm font-normal text-carbon-text-primary">
                {formatDate(flight.departure_time, 'MMM dd, yyyy')}
              </p>
              <p className="text-lg font-medium text-carbon-interactive">
                {formatTime(flight.departure_time)}
              </p>
            </div>
            <div>
              <p className="text-xs text-carbon-text-secondary mb-01">Arrival</p>
              <p className="text-sm font-normal text-carbon-text-primary">
                {formatDate(flight.arrival_time, 'MMM dd, yyyy')}
              </p>
              <p className="text-lg font-medium text-carbon-interactive">
                {formatTime(flight.arrival_time)}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-02 text-carbon-text-secondary">
            <Clock size={16} />
            <span className="text-sm">
              Duration: {calculateDuration(flight.departure_time, flight.arrival_time)}
            </span>
          </div>

          {/* Price */}
          <div className="flex items-center gap-02">
            <DollarSign size={16} className="text-carbon-support-success" />
            <span className="text-2xl font-normal text-carbon-text-primary">
              {formatCurrency(flight.price)}
            </span>
            <span className="text-sm text-carbon-text-secondary">per seat</span>
          </div>

          {/* Seats Available */}
          <div className="flex items-center gap-02">
            <Users size={16} className={isLowSeats ? 'text-carbon-support-warning' : 'text-carbon-text-secondary'} />
            <span className={`text-sm ${isLowSeats ? 'text-carbon-support-warning font-medium' : 'text-carbon-text-secondary'}`}>
              {isSoldOut ? 'Sold Out' : `${flight.seats_available} seats available`}
            </span>
          </div>
        </div>

        {/* Book Button */}
        <Button
          onClick={() => onBook(flight)}
          disabled={isSoldOut}
          className="w-full"
        >
          {isSoldOut ? 'Sold Out' : 'Book Now'}
        </Button>
      </Card>
    </motion.div>
  );
};

// Made with Bob - IBM Carbon Design System
