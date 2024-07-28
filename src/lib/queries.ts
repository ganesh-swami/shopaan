'use server'

import { db } from './db'

import {
    User,
    Item,
    Entry
  } from '@prisma/client'


export const createUser = async (user: User) => {
    try {
        const res = await db.user.create({
            data:user
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getUser = async (id: number) => {
    try {
        const res = await db.user.findUnique({
            where: {
                id: id
            }
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
} 

export const updateUser = async (id:number,values: User) => {
    try {
        const res = await db.user.update({
            where: {
                id: id
            },
            //@ts-ignore
            data:values
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getUsers = async () => {
    try {
        const res = await db.user.findMany()
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getEntries = async (page:number) => {
    try {
        const res = await db.entry.findMany({
            skip: (page-1)*10,
            take: 50,
            where: {
                status: "ACTIVE"
            }
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getUserEntries = async (userId:number) => {
    try {
        const res = await db.entry.findMany({
            where: {
                userId: userId
            }
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getEntry = async (id:number) => {
    try {
        const res = await db.entry.findUnique({
            where: {
                id: id
            }
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const updateEntry = async (id:number, values: Entry) => {
    try {
        const res = await db.entry.update({
            where: {
                id: id
            },
            //@ts-ignore
            data:values
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const createEntry = async (values: Entry) => {
    try {
        const res = await db.entry.create({
            data:values
        })
        return res
    }
    catch (e) {
        console.log(e)
    }
}

const getItems = async () => {
    try {
        const res = await db.item.findMany()
        return res
    }
    catch (e) {
        console.log(e)
    }
}

export const getEntryDetails=async (userId:number,id?:number)=>{
    try{
        const items=await getItems()
        const entry=id ? await getEntry(id) : null
        const user=await getUser(userId)
        return {items,user,entry};
    }
    catch(e){
        console.log(e)
    }
    
}