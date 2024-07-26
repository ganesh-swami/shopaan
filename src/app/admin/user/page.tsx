"use client";
import { useSession } from 'next-auth/react';

export default function ClientComponent () {
    const session = useSession();
   
    return (
        <p>Welcome {session?.data?.user?.name}</p>
    )
}