"use client"

import { ColumnDef } from "@tanstack/react-table"
import { Sunrise, IndianRupee,Pencil,Check } from "lucide-react"
import Router from 'next/router'
import { updateEntry} from "@/lib/queries"
import { cn } from "@/lib/utils"
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

type rowEntry={
  id:number,
  cash:number,
  value:number,
  userId:number,
  totalItem:number,
  returnCount:number,
}

const handleComplete= async (row:rowEntry)=>{
  let remainingAmount= row.value-row.cash;
  if(confirm(`${remainingAmount} रु बकाया राशि जमा ?`)){

    console.log('complete');
    const finalData={
      cash:row.value,
      status:'DONE'
    }
    //@ts-ignore
    await updateEntry(row.id, finalData);
    window.location.reload();
  }
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
      const cls= row.original.value-row.original.cash===0 ? true :false;

      return <div className={cls ? "text-slate-400" :"text-black"}>{customerName}<br/> <b>{totalItem}</b> {"  "+itemName}</div>;
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
      const cls= row.original.value-row.original.cash===0 ? 'text-green-400' :'text-green-700';
      return <div className={`text-center ${cls}`}>{cash}</div>
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
      const cls= row.original.value-row.original.cash===0 ? 'text-slate-400' :'text-black';
      const cls2= row.original.value-row.original.cash===0 ? 'text-blue-400' :'text-blue-700';
      return <div className={`text-center ${cls}`}>{dateStr}<br/><div className={`flex text-xs justify-evenly items-center ${cls2}`}>{isSunrise ? <IndianRupee size={16} /> : null} {" "+row.original?.value}</div></div>;
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
      const showBtn= row.original.value-row.original.cash===0 ?false : true;
      return (showBtn && <div className="text-center">
        <Button onClick={()=>{handleEdit(userId,row.original.id)}} variant="outline" size="sm"><Pencil size={16} strokeWidth={3} /></Button>
        <Button onClick={()=>{handleComplete(row.original)}} variant="outline" size="sm"><Check size={16} strokeWidth={3} /></Button>
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
