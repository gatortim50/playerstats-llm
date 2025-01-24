import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import BASE_URL from './baseUrl';
import { PlayerStats } from './usePlayerStats';

// fetch Players' data
const fetchPlayer = async (id: string): Promise<PlayerStats> => {
  const { data } = await axios.get(`${BASE_URL}players/${id}`);
  return data.data as unknown as PlayerStats;
};

export const usePlayer = (id: string): UseQueryResult<PlayerStats, Error> => {
  return useQuery<PlayerStats, Error>({
    queryKey: ['fetchPlayer', id],
    queryFn: () => fetchPlayer(id),
    staleTime: 60000,
  });
};
