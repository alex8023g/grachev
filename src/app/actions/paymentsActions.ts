'use server';
import { searchParamsSchema, statusSchema } from '@/lib/searchParamsSchema';
import { Payment } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import prisma from '../../../prisma/db';
import { rowsPerPage } from '../../constants/paymentstableconsts';

export async function getAllPayments() {
  const res = await prisma.payment.findMany();
  return res;
}

export type ResponsePaymentsWithParams = {
  payments: Payment[];
  totalRecords: number;
};

export async function getPaymentsWithParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}): Promise<ResponsePaymentsWithParams> {
  const { page, email, statuses, sort } = parseSearchParams(searchParams);
  console.log('🚀 ~ sort:', sort);

  type QueryParams = {
    where: {
      status: {
        in: ('pending' | 'processing' | 'success' | 'failed')[] | undefined;
      };
      email: {
        contains: string | undefined;
        mode: 'insensitive';
      };
    };
    orderBy?:
      | {
          [x: string]: string;
        }
      | {
          [x: string]: string;
        }[];
    skip: number;
    take: number;
  };

  let queryParams: QueryParams = {
    where: {
      status: { in: statuses },
      email: { contains: email, mode: 'insensitive' },
    },
    skip: (Number(page) - 1) * rowsPerPage || 0,
    take: rowsPerPage,
  };

  if (sort) {
    const [sortField, sortBy] = sort?.split('.');
    if (sortField === 'amount') {
      queryParams = {
        ...queryParams,
        orderBy: [{ amount: sortBy }, { email: 'asc' }],
      };
    } else {
      {
        queryParams = { ...queryParams, orderBy: { [sortField]: sortBy } };
      }
    }
  }
  console.log('🚀 ~ queryParams:', queryParams);

  const payments = await prisma.payment.findMany(queryParams);

  const totalRecords = await prisma.payment.count({
    where: {
      status: { in: statuses },
      email: { contains: email, mode: 'insensitive' },
    },
  });

  return { payments, totalRecords };
}

export async function getFilteredPaymentsIds(searchParams?: {
  [key: string]: string | string[] | undefined;
}): Promise<string[]> {
  const { email, statuses } = parseSearchParams(searchParams);

  const allFilteredPaymentsIdObjs = await prisma.payment.findMany({
    where: {
      status: { in: statuses },
      email: { contains: email, mode: 'insensitive' },
    },
    select: { id: true },
  });

  return allFilteredPaymentsIdObjs.map((item) => item.id);
}

function parseSearchParams(searchParams?: {
  [key: string]: string | string[] | undefined;
}) {
  const { page, email, status, sort } = searchParamsSchema.parse(searchParams);
  const statuses = statusSchema.parse(status?.split('.'));

  return { page, email, statuses, sort };
}

export async function deletePayments(paymentsIds: string[]) {
  console.log(paymentsIds);
  await prisma.payment.deleteMany({
    where: { id: { in: paymentsIds } },
  });
  revalidatePath('/payments', 'page');
}
