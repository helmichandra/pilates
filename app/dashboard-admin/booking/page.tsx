import { Metadata } from 'next';
import BookingAdmin from './BookingAdmin';

export const metadata: Metadata = {
  title: 'Booking',
};

export default function Page() {
  return <BookingAdmin />;
}