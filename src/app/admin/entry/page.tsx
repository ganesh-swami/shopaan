"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import {getUsers} from "@/lib/queries";
import {
    Entry,
    User,
    Item
  } from '@prisma/client'

import { columns } from "@/components/entry/columns"
import { DataTable } from "@/components/entry/data-table"
import { Button } from "@/components/ui/button";


export default function Entries () {
    const router = useRouter();
    const [entry,setEntry]=useState<Entry[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getUsers();
            if(allUsers && allUsers.length>0) setUsers(allUsers);
        }
        fetchUsers();

    },[])

    const handleClick =()=>{
        console.log("clicked")
        router.push('/admin/user/add');
    }
   
    return (
        <div className="flex flex-col items-center w-full py-4">
            <div className="flex flex-row w-full items-center justify-around">
                <h1 className="py-4"> ग्राहक </h1>
                <Button size="sm" onClick={()=>handleClick()}> + जोड़े </Button>
            </div>
            <DataTable columns={columns} data={users} />
        </div>
    )
}