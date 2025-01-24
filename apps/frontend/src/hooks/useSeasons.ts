import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import BASE_URL from './baseUrl';

const fetchSeasons = async (): Promise<number[]> => {
  const { data } = await axios.get(`${BASE_URL}seasons`);
  return data.data as unknown as number[];
};

export const useSeasons = (): UseQueryResult<number[], Error> => {
  return useQuery<number[], Error>({
    queryKey: ['fetcjSeaspms'],
    queryFn: () => fetchSeasons(),
    staleTime: 6000000,
  });
};
