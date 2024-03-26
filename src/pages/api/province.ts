import { backendRequest } from '@/infrastructure/backend-request';
import to from 'await-to-js';
import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const [err, response] = await to(backendRequest().get('/api/provinces.json'));
  if (err) {
    throw err;
  }

  res.status(200).json(response.data);
};

export default handler;
