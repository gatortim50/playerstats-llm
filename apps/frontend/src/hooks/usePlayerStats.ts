import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import BASE_URL from './baseUrl';

export interface PlayerStats {
  id: string;
  rank: number;
  player: string;
  ageThatYear: number;
  hits: number;
  year: number;
  bats: string;
}

interface FetchParams {
  page: number;
  take: number;
  year?: number;
}

// fetch Players' data
const fetchPlayerStats = async ({ page, take, year }: FetchParams): Promise<PlayerStats[]> => {
  const { data } = await axios.get(`${BASE_URL}players`, {
    params: { page, take, year },
  });
  return data.data as unknown as PlayerStats[];
};

export const usePlayerStats = (page: number, take: number, year?: number): UseQueryResult<PlayerStats[], Error> => {
  return useQuery<PlayerStats[], Error>({
    queryKey: ['playerStats', page, take, year],
    queryFn: () => fetchPlayerStats({ page, take, year }),
    staleTime: 60000,
  });
};
