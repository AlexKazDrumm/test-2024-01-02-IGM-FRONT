import { NextApiRequest, NextApiResponse } from 'next';
import { fetchMovies } from '@/api/fetchMovies';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = req.query.query as string || '';
  const data = await fetchMovies(1, query);

  res.status(200).json({
    items: data.movies,
    count: data.count,
  });
};