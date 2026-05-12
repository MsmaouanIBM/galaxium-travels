import type { Flight } from '../../types';
import { Button } from '../common';
import { Plane, Clock } from 'lucide-react';
import { formatDate, formatTime, calculateDuration } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface FlightCardProps {
  flight: Flight;
  onBook: (flight: Flight) => void;
}

export const FlightCard = ({ flight, onBook }: FlightCardProps) => {
  const isSoldOut = flight.seats_available === 0;
  
  // Check if flight has already departed
  const hasDeparted = new Date() > new Date(flight.departure_time);

  // Calculate class distribution (mock data for now)
  const economySeats = 10;
  const businessSeats = 5;
  const galaxiumSeats = 2;
  const totalSeats = economySeats + businessSeats + galaxiumSeats;

  // Price range (showing starting from economy price to galaxium price)
  const economyPrice = flight.price;
  const galaxiumPrice = Math.round(flight.price * 4);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <div className="bg-[#0f1729] border border-purple-500/20 rounded-lg p-3 h-full flex flex-col shadow-lg hover:shadow-purple-500/20 transition-shadow">
        {/* Route Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="p-1.5 bg-gradient-to-r from-purple-500 to-pink-500 rounded-lg">
              <Plane className="text-white" size={18} />
            </div>
            <div>
              <h3 className="text-base font-semibold text-white">
                {flight.origin} → {flight.destination}
              </h3>
              <p className="text-xs text-gray-400">
                Flight #{flight.flight_id}
              </p>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="space-y-2 mb-3 flex-1">
          {/* Departure & Arrival */}
          <div className="grid grid-cols-2 gap-3">
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Departure</p>
              <p className="text-xs text-gray-300">
                {formatDate(flight.departure_time, 'MMM dd, yyyy')}
              </p>
              <p className="text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {formatTime(flight.departure_time)}
              </p>
            </div>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Arrival</p>
              <p className="text-xs text-gray-300">
                {formatDate(flight.arrival_time, 'MMM dd, yyyy')}
              </p>
              <p className="text-base font-semibold bg-gradient-to-r from-purple-500 to-blue-500 bg-clip-text text-transparent">
                {formatTime(flight.arrival_time)}
              </p>
            </div>
          </div>

          {/* Duration */}
          <div className="flex items-center gap-1.5 text-gray-400">
            <Clock size={14} />
            <span className="text-xs">
              Duration: {calculateDuration(flight.departure_time, flight.arrival_time)}
            </span>
          </div>

          {/* Price Range */}
          <div className="space-y-0.5">
            <div className="flex items-baseline gap-1.5">
              <span className="text-xl font-bold text-white">
                ${economyPrice.toLocaleString()}
              </span>
              <span className="text-sm text-gray-400">
                - ${galaxiumPrice.toLocaleString()}
              </span>
            </div>
            <p className="text-xs text-gray-400">Starting from Economy</p>
          </div>

          {/* Seats Info */}
          <div className="text-xs text-gray-300">
            {totalSeats} seats across 3 classes
          </div>

          {/* Class Chips */}
          <div className="flex flex-wrap gap-1.5">
            <div className="px-2 py-0.5 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs text-blue-300">
              Economy: {economySeats}
            </div>
            <div className="px-2 py-0.5 bg-purple-500/20 border border-purple-500/30 rounded-full text-xs text-purple-300">
              Business: {businessSeats}
            </div>
            <div className="px-2 py-0.5 bg-pink-500/20 border border-pink-500/30 rounded-full text-xs text-pink-300">
              Galaxium: {galaxiumSeats}
            </div>
          </div>
        </div>

        {/* Book Button with Gradient */}
        <button
          onClick={() => onBook(flight)}
          disabled={isSoldOut || hasDeparted}
          className={`w-full py-2 px-3 rounded-lg font-semibold text-sm text-white transition-all ${
            isSoldOut || hasDeparted
              ? 'bg-gray-600 cursor-not-allowed opacity-50'
              : 'bg-gradient-to-r from-purple-500 to-pink-500 hover:from-purple-600 hover:to-pink-600 shadow-lg hover:shadow-purple-500/50'
          }`}
        >
          {hasDeparted ? 'Departed' : isSoldOut ? 'Sold Out' : 'Book Now'}
        </button>
      </div>
    </motion.div>
  );
};

// Made with Bob
