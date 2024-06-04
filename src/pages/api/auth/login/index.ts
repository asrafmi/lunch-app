import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import easyDB from 'easy-db-node';
const { select } = easyDB({});
import { backendRequest } from '@/infrastructure/backend-request';
import { GenerateToken } from '@/utils/auth';
import { ErrorProps } from '@/types/error';
import { BadRequest } from '@/utils/error';
import { PasswordCompare } from '@/utils/password';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    const { email, password } = req.body;

    const [err, users] = await to(select('users'));
    if (err) {
      throw err;
    }

    const user = Object.values(users).find((user) => user.email === email);
    if (!user) {
      throw new BadRequest('User not found!');
    }

    const passwordHash = await PasswordCompare(password, user.password);

    if (!passwordHash) {
      throw new BadRequest('Incorrect username/password!');
    }

    const token = GenerateToken(user);

    res.setHeader(
      'Set-Cookie',
      `user=${JSON.stringify(user)}; Path=/; HttpOnly;`
    );

    res.status(200).send({ ...user, token });
  } catch (error) {
    const customError = error as ErrorProps;
    res.status(customError.status).send({
      message: customError.message,
      status: customError.status,
    });
  }
};

export default handler;
