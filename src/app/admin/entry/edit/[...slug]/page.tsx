"use client";
import { useRouter,useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { EntryForm } from '@/components/entry/entry-from';
type Props = {
    params: { slug: Array<string> };
    searchParams: {
      code: string;
    };
};
export default function Entries ({ params, searchParams}:Props) {
    const router = useRouter();
    const {slug} = params;
    const userid= slug[0];
    const id= slug[1];
    console.log('slug ',slug);

    return (
        <div className="flex flex-col items-center">
            <h1 className="text-2xl font-bold">Add Entry</h1>
            <>
            <EntryForm userId={parseInt(userid)} id={parseInt(id)}/>
            <Button onClick={() => router.push('/admin/entries')} className="mt-4"> Back</Button>
            </>
        </div>
    )
}