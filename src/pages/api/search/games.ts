import { NextApiRequest, NextApiResponse } from 'next';
import { fetchGames } from '@/api/fetchGames';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = (req.query.query as string) || '';
  const data = await fetchGames(1, query);

  res.status(200).json({
    items: data.games,
    count: data.count,
  });
};