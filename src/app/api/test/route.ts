
import { auth } from "@/auth"
import { NextApiRequest, NextApiResponse } from "next"
 
export default async function handler(req: NextApiRequest, res: NextApiResponse) {

 const session = await auth(req, res)
  if (session) return res.json("Success")
  return res.status(401).json("You must be logged in.");
}