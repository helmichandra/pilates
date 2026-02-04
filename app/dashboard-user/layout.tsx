import { Metadata } from 'next';
import UserDashboardClient from './UserDashboardClient';

export const metadata: Metadata = {
  title: {
    default: 'Fixclub',
    template: '%s - Fixclub', 
  },
};

export default function Layout({ children }: { children: React.ReactNode }) {
  return <UserDashboardClient>{children}</UserDashboardClient>;
}