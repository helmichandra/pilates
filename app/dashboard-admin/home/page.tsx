import { Metadata } from 'next';
import HomeAdmin from './HomeAdmin';

export const metadata: Metadata = {
  title: 'Home',
};

export default function Page() {
  return <HomeAdmin />;
}