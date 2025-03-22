'use client';
import { Input } from '../ui/input';
import { useDebounce } from '../../hooks/use-debounce';
import { useSearchParams } from 'next/navigation';
import { useState } from 'react';
import { Button } from '../ui/button';
import { CircleX } from 'lucide-react';
import { twJoin } from 'tailwind-merge';

export function DataTableTextFilter() {
  const searchParams = useSearchParams();
  const [inputValue, setInputValue] = useState<string | null>(
    searchParams.get('email'),
  );

  useDebounce(inputValue);

  return (
    <div className='relative mb-3 mr-0 w-full lg:mb-0 lg:mr-3 lg:max-w-sm'>
      <Input
        placeholder='Filter emails...'
        value={inputValue || ''}
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        className='mr-2 lg:max-w-sm'
      />
      <Button
        type='button'
        variant='ghost'
        size='icon'
        className={twJoin(
          'absolute right-1 top-1/2 h-7 w-7 -translate-y-1/2 text-gray-500 transition-opacity hover:bg-transparent hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-100',
          inputValue
            ? 'opacity-100 duration-500'
            : 'pointer-events-none cursor-default opacity-0',
        )}
        onClick={() => setInputValue('')}
      >
        <CircleX />
      </Button>
    </div>
  );
}
