import { NextApiRequest, NextApiResponse } from 'next';
import to from 'await-to-js';
import easyDB from 'easy-db-node';
import { serialize } from 'cookie';
import { backendRequest } from '@/infrastructure/backend-request';
import { GenerateToken } from '@/utils/auth';
import { ErrorProps } from '@/types/error';
import { BadRequest } from '@/utils/error';
const { select } = easyDB({});

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    res.setHeader(
      'Set-Cookie',
      serialize('user', '', {
        httpOnly: true,
        path: '/',
        maxAge: -1,
      })
    );

    res.status(200).send({ message: 'Logout success' });
  } catch (error) {
    const customError = error as ErrorProps;
    res.status(customError.status).send({
      message: customError.message,
      status: customError.status,
    });
  }
};

export default handler;
