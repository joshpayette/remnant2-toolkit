import {
  type GetServerSidePropsContext,
  type NextApiRequest,
  type NextApiResponse,
} from 'next';
import { getServerSession } from 'next-auth';

import { authOptions } from '@/app/(features)/auth/configs/authOptions';

export function getSession(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
