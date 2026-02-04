import { Metadata } from 'next';
import CoachesAdmin from './CoachesAdmin';

export const metadata: Metadata = {
  title: 'Coaches',
};

export default function Page() {
  return <CoachesAdmin />;
}