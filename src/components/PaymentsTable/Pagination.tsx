'use client';
import { createSearchParams } from '@/lib/createSearchParams';
import { Button } from '../ui/button';
import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { twJoin } from 'tailwind-merge';

export function Pagination({ totalPages }: { totalPages: number }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const page = searchParams.get('page');
  return (
    <div className='flex flex-grow space-x-2'>
      <div className='mx-auto inline-block align-baseline text-sm text-muted-foreground'>
        page {page || 1} of {totalPages}
      </div>
      <div className='w-20'>
        <Button
          className={twJoin(
            'scale-0 select-none transition-transform',
            Boolean(page) && 'scale-100',
          )}
          variant='outline'
          size='sm'
          onClick={() => {
            const modSearchParams = createSearchParams(
              { page: page === '2' ? '' : Number(page) - 1 },
              searchParams,
            );

            router.push(pathname + '?' + modSearchParams);
          }}
          disabled={!page}
        >
          Previous
        </Button>
      </div>
      {/* <Button
        variant='outline'
        size='sm'
        onClick={() => {
          const modSearchParams = createSearchParams(
            { page: page === '2' ? '' : Number(page) - 1 },
            searchParams
          );

          router.push(pathname + '?' + modSearchParams);
        }}
        disabled={!page}
      >
        Previous
      </Button> */}
      <Button
        className='select-none'
        variant='outline'
        size='sm'
        onClick={() => {
          const modSearchParams = createSearchParams(
            { page: page ? Number(page) + 1 : 2 },
            searchParams,
          );

          router.push(pathname + '?' + modSearchParams);
        }}
        disabled={Number(page || 1) === totalPages}
      >
        Next
      </Button>
    </div>
  );
}
