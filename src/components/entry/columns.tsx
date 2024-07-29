"use client"

import { ColumnDef } from "@tanstack/react-table"
import {Entry,User, Item} from '@prisma/client'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"
import { Interface } from "readline"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

interface Entries extends Entry {
  user: User,
  item: Item
}



export const columns: ColumnDef<Entries>[] = [
  {
    accessorKey: "customerName",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            ग्राहक / नग
            {/* <ArrowUpDown className="ml-1 h-2 w-2" /> */}
          </Button>
        )
    },
    cell: ({ row }) => {
      const customerName = row.original?.user?.name;
      const itemName = row.original?.item?.name;
      const totalItem = row.original?.totalItem - row.original?.returnCount;
      return <>{customerName}<br/> <b>{totalItem}</b> {"  "+itemName}</>;
    },
  },
  // {
  //   accessorKey: "name",
  //   header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           नाम
  //           <ArrowUpDown className="ml-1 h-2 w-2" />
  //         </Button>
  //       )
  //   }
  // },
  // {
  //   accessorKey: "totalItem",
  //   header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           नग
  //           <ArrowUpDown className="ml-1 h-2 w-2" />
  //         </Button>
  //       )
  //   },
  // },
  {
    accessorKey: "cash",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            रू जमा
            {/* <ArrowUpDown className="ml-1 h-2 w-2" /> */}
          </Button>
        )
    },
    cell: ({ row }) => {
      const cash = row.original?.cash;
      return <div className="text-center text-green-700">{cash}</div>
    },
  },
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            तारीख 
            {/* <ArrowUpDown className="ml-1 h-2 w-2" /> */}
          </Button>
        )
    },
    cell: ({ row }) => {
      let dateStr='';
      let timeStr='';
      let dateObj=new Date(row.getValue('createdAt'))
      dateStr=dateObj.getDate()+'-'+(dateObj.getMonth()+1);
      
      if(dateObj.getHours()>12){
        timeStr=dateObj.getHours()-12+':'+dateObj.getMinutes()+' शाम';
      }
      else{
        timeStr=dateObj.getHours()+':'+dateObj.getMinutes()+' सुबह';
      }
      return <>{dateStr}<br/>{timeStr}</>;
    }
  },
  
  // {
  //   accessorKey: "due",
  //   header: ({ column }) => {
  //       return (
  //         <Button
  //           variant="ghost"
  //           onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
  //         >
  //           बकाया 
  //           <ArrowUpDown className="ml-1 h-2 w-2" />
  //         </Button>
  //       )
  //   },
  // },
  {
    accessorKey: "value",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            कुल रू
            {/* <ArrowUpDown className="ml-1 h-2 w-2" /> */}
          </Button>
        )
    },
  },
  {
    accessorKey: "returnCount",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            वापस
          </Button>
        )
    },
    cell: ({ row }) => {
      const returnCount = row.original?.returnCount;
      return <div className="text-center text-rose-600">{returnCount}</div>
    },
  },
]
