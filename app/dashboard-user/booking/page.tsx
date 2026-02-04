import { Metadata } from 'next';
import BookingClient from './BookingClient';

export const metadata: Metadata = {
  title: 'Booking',
};

export default function Page() {
  return <BookingClient />;
}