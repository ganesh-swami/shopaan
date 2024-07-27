"use client"

import { ColumnDef } from "@tanstack/react-table"
import {User} from '@prisma/client'
import { ArrowUpDown, MoreHorizontal } from "lucide-react"
import { Button } from "../ui/button"


// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.


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
  },
  {
    accessorKey: "cast",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            जाति
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
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
  },
  {
    accessorKey: "village",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            गाँव
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  },
  {
    accessorKey: "fatherName",
    header: "बेटा",
  },
  {
    accessorKey: "phone",
    header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            फ़ोन
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        )
    },
  }
]
