"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import {getEntries,getUserEntries} from "@/lib/queries";
import {
    Entry,
    User,
    Item
  } from '@prisma/client'

import { columns } from "@/components/entry/columns"
import { DataTable } from "@/components/entry/data-table"
import { Button } from "@/components/ui/button";


export default function Entries () {

    const [customerName,setCustomerName]= useState<string>();
    const router = useRouter();
    
    const searchParams = useSearchParams()
 
    const page = searchParams.get('page')
    const userid = searchParams.get('userid')
    const [entry,setEntry]=useState<Entry[]>([]);


    const setEntries = (entries:Entry[])=>{
        setEntry(entries);
    }

    useEffect(() => {
        
        const fetchUsers = async () => {
            if(userid && userid!==''){
                const entries = await getUserEntries(parseInt(userid));
                if(entries && entries.length>0) {
                    setEntries(entries);
                    //@ts-ignore
                    setCustomerName(entries[0].user?.name);
                }

            }
            else{
                let curentPage = page ? parseInt(page) : 1;
                const entries = await getEntries(curentPage);
                if(entries && entries.length>0) setEntries(entries);
            }
            
        }
        fetchUsers();

    },[page,userid])

    const handleClick =()=>{
        console.log("clicked")
        router.push('/admin/entry/add');
    }
   
    return (
        <div className="flex flex-col items-center w-full py-4">
            <div className="flex flex-row w-full items-center justify-around">
               <h1 className="py-4">{customerName ? customerName : 'ग्राहक' }</h1>
                { userid && <Button size="sm" onClick={()=>handleClick()}> + जोड़े </Button> }
            </div>
            <DataTable columns={columns} data={entry} />
        </div>
    )
}