import * as React from 'react';
import { ColumnDef, flexRender, getCoreRowModel, getSortedRowModel, SortingState, useReactTable } from '@tanstack/react-table';
import { resolveStatus } from './EventRow';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './ui/table';
import { Button } from './ui/button';
import type { EventEntity } from '../lib/db';

export const eventColumns: ColumnDef<EventEntity>[] = [
  { accessorKey: 'title', header: 'Title' },
  { accessorKey: 'startDateTime', header: 'Start', cell: ({ getValue }) => new Date(String(getValue())).toLocaleString() },
  { accessorKey: 'durationSeconds', header: 'Duration (min)', cell: ({ getValue }) => Math.round(Number(getValue()) / 60) },
];

export function EventDataTable({ data, onRowClick }: { data: EventEntity[]; onRowClick?: (row: EventEntity) => void }) {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const table = useReactTable({
    data,
    columns: eventColumns,
    state: { sorting },
    onSortingChange: setSorting,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });
  return (
    <div className="overflow-hidden rounded-md border">
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((hg) => (
            <TableRow key={hg.id}>
              {hg.headers.map((h) => (
                <TableHead key={h.id} onClick={h.column.getToggleSortingHandler?.() as any} className="cursor-pointer select-none">
                  {flexRender(h.column.columnDef.header, h.getContext())}
                </TableHead>
              ))}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => {
              const entity = row.original as EventEntity;
              const status = resolveStatus({
                id: '',
                title: entity.title,
                icon: entity.icon,
                description: entity.description,
                startDateTime: entity.startDateTime,
                durationSeconds: entity.durationSeconds,
              } as any);
              const clickable = status === 'upcoming' || status === 'running';
              return (
                <TableRow
                  key={row.id}
                  className={clickable ? 'cursor-pointer' : ''}
                  onClick={() => clickable && onRowClick?.(entity)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                  ))}
                </TableRow>
              );
            })
          ) : (
            <TableRow>
              <TableCell colSpan={eventColumns.length} className="h-24 text-center">No results.</TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

