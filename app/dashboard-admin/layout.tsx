import { Metadata } from 'next';
import AdminDashboardClientLayout from './AdminDashboardClientLayout';

export const metadata: Metadata = {
  title: {
    default: 'Admin Dashboard - Fixclub',
    template: '%s - Fixclub', 
  },
};

export default function RootAdminLayout({ children }: { children: React.ReactNode }) {
  return <AdminDashboardClientLayout>{children}</AdminDashboardClientLayout>;
}