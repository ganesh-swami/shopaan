"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from 'next/navigation'
import {getUser,getEntries,getUserEntries} from "@/lib/queries";
import {
    Entry,
    User,
    Item
  } from '@prisma/client'

import { columns } from "@/components/entry/columns"
import { DataTable } from "@/components/entry/data-table"
import { Button } from "@/components/ui/button";


export default function Entries () {

    const [customer,setCustomer]= useState<User>();
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
                    setCustomer(entries[0].user);
                }
                else{

                    const custmr = await getUser(parseInt(userid));
                    if(custmr) setCustomer(custmr );
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

    const handleClick =(userid:string)=>{
        console.log("clicked")
        router.push(`/admin/entry/add/${userid}/`);
    }
   
    return (
        <div className="flex flex-col items-center w-full pb-4">
            <div className="flex flex-col w-full justify-around pb-2">
               

               {customer && 
                    <div className="flex flex-col items-center mt-4">
                        <h1 className=""> {customer.name +" "+customer.cast} {customer.fatherName ? "S/O "+ customer.fatherName :null} </h1>
                        {customer.village && <p className='text-sm text-slate-400'>{"गाँव : "+ customer.village}</p>}
                        {(customer.address || customer.neighbour) && <p className='text-sm text-slate-700'>{"पता : "+ customer.address  +", "+customer.neighbour}</p> }
                        {customer.extra && <p className='text-sm text-slate-700'>{customer.extra}</p>}
                    </div> 
                }
                <div className="flex flex-row justify-center w-full">
                {<h1 className="">{!customer &&  'सभी एंट्री'}</h1> }
                { userid && <Button className="mt-2 max-w-32" size="sm" onClick={()=>handleClick(userid)}> + एंट्री लिखे </Button> }
                </div>
            </div>
            <DataTable columns={columns} data={entry} />
        </div>
    )
}