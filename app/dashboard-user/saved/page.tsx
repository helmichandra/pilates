import { Metadata } from 'next';
import SavedClient from './SavedClient';

export const metadata: Metadata = {
  title: 'MyBooking',
};

export default function Page() {
  return <SavedClient />;
}