// Layout.tsx
import React from 'react'

type Props = {
    children?: React.ReactNode;
    title?: string;
    description?: string;
}

function Layout({ children, title, description }: Props) {

    return (

            <main className="flex flex-col p-6 sm:p-8 grow xl:absolute right-0">
                <section className="flex flex-col justify-start gap- h-full w-full">
                    <header className="flex flex-col gap-2 border-b border-muted py-4">
                        <div className='flex justify-between'>
                            <h1 className="text-3xl font-bold tracking-tight text-foreground">{title}</h1>
                        </div>
                        <p className="text-muted-foreground text-sm text-start">{description}</p>
                    </header>
                    {children}
                </section>
            </main>
    )
}

export default Layout
