import type { NextApiRequest, NextApiResponse } from 'next'
import sql from '~/lib/postgres'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = await sql`select * from posts order by created_at desc`

  res.status(200).json({ data })
}
