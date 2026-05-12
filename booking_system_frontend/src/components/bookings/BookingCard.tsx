import type { Booking, Flight } from '../../types';
import { Card, Button } from '../common';
import { Plane, Calendar, CheckCircle, XCircle, Clock, Ban } from 'lucide-react';
import { formatDate, formatCurrency } from '../../utils/formatters';
import { motion } from 'framer-motion';

interface BookingCardProps {
  booking: Booking;
  flight?: Flight;
  onCancel: (bookingId: number) => void;
  isCancelling?: boolean;
}

export const BookingCard = ({ booking, flight, onCancel, isCancelling }: BookingCardProps) => {
  const getStatusIcon = () => {
    switch (booking.status) {
      case 'booked':
        return <CheckCircle className="text-carbon-support-success" size={20} />;
      case 'cancelled':
        return <XCircle className="text-carbon-support-error" size={20} />;
      case 'completed':
        return <CheckCircle className="text-carbon-support-info" size={20} />;
      default:
        return <Clock className="text-carbon-text-secondary" size={20} />;
    }
  };

  const getStatusColor = () => {
    switch (booking.status) {
      case 'booked':
        return 'text-carbon-support-success';
      case 'cancelled':
        return 'text-carbon-support-error';
      case 'completed':
        return 'text-carbon-support-info';
      default:
        return 'text-carbon-text-secondary';
    }
  };

  const canCancel = booking.status === 'booked';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.2 }}
    >
      <Card>
        {/* Header */}
        <div className="flex items-start justify-between mb-04 pb-04 border-b border-carbon-border-subtle">
          <div className="flex items-center gap-03">
            <div className="p-02 bg-carbon-interactive">
              <Plane className="text-carbon-text-on-color" size={20} />
            </div>
            <div>
              <p className="text-sm text-carbon-text-secondary">Booking #{booking.booking_id}</p>
              <div className="flex items-center gap-02 mt-01">
                {getStatusIcon()}
                <span className={`text-sm font-normal capitalize ${getStatusColor()}`}>
                  {booking.status}
                </span>
              </div>
            </div>
          </div>
          
          {/* Cancelled Badge */}
          {booking.status === 'cancelled' && (
            <div className="badge badge-error">
              <Ban size={14} />
              <span>Cancelled</span>
            </div>
          )}
        </div>

        {/* Flight Details */}
        {flight ? (
          <div className="space-y-03 mb-04">
            <div>
              <h3 className="text-xl font-normal text-carbon-text-primary mb-01">
                {flight.origin} → {flight.destination}
              </h3>
              <p className="text-sm text-carbon-text-secondary">Flight #{flight.flight_id}</p>
            </div>

            <div className="grid grid-cols-2 gap-04">
              <div>
                <p className="text-xs text-carbon-text-secondary mb-01">Departure</p>
                <p className="text-sm text-carbon-text-primary font-normal">
                  {formatDate(flight.departure_time)}
                </p>
              </div>
              <div>
                <p className="text-xs text-carbon-text-secondary mb-01">Arrival</p>
                <p className="text-sm text-carbon-text-primary font-normal">
                  {formatDate(flight.arrival_time)}
                </p>
              </div>
            </div>

            <div className="flex items-center justify-between pt-03 border-t border-carbon-border-subtle">
              <span className="text-sm text-carbon-text-secondary">Price</span>
              <span className="text-lg font-normal text-carbon-text-primary">
                {formatCurrency(flight.price)}
              </span>
            </div>
          </div>
        ) : (
          <div className="mb-04">
            <p className="text-sm text-carbon-text-secondary">Flight ID: {booking.flight_id}</p>
          </div>
        )}

        {/* Booking Time */}
        <div className="space-y-02 mb-04">
          <div className="flex items-center gap-02 text-sm text-carbon-text-secondary">
            <Calendar size={16} />
            <span>Booked on {formatDate(booking.booking_time)}</span>
          </div>
          
          {/* Cancelled Time */}
          {booking.cancelled_at && (
            <div className="flex items-center gap-02 text-sm text-carbon-support-error">
              <Ban size={16} />
              <span>Cancelled on {formatDate(booking.cancelled_at)}</span>
            </div>
          )}
        </div>

        {/* Cancel Button */}
        {canCancel && (
          <Button
            variant="danger"
            size="sm"
            onClick={() => onCancel(booking.booking_id)}
            isLoading={isCancelling}
            className="w-full"
          >
            Cancel Booking
          </Button>
        )}
      </Card>
    </motion.div>
  );
};

// Made with Bob - IBM Carbon Design System
