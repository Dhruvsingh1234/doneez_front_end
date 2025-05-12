import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { getStorage , removeStorage } from '@/app/utils/helper';

export default function useAuth() {
  const router = useRouter();
  const [user, setUser] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userStr = getStorage('user');
    if (userStr) {
      try {
        setUser(JSON.parse(userStr));
        setLoading(false);
      } catch (error) {
        setUser(null);
        setLoading(false);
        router.replace('/sign-in');
      }
    } else {
      setUser(null);
      setLoading(false);
      router.replace('/sign-in');
    }
  }, [router]);

  const logout = () => {
    removeStorage('access_token');
    removeStorage('refresh_token');
    removeStorage('user');
    setUser(null);
    router.push('/sign-in');
  };

  return { user, loading, logout };
}