import { Metadata } from 'next';
import PackagesPage from './PackagesAdmin';

export const metadata: Metadata = {
  title: 'Packages',
};

export default function Page() {
  return <PackagesPage />;
}