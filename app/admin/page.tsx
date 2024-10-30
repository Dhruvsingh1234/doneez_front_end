'use client';

import { Tabs, Tab, Card, CardBody, Input, Button } from '@nextui-org/react';
import { useEffect, useState } from 'react';
import { getStorage } from '../utils/helper';
import { redirect } from 'next/navigation';
import MechanicProfileList from './components/mechanis';

export default function Admin() {
    const [selected, setSelected] = useState<string>('Customers');
    useEffect(() => {
        const accessToken = getStorage('admin-access_token');
        console.log(accessToken);
        if (accessToken == null) {
            redirect('/admin/sign-in');
        }
    }, []);
    return (
        <div className="min-w-full min-h-screen bg-[#f4f6fa] flex flex-col">
            <div className="mt-16 flex flex-col items-center w-full">
                <div className="max-w-[1280px] w-full p-4 sm:p-6 md:p-8 lg:p-10 bg-white rounded-md shadow-[0_2px_2px_0_rgba(224,226,230,.5)]">
                    <Tabs
                        aria-label={'Options'}
                        selectedKey={selected}
                        onSelectionChange={(key) => setSelected(key as string)}
                        variant="underlined"
                        classNames={{
                            tabList:
                                'max-md:flex-wrap gap-0 w-full rounded-none',
                            tab: 'max-md:w-auto',
                            cursor: 'bg-red-700',
                        }}
                    >
                        <Tab key={'Customers'} title="Customers">
                            <Card>
                                <CardBody>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key={'Mechanics'} title="Mechanics">
                            <MechanicProfileList/>
                        </Tab>
                        <Tab key={'All Quotes'} title="All Quotes">
                            <Card>
                                <CardBody>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Requests" title="Requests">
                            <Card>
                                <CardBody>
                                    Lorem ipsum dolor sit amet, consectetur
                                    adipiscing elit, sed do eiusmod tempor
                                    incididunt ut labore et dolore magna aliqua.
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Booked" title="Booked">
                            <Card>
                                <CardBody>
                                    Ut enim ad minim veniam, quis nostrud
                                    exercitation ullamco laboris nisi ut aliquip
                                    ex ea commodo consequat. Duis aute irure
                                    dolor in reprehenderit in voluptate velit
                                    esse cillum dolore eu fugiat nulla pariatur.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Canceled Requests" title="Canceled Requests">
                            <Card>
                                <CardBody>
                                    Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </CardBody>
                            </Card>
                        </Tab>
                        <Tab key="Closed Requests" title="Closed Requests">
                            <Card>
                                <CardBody>
                                    Excepteur sint occaecat cupidatat non
                                    proident, sunt in culpa qui officia deserunt
                                    mollit anim id est laborum.
                                </CardBody>
                            </Card>
                        </Tab>
                    </Tabs>
                </div>
            </div>
        </div>
    );
}
