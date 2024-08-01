"use client"

import { ColumnDef } from "@tanstack/react-table"
import {User} from '@prisma/client'
import { ArrowUpDown, Pencil,View } from "lucide-react";
import { Button } from "../ui/button"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

const handleEdit =(userId:number)=>{
  window.location.replace(`/admin/user/edit/${userId}`)
}

const handleView =(userId:number)=>{
  window.location.replace(`/admin/entry?userid=${userId}`)
}


export const columns: ColumnDef<User>[] = [
  {
    accessorKey: "name",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            नाम
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const name = row.original.name;
      const cast = row.original.cast;
      const village = row.original.village;
      return <div className="flex flex-col"><div className="">{name}</div><div className="text-blue-800"> {cast} </div> <div className="text-sm text-slate-600">{village}</div></div>
    }
  },
  {
    accessorKey: "village",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            //onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            देखे 
          </Button>
        )
    },
    cell: ({ row }) => {
      const userId = row.original?.id;
      // const showBtn= row.original.status==='DONE' ?false : true;
      return (
        <div className="text-center flex">
        <Button onClick={()=>{handleView(userId)}} variant="outline" className="text-green-700"><View size={24} strokeWidth={1} /></Button>
      </div>
    )
    },
  },
  
  {
    accessorKey: "address",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            पता
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const fatherName = row.original.fatherName;
      const address = row.original.address;
      const phone = row.original.phone;
      return <div className="flex flex-col"><div className="text-slate-500 text-sm">{fatherName ? "S/O "+ fatherName : null}</div><div className="text-slate-800"> {address} </div> <div className="text-sm text-blue-600 text-xs">{phone ? phone : null}</div></div>
    }

    
  },

  {
    accessorKey: "village",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            //onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            चेंज
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
    cell: ({ row }) => {
      const userId = row.original?.id;
      // const showBtn= row.original.status==='DONE' ?false : true;
      return (
        <div className="text-center">
        <Button onClick={()=>{handleEdit(userId)}} variant="outline" size="sm"><Pencil size={16} strokeWidth={2} /></Button>
      </div>
    )
    }
  },
  
]
