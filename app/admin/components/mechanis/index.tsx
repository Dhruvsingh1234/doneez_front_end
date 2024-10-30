'use client';

import React, { useEffect, useState } from 'react';
import { fetchMechanicProfileAll } from '@/app/utils/api';
import {
  MechanicProfileType,
  PaginatedMechanicProfileResponse,
} from '@/app/utils/types';
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Tooltip,
  Pagination,
  PaginationItemType,
  PaginationItemRenderProps,
  Card, 
  Skeleton
} from '@nextui-org/react';
import { EditIcon } from './EditIcon';
import { EyeIcon } from './EyeIcon';
import { DeleteIcon } from './DeleteIcon';
import { ChevronIcon } from './ChevronIcon';

export function cn(...classes: (string | undefined | false)[]) {
  return classes.filter(Boolean).join(' ');
}

export default function MechanicProfileList() {
  const [mechanics, setMechanics] = useState<MechanicProfileType[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [filters, setFilters] = useState<Record<string, string>>({
    available_day_time: 'mon:8-12',
  });
  const [pagination, setPagination] = useState<{
    total_items: number;
    total_pages: number;
    current_page: number;
    next: string | null;
    previous: string | null;
  }>({
    total_items: 0,
    total_pages: 0,
    current_page: 1,
    next: null,
    previous: null,
  });

  useEffect(() => {
    const getMechanics = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: PaginatedMechanicProfileResponse = await fetchMechanicProfileAll(
          filters,
          pagination.current_page,
          10
        );
        setMechanics(data.results);
        setPagination((prev) => ({
          ...prev,
          total_items: data.total_items,
          total_pages: data.total_pages,
          next: data.next,
          previous: data.previous,
        }));
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    getMechanics();
  }, [filters, pagination.current_page]);

  return (
    <div className="w-full">
      {loading && 
          <Card className="w-full space-y-5 p-4" radius="lg">
            <Skeleton className="rounded-lg">
                <div className="h-16 rounded-lg bg-default-300"></div>
            </Skeleton>
          <div className="space-y-3">
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">
              <div className="h-6 w-full rounded-lg bg-default-200"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
            <Skeleton className="w-full rounded-lg">  
              <div className="h-6 w-full rounded-lg bg-default-300"></div>
            </Skeleton>
          </div>
        </Card>
    }
      {error && <p className="text-red-500">{error}</p>}
      {!loading && !error && (
        <>
          <Table>
            <TableHeader>
              <TableColumn>Business Name</TableColumn>
              <TableColumn>Phone Number</TableColumn>
              <TableColumn>Services offered</TableColumn>
              <TableColumn>Actions</TableColumn>
            </TableHeader>
            <TableBody>
              {mechanics.map((mechanic) => (
                <TableRow key={mechanic.id}>
                  <TableCell>{mechanic.business_name}</TableCell>
                  <TableCell>{mechanic.phone_number}</TableCell>
                  <TableCell>{mechanic.offered_services}</TableCell>
                  <TableCell>
                    <div className="relative flex items-center gap-2">
                      <Tooltip content="Details">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EyeIcon />
                        </span>
                      </Tooltip>
                      <Tooltip content="Edit user">
                        <span className="text-lg text-default-400 cursor-pointer active:opacity-50">
                          <EditIcon />
                        </span>
                      </Tooltip>
                      <Tooltip color="danger" content="Delete user">
                        <span className="text-lg text-danger cursor-pointer active:opacity-50">
                          <DeleteIcon />
                        </span>
                      </Tooltip>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          <div className="my-4 w-full">
            <Pagination
              showControls
              initialPage={pagination.current_page}
              total={pagination.total_pages}
              className="mx-auto"
              variant="light"
              onChange={(page) =>
                setPagination((prev) => ({ ...prev, current_page: page }))
              }
            />
          </div>
        </>
      )}
    </div>
  );
}
