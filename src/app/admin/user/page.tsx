"use client";
import { useEffect, useState } from "react";
import {getUsers} from "@/lib/queries";
import {
    User,
    Item
  } from '@prisma/client'

import { columns } from "@/components/users/columns"
import { DataTable } from "@/components/users/data-table"
import { Button } from "@/components/ui/button";


export default function ClientComponent () {

    const [users,setUsers]=useState<User[]>([]);

    useEffect(() => {
        const fetchUsers = async () => {
            const allUsers = await getUsers();
            if(allUsers && allUsers.length>0) setUsers(allUsers);
        }
        fetchUsers();

    },[])
   
    return (
        <div className="flex flex-col items-center w-full py-4">
            <div className="flex flex-row w-full items-center justify-around">
                <h1 className="py-4"> ग्राहक </h1>
                <Button size="sm"> + जोड़े </Button>
            </div>
            <DataTable columns={columns} data={users} />
        </div>
    )
}