import { useQuery } from '@tanstack/react-query';
import { getUserProfileApi } from '../api/get-user-profile.api';

export function useGetUserProfile() {
  return useQuery({
    queryKey: ['profile'],
    queryFn: getUserProfileApi,
  });
}
