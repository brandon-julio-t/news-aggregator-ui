import useSWR from 'swr';
import axios from '../common/axios';
import User from '../contracts/User';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function useUser() {
  const router = useRouter();
  const pathname = usePathname();
  const swr = useSWR('/api/user', () => axios.get<User>('/api/user').then(r => r.data));

  useEffect(() => {
    if (swr.isLoading) return;

    if (swr.data && pathname.startsWith('/auth')) {
      router.push('/home');
      return;
    }

    if (!swr.data && !pathname.startsWith('/auth')) {
      router.push('/auth/login');
      return;
    }
  }, [pathname, router, swr.data, swr.isLoading]);

  return swr;
}
