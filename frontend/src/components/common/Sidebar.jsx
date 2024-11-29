import React from 'react'
import { AppSidebar } from '@/components/common/AppSidebar';
import { SidebarTrigger, SidebarProvider, SidebarInset } from '@/components/ui/sidebar';
import { UserButton } from '@clerk/clerk-react';
import { Separator } from '@radix-ui/react-select';
import { Outlet } from 'react-router-dom';

const Sidebar = ({role}) => {
    return (
        <div>
            <SidebarProvider>
                <AppSidebar role={role}/>
                <main className='w-full'>
                    <SidebarInset>
                        <header className="h-14 shrink-0 items-center gap-2 border-b px-4">
                            <div className='flex justify-between items-center pt-3'>
                                <SidebarTrigger className="-ml-1" /><UserButton />
                            </div>
                            <Separator orientation="vertical" className="mr-2 h-4" />
                        </header>
                        <div className='px-10 py-4'>
                            <Outlet />
                        </div>
                    </SidebarInset>
                </main>
            </SidebarProvider>
        </div>
    )
}

export default Sidebar
