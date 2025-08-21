import axios from 'axios';
import type { UserProfile } from '@/types/auth/auth';

export const profileRequest = () => {
  const fetchProfile = async (): Promise<UserProfile | null> => {
    try {
      const { data } = await axios.get<UserProfile>('/api/auth/profile', {
        withCredentials: true,
      });
      return data;
    } catch {
      return null;
    }
  };

  return { fetchProfile };
};
