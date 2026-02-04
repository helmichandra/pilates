import { Metadata } from 'next';
import ClassesAdmin from './ClassesAdmin';

export const metadata: Metadata = {
  title: 'Classes',
};

export default function Page() {
  return <ClassesAdmin />;
}