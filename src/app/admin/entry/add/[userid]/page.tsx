"use client";
import { useRouter,useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EntryForm } from '@/components/entry/entry-from';
type Props = {
    params: { userid: string };
    searchParams: {
      code: string;
    };
};
export default function Entries ({ params, searchParams}:Props) {
    const router = useRouter();
    const {userid} = params;

    return (
        <div className="container mx-auto px-4">
            <h1 className="text-2xl font-bold">Add Entry</h1>
            <>
            <EntryForm userId={parseInt(userid)}/>
            <Button onClick={() => router.push('/admin/entries')} className="mt-4"> Back</Button>
            </>
        </div>
    )
}