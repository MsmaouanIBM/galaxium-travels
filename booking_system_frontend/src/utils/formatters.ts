import { format, parseISO } from 'date-fns';

/**
 * Format a date string to a readable format
 * Extracts date directly from ISO string without timezone conversion
 * @param dateString ISO date string
 * @param formatString date-fns format string (default: 'MMM dd, yyyy HH:mm')
 */
export const formatDate = (
  dateString: string,
  formatString: string = 'MMM dd, yyyy HH:mm'
): string => {
  try {
    // Extract date parts directly from ISO string (format: YYYY-MM-DDTHH:mm:ssZ)
    const [datePart, timePart] = dateString.split('T');
    const [year, month, day] = datePart.split('-');
    const [hours, minutes] = timePart ? timePart.split(':') : ['00', '00'];
    
    // Create a date object in UTC to avoid timezone conversion
    const date = new Date(Date.UTC(
      parseInt(year),
      parseInt(month) - 1, // months are 0-indexed
      parseInt(day),
      parseInt(hours),
      parseInt(minutes)
    ));
    
    return format(date, formatString);
  } catch (error) {
    console.error('Error formatting date:', error);
    return dateString;
  }
};

/**
 * Format date to short format (e.g., "Jan 1, 2099")
 */
export const formatDateShort = (dateString: string): string => {
  return formatDate(dateString, 'MMM dd, yyyy');
};

/**
 * Format time only (e.g., "09:00")
 * Extracts time directly from ISO string without timezone conversion
 */
export const formatTime = (dateString: string): string => {
  try {
    // Extract time directly from ISO string (format: YYYY-MM-DDTHH:mm:ssZ)
    const timePart = dateString.split('T')[1];
    if (timePart) {
      const [hours, minutes] = timePart.split(':');
      return `${hours}:${minutes}`;
    }
    return dateString;
  } catch (error) {
    console.error('Error formatting time:', error);
    return dateString;
  }
};

/**
 * Format currency (USD)
 * @param amount Amount in cents or dollars
 */
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

/**
 * Format large numbers with commas
 */
export const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

/**
 * Get relative time (e.g., "2 hours ago")
 */
export const getRelativeTime = (dateString: string): string => {
  try {
    const date = parseISO(dateString);
    const now = new Date();
    const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

    if (diffInSeconds < 60) return 'just now';
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)} minutes ago`;
    if (diffInSeconds < 86400) return `${Math.floor(diffInSeconds / 3600)} hours ago`;
    if (diffInSeconds < 2592000) return `${Math.floor(diffInSeconds / 86400)} days ago`;
    return formatDateShort(dateString);
  } catch (error) {
    return dateString;
  }
};

/**
 * Calculate flight duration in hours
 */
export const calculateDuration = (
  departureTime: string,
  arrivalTime: string
): string => {
  try {
    const departure = parseISO(departureTime);
    const arrival = parseISO(arrivalTime);
    const diffInHours = (arrival.getTime() - departure.getTime()) / (1000 * 60 * 60);
    
    if (diffInHours < 1) {
      return `${Math.round(diffInHours * 60)} min`;
    }
    
    const hours = Math.floor(diffInHours);
    const minutes = Math.round((diffInHours - hours) * 60);
    
    if (minutes === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${minutes}m`;
  } catch (error) {
    return 'N/A';
  }
};

// Made with Bob
