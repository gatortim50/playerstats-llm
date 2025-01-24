import { useQuery, UseQueryResult } from '@tanstack/react-query';
import axios from 'axios';
import BASE_URL from './baseUrl';

interface FetchParams {
  take: number;
  year?: number;
}

// fetch Players' data
const fetchPages = async ({ take, year }: FetchParams): Promise<number> => {
  const { data } = await axios.get(`${BASE_URL}players/pages`, {
    params: { take, year },
  });
  return data.data as unknown as number;
};

export const usePages = (take: number, year?: number): UseQueryResult<number, Error> => {
  return useQuery<number, Error>({
    queryKey: ['fetchPages', take, year],
    queryFn: () => fetchPages({ take, year }),
  });
};
