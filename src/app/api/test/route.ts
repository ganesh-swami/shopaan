
import { auth } from "@/auth"
import { type NextRequest, type NextResponse } from 'next/server'

 
// export default async function handler(req: NextApiRequest, res: NextApiResponse) {

//  const session = await auth(req, res)
//   if (session) return res.json("Success")
//   return res.status(401).json("You must be logged in.");
// }


export async function POST(req: NextRequest, res: NextResponse) {
  //const session = await auth(req, res)
  //if (session) return res.json("Success")
  return new Response('Hello, Next.js!', {
    status: 200
  })
  // const data = await res.json()
 
  // return Response.json({ data })
}