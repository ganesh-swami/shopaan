'use server'

import { db } from './db'

import {
    User,
    Item
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

export const findUser = async (id: number) => {
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