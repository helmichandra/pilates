import { Metadata } from 'next';
import TopupClient from './TopupClient';

export const metadata: Metadata = {
  title: 'Topup',
};

export default function Page() {
  return <TopupClient />;
}