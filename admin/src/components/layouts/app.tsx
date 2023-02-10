import {SUPER_ADMIN} from '@/utils/constants';
import dynamic from 'next/dynamic';
import ShopLayout from "@/components/layouts/shop";

const AdminLayout = dynamic(() => import('@/components/layouts/admin'));

export default function AppLayout({
  userPermissions,
  ...props
}: {
  userPermissions: string[];
}) {

  if (userPermissions?.includes(SUPER_ADMIN)) {
    return <AdminLayout {...props} />;
  }
  return <ShopLayout {...props} />;
}
