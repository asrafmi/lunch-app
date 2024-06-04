import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import easyDB from 'easy-db-node';
import { backendRequest } from '@/infrastructure/backend-request';
import { PasswordHashing } from '@/utils/password';
const { insert } = easyDB({});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST') {
    res.status(405).json({ message: 'Method Not Allowed' });
    return;
  } else {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({ message: 'Bad Request' });
      return;
    }

    const hashedPassword = await PasswordHashing(password);

    const [err, response] = await to(
      insert('users', (id) => ({
        id: username,
        email,
        password: hashedPassword,
      }))
    );

    if (err) {
      throw err;
    }

    res.status(200).json({ message: 'User created' });
  }
};

export default handler;
