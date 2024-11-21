import type { Metadata } from 'next'

export const metadata: Metadata = {
    title: 'Detail blog',
    description: 'detail blogs',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <>
            {children}
        </>
    )
}
