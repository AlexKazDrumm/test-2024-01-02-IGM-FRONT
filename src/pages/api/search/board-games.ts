import { NextApiRequest, NextApiResponse } from 'next';
import { fetchBoardGames } from '@/api/fetchBoardGames';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = (req.query.query as string) || '';
  const data = await fetchBoardGames(1, query);

  res.status(200).json({
    items: data.items,
    count: data.count,
  });
};
