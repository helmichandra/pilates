import { Metadata } from 'next';
import HomeClient from './HomeClient';

export const metadata: Metadata = {
  title: 'Home',
  icons: {
    icon: '/media/logo.jpeg', // Jalur ini mengarah ke public/media/logo.jpeg
    shortcut: '/media/logo.jpeg',
    apple: '/media/logo.jpeg',
  },
};

export default function Page() {
  return <HomeClient />;
}