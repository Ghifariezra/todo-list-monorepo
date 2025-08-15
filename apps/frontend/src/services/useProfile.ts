import axios from 'axios';
import type { User } from '@/types/auth/auth';
import { useCallback } from 'react';

export const useProfile = () => {
  const fetchProfile = useCallback(
    async ({
      setUser,
      setLoading,
    }: {
      setUser: (user: User | null) => void;
      setLoading: (loading: boolean) => void;
    }) => {
      try {
        setLoading(true);
        const { data } = await axios.get<User>('/api/auth/profile', {
          withCredentials: true,
        });
        setUser(data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  return { fetchProfile };
};
