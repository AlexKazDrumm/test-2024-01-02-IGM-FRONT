import { NextApiRequest, NextApiResponse } from 'next';
import { fetchBooks } from '../../../api/fetchBooks';

export default async (req: NextApiRequest, res: NextApiResponse) => {
  const query = (req.query.query as string) || '';
  const data = await fetchBooks(1, query);

  res.status(200).json({
    items: data.books,
    count: data.count,
  });
};
