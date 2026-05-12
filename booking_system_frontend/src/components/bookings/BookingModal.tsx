import { useState } from 'react';
import type { Flight } from '../../types';
import { Modal, Button, Input } from '../common';
import { Plane, Calendar, Clock, DollarSign, Users, Baby } from 'lucide-react';
import { formatCurrency, formatDate, calculateDuration } from '../../utils/formatters';
import { bookFlight, isErrorResponse } from '../../services/api';
import { useUser } from '../../hooks/useUser';
import toast from 'react-hot-toast';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  flight: Flight | null;
  onSuccess: () => void;
}

export const BookingModal = ({ isOpen, onClose, flight, onSuccess }: BookingModalProps) => {
  const { user } = useUser();
  const [isLoading, setIsLoading] = useState(false);
  const [numAdults, setNumAdults] = useState(1);
  const [numInfants, setNumInfants] = useState(0);

  if (!flight) return null;

  const maxInfants = numAdults * 2;
  const totalPrice = flight.price * numAdults;

  const handleConfirmBooking = async () => {
    if (!user) {
      toast.error('Please sign in to book a flight');
      return;
    }

    if (numInfants > maxInfants) {
      toast.error(`Maximum ${maxInfants} infant(s) allowed for ${numAdults} adult(s)`);
      return;
    }

    if (numAdults > flight.seats_available) {
      toast.error(`Only ${flight.seats_available} seat(s) available`);
      return;
    }

    setIsLoading(true);

    try {
      const result = await bookFlight({
        user_id: user.user_id,
        name: user.name,
        flight_id: flight.flight_id,
        num_adults: numAdults,
        num_infants: numInfants,
      });

      if (isErrorResponse(result)) {
        toast.error(result.details || result.error);
        return;
      }

      toast.success('Flight booked successfully!');
      onSuccess();
      onClose();
    } catch (error: any) {
      toast.error(error.details || error.error || 'Failed to book flight');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Confirm Your Booking"
      size="md"
    >
      <div className="space-y-6">
        {/* Flight Summary */}
        <div className="glass-card p-4 bg-white/5">
          <div className="flex items-center gap-3 mb-4">
            <div className="p-2 rounded-lg bg-cosmic-gradient">
              <Plane className="text-white" size={24} />
            </div>
            <div>
              <h3 className="text-xl font-bold text-star-white">
                {flight.origin} → {flight.destination}
              </h3>
              <p className="text-sm text-star-white/60">
                Flight #{flight.flight_id}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            {/* Departure */}
            <div className="flex items-start gap-3">
              <Calendar className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Departure</p>
                <p className="text-star-white font-medium">
                  {formatDate(flight.departure_time)}
                </p>
              </div>
            </div>

            {/* Arrival */}
            <div className="flex items-start gap-3">
              <Calendar className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Arrival</p>
                <p className="text-star-white font-medium">
                  {formatDate(flight.arrival_time)}
                </p>
              </div>
            </div>

            {/* Duration */}
            <div className="flex items-start gap-3">
              <Clock className="text-cosmic-purple mt-1" size={20} />
              <div>
                <p className="text-xs text-star-white/60">Duration</p>
                <p className="text-star-white font-medium">
                  {calculateDuration(flight.departure_time, flight.arrival_time)}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Passenger Selection */}
        <div className="glass-card p-4 bg-white/5 space-y-4">
          <h4 className="text-sm font-semibold text-star-white mb-3">
            Passenger Details
          </h4>
          
          {/* Number of Adults */}
          <div>
            <label className="block text-sm font-medium text-star-white mb-2 flex items-center gap-2">
              <Users size={16} className="text-cosmic-purple" />
              Number of Adults
            </label>
            <Input
              type="number"
              min="1"
              max={flight.seats_available}
              value={numAdults}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 1;
                setNumAdults(Math.max(1, Math.min(value, flight.seats_available)));
                // Adjust infants if they exceed the new limit
                if (numInfants > value * 2) {
                  setNumInfants(value * 2);
                }
              }}
              className="w-full"
            />
            <p className="text-xs text-star-white/60 mt-1">
              {flight.seats_available} seat(s) available
            </p>
          </div>

          {/* Number of Infants */}
          <div>
            <label className="block text-sm font-medium text-star-white mb-2 flex items-center gap-2">
              <Baby size={16} className="text-cosmic-purple" />
              Number of Infants
            </label>
            <Input
              type="number"
              min="0"
              max={maxInfants}
              value={numInfants}
              onChange={(e) => {
                const value = parseInt(e.target.value) || 0;
                setNumInfants(Math.max(0, Math.min(value, maxInfants)));
              }}
              className="w-full"
            />
            <p className="text-xs text-star-white/60 mt-1">
              Infants (under 2) do not get their own seat. Max {maxInfants} for {numAdults} adult(s).
            </p>
          </div>
        </div>

        {/* Passenger Info */}
        {user && (
          <div className="glass-card p-4 bg-white/5">
            <h4 className="text-sm font-semibold text-star-white mb-2">
              Booking For
            </h4>
            <p className="text-star-white">{user.name}</p>
            <p className="text-star-white/60 text-sm">{user.email}</p>
          </div>
        )}

        {/* Price */}
        <div className="flex items-center justify-between p-4 glass-card bg-cosmic-gradient">
          <div className="flex items-center gap-2">
            <DollarSign className="text-white" size={24} />
            <span className="text-white font-semibold">Total Price</span>
          </div>
          <span className="text-2xl font-bold text-white">
            {formatCurrency(totalPrice)}
          </span>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <Button
            variant="secondary"
            onClick={onClose}
            disabled={isLoading}
            className="flex-1"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmBooking}
            isLoading={isLoading}
            className="flex-1"
          >
            Confirm Booking
          </Button>
        </div>

        <p className="text-xs text-star-white/60 text-center">
          By confirming, you agree to our terms and conditions
        </p>
      </div>
    </Modal>
  );
};

// Made with Bob
