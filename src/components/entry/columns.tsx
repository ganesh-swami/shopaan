"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Sunrise, IndianRupee,Pencil } from "lucide-react"
import Router from 'next/router'
import { Button } from "../ui/button"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.

// interface Entries extends Entry {
//   user: User,
//   item: Item
// }

// console.log('interface ',Entries)

const handleEdit =(entryId:number,userId:number)=>{
  //Router.push(`/admin/entry/edit/${entryId}/${userId}`)
  window.location.replace(`/admin/entry/edit/${entryId}/${userId}`)
}

export const columns: ColumnDef<any>[] = [
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
          </Button>
        )
    },
    cell: ({ row }) => {
      let dateStr='';
      let timeStr='';
      let dateObj=new Date(row.getValue('createdAt'))
      dateStr=dateObj.getDate()+'-'+(dateObj.getMonth()+1);
      let isSunrise=false;
      if(dateObj.getHours()>12){
        timeStr=dateObj.getHours()-12+':'+dateObj.getMinutes();
        isSunrise=true;
      }
      else{
        timeStr=dateObj.getHours()+':'+dateObj.getMinutes();
      }
      return <div className="text-center">{dateStr}<br/><div className="flex text-xs justify-evenly items-center text-blue-600">{isSunrise ? <IndianRupee size={16} /> : null} {" "+row.original?.value}</div></div>;
    }
    
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
            कार्य
          </Button>
        )
    },
    cell: ({ row }) => {
      const userId = row.original?.user.id;
      return (<div className="text-center">
        <Button onClick={()=>{handleEdit(userId,row.original.id)}} variant="outline" size="sm"><Pencil size={16} strokeWidth={3} /></Button>
        <Button variant="outline" size="sm"><Pencil size={16} strokeWidth={3} /></Button>
      </div>)
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
  {
    accessorKey: "createdAt",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            size="sm"
          >
            समय
          </Button>
        )
    },
    cell: ({ row }) => {
      let timeStr='';
      let dateObj=new Date(row.getValue('createdAt'))
      let isSunrise=true;
      if(dateObj.getHours()>12){
        timeStr=dateObj.getHours()-12+':'+dateObj.getMinutes();
        isSunrise=false;
      }
      else{
        timeStr=dateObj.getHours()+':'+dateObj.getMinutes();
      }
      return <div className="text-center"><div className="flex text-xs justify-evenly text-slate-400">{isSunrise ? <Sunrise size={16} /> : null} {" "+timeStr}</div></div>;
    }
  },  
]
