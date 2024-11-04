'use client';

import React, { useEffect, useState, useCallback } from 'react';
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
    Card,
    Skeleton,
    Input,
    Button,
    Checkbox,
    RadioGroup,
    Radio,
    Slider,
    SliderValue,
    Modal,
    ModalContent,
    ModalHeader,
    ModalBody,
    ModalFooter,
    useDisclosure,
} from '@nextui-org/react';
import { EditIcon } from './EditIcon';
import { EyeIcon } from './EyeIcon';
import { DeleteIcon } from './DeleteIcon';
import { SearchIcon } from './SearchIcon';

interface yearsFilter {
    min: number;
    max: number;
}
  

export default function MechanicProfileList() {
    const [mechanics, setMechanics] = useState<MechanicProfileType[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [searchValue, setSearchValue] = useState<string>('');
    const [selectedVerify, setSelectVerify] = useState<string>('all')
    const [selectedYears, setSelectedYears] = useState<SliderValue>([0, 40])

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
    const { isOpen, onOpen, onOpenChange } = useDisclosure();

    const getMechanics = async () => {
        setLoading(true);
        setError(null);
        let verified: boolean | null = null
        switch (selectedVerify) {
            case 'verified':
                verified = true
                break;
            case 'unverified':
                verified = false
                break;
            default:
                verified = null
                break;
        }
        try {
            const params = {
                page: pagination.current_page,
                page_size: 10,
                search: searchValue,
                verified: verified,

            };
            const data: PaginatedMechanicProfileResponse =
                await fetchMechanicProfileAll(params);
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

    const handleSearch = () => {
        getMechanics();
    };
 
    useEffect(() => {
        getMechanics();
    }, [pagination.current_page]);

    return (
        <div className="w-full">
            <div className="w-full flex flex-row items-center max-sm:flex-col my-4">
                <div className="max-w-[600px] w-full flex justify-center items-center text-white">
                    <Input
                        label="Search for business name, business info, heard info, certification, offered_services"
                        isClearable
                        radius="lg"
                        classNames={{
                            label: 'text-black/50 dark:text-white/90',
                            input: [
                                'bg-transparent',
                                'text-black/90 dark:text-white/90',
                                'placeholder:text-default-700/50 dark:placeholder:text-white/60',
                            ],
                            innerWrapper: 'bg-transparent',
                            inputWrapper: [
                                'shadow-xl',
                                'bg-default-200/50',
                                'dark:bg-default/60',
                                'backdrop-blur-xl',
                                'backdrop-saturate-200',
                                'hover:bg-default-200/70',
                                'dark:hover:bg-default/70',
                                'group-data-[focus=true]:bg-default-200/50',
                                'dark:group-data-[focus=true]:bg-default/60',
                                '!cursor-text',
                            ],
                        }}
                        placeholder="Type to search..."
                        startContent={
                            <SearchIcon className="text-black/50 mb-0.5 dark:text-white/90 text-slate-400 pointer-events-none flex-shrink-0" />
                        }
                        onValueChange={(value) => setSearchValue(value)}
                        value={searchValue}
                    />
                </div>
                <div className="ml-6 mr-auto">
                    <Button
                        color="primary"
                        size="md"
                        radius="sm"
                        onClick={handleSearch}
                        className="flex flex-row items-center"
                    >
                        <SearchIcon />
                        Search
                    </Button>
                </div>
                <div className="ml-auto mr-2">
                    <Button
                        size="md"
                        color="danger"
                        radius="sm"
                        onPress={onOpen}
                    >
                        Advanced Search
                    </Button>
                </div>
                <Modal
                    isOpen={isOpen}
                    onOpenChange={onOpenChange}
                    isDismissable={false}
                    isKeyboardDismissDisabled={true}
                    size='4xl'
                    scrollBehavior="inside"
                    className='h-[600px]'
                >
                    <ModalContent>
                        {(onClose) => (
                            <>
                                <ModalHeader className="flex flex-col gap-1">
                                    Advanced Search
                                </ModalHeader>
                                <ModalBody>
                                    <div className='w-full grid grid-cols-2 gap-4'>
                                        <div>
                                            <RadioGroup label='Verified status' value={selectedVerify} onChange={(e) => setSelectVerify(e.target.value)}>
                                                <Radio description='Verified mechanics' value={'verified'}>Verified</Radio>
                                                <Radio description='Unverified mechanics' value={'unverified'}>Unverified</Radio>
                                                <Radio description='All' value={'all'}>All</Radio>
                                            </RadioGroup>
                                            <div className="flex flex-col gap-2 w-full pt-6 max-w-md items-start justify-center">
                                                <Slider 
                                                    label="Select years experience"
                                                    step={1}
                                                    maxValue={40}
                                                    minValue={0}
                                                    value={selectedYears} 
                                                    onChange={setSelectedYears}
                                                    className="max-w-md"
                                                />
                                                <p className="text-default-500 font-medium text-small">
                                                    Selected years: {Array.isArray(selectedYears) && selectedYears.map((b) => `${b} year`).join(" – ")}
                                                </p>
                                            </div>
                                        </div>
                                    </div>

                                </ModalBody>
                                <ModalFooter>
                                    <Button
                                        color="danger"
                                        onPress={onClose}
                                    >
                                        Close
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </div>
            {loading && (
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
            )}
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
                                    <TableCell className="text-base">
                                        {' '}
                                        {mechanic.business_name}
                                    </TableCell>
                                    <TableCell>
                                        {mechanic.phone_number}
                                    </TableCell>
                                    <TableCell>
                                        {mechanic.offered_services?.join(', ')}
                                    </TableCell>
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
                                            <Tooltip
                                                color="danger"
                                                content="Delete user"
                                            >
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
                                setPagination((prev) => ({
                                    ...prev,
                                    current_page: page,
                                }))
                            }
                        />
                    </div>
                </>
            )}
        </div>
    );
}
