'use client';
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  VisibilityState,
} from '@tanstack/react-table';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction, useState } from 'react';
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { DataTableFacetedFilter } from './DataTableFacetedFilter';
import { filterableColumns } from './columns';
import { DataTableTextFilter } from './DataTableTextFilter';
import { Pagination } from './Pagination';
import { deletePayments } from '../../app/actions/paymentsActions';
import { twJoin } from 'tailwind-merge';
import { Flipper, Flipped } from 'react-flip-toolkit';
import { Payment } from '@prisma/client';
import { delay } from '@/lib/delay';
import { rowsPerPage } from '../../constants/paymentstableconsts';

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  paymentServerResp: {
    payments: TData[];
    totalRecords: number;
  };
  selectedRows: string[];
  setSelectedRows: Dispatch<SetStateAction<string[]>>;
}

// !!! TData extends Payment here needs to extends TData with our data type !!!
// otherwise row.original doesn't have types from our data
export function DataTable<TData extends Payment, TValue>({
  columns,
  paymentServerResp,
  selectedRows,
  setSelectedRows,
}: DataTableProps<TData, TValue>) {
  console.log('DataTable');
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [deleteRows, setDeleteRows] = useState(false);
  // const refDelBtn = useRef<HTMLButtonElement | null>(null);
  const { payments, totalRecords } = paymentServerResp;
  const table = useReactTable({
    data: payments,
    columns,
    getCoreRowModel: getCoreRowModel(),
    // onSortingChange: setSorting,
    // getSortedRowModel: getSortedRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    // onRowSelectionChange: setRowSelection,
    state: {
      // sorting,
      // columnFilters,
      columnVisibility,
      // rowSelection,
    },
    manualPagination: true,
    manualFiltering: true,
    manualSorting: true,
  });

  const totalPages = Math.ceil(totalRecords / rowsPerPage);

  const filterableColumnsList = filterableColumns();

  return (
    <div>
      <Flipper flipKey={table.getRowModel().rows.map((row) => row.original.id)}>
        <div className='flex flex-wrap items-center py-4'>
          <DataTableTextFilter />
          {filterableColumnsList.length &&
            filterableColumnsList.map(
              (column) =>
                table.getColumn(column.id ? String(column.id) : '') && (
                  <DataTableFacetedFilter
                    key={String(column.id)}
                    column={table.getColumn(column.id ? String(column.id) : '')}
                    title={column.title}
                    options={column.options}
                  />
                ),
            )}
          <div className='ml-auto space-x-2'>
            <Button
              variant='destructive'
              className={twJoin(
                'ml-auto shadow-md transition-transform',
                selectedRows?.length ? 'scale-100' : 'scale-0 cursor-default',
              )}
              onClick={async () => {
                console.log(selectedRows);
                setDeleteRows(true);
                await delay(500);
                deletePayments(selectedRows);
                await delay(100);
                setDeleteRows(false);
                setSelectedRows([]);
              }}
            >
              Удалить
            </Button>

            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant='outline' className=''>
                  Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align='end'>
                {table
                  .getAllColumns()
                  .filter((column) => column.getCanHide())
                  .map((column) => {
                    return (
                      <DropdownMenuCheckboxItem
                        key={column.id}
                        className='capitalize'
                        checked={column.getIsVisible()}
                        onCheckedChange={(value) =>
                          column.toggleVisibility(!!value)
                        }
                      >
                        {column.id}
                      </DropdownMenuCheckboxItem>
                    );
                  })}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
        <div className='rounded-md border'>
          <Table>
            <TableHeader className='bg-gray-100 shadow-sm hover:bg-gray-100'>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <Flipped key={header.id} flipId={header.id}>
                        <TableHead key={header.id}>
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext(),
                              )}
                        </TableHead>
                      </Flipped>
                    );
                  })}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <Flipped key={row.original.id} flipId={row.original.id}>
                    <TableRow
                      className={twJoin(
                        'animate-opacity-inc',
                        selectedRows.includes(row.original.id) && deleteRows
                          ? 'opacity-0'
                          : 'opacity-100',
                      )}
                      key={row.original.id}
                      data-state={row.getIsSelected() && 'selected'}
                    >
                      {row.getVisibleCells().map((cell) => (
                        <TableCell key={cell.id}>
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext(),
                          )}
                        </TableCell>
                      ))}
                    </TableRow>
                  </Flipped>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className='h-24 text-center'
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
        <div className='flex items-center justify-between space-x-2 py-4'>
          <div className='text-sm text-muted-foreground'>
            {selectedRows?.length || 0} of {totalRecords} row(s) selected.
          </div>
          <Pagination totalPages={totalPages} />
        </div>
      </Flipper>
    </div>
  );
}
