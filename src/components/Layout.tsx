// Layout.tsx
import React from 'react'
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from '@/components/sidebar';
import { useAuth } from '@/context/auth/useAuth';

type Props = {
    children?: React.ReactNode;
    title?: string;
    description?: string;
}

function Layout({ children, title, description }: Props) {
    const { user } = useAuth();

    return (

        <SidebarProvider className='relative'>
            {user && (
                <div className={`fixed hidden xl:block top-0 left-0 z-50 p-4`}>
                    <AppSidebar />
                </div>
            )}

            <main className="flex flex-col p-6 sm:p-8 h-[calc(100dvh)] w-full xl:w-[calc(100%-16.5rem)] xl:absolute right-0">
                <section className="flex flex-col justify-start gap- h-full w-full">
                    <header className="flex flex-col gap-2 border-b border-muted py-4">
                        <div className='flex justify-between'>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                            <SidebarTrigger className="block xl:hidden"></SidebarTrigger>
                        </div>
                        <p className="text-muted-foreground text-sm text-start">{description}</p>
                    </header>
                    {children}
                </section>
            </main>
        </SidebarProvider>
    )
}

export default Layout