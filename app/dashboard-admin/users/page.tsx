import { Metadata } from 'next';
import UsersAdmin from './UsersAdmin';

export const metadata: Metadata = {
  title: 'Users',
};

export default function Page() {
  return <UsersAdmin />;
}