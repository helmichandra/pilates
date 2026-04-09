import { Metadata } from 'next';
import PaymentPage from './PaymentAdmin';

export const metadata: Metadata = {
  title: 'History Payment',
};

export default function Page() {
  return <PaymentPage />;
}