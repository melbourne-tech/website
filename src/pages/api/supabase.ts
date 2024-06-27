import type { NextApiRequest, NextApiResponse } from 'next'
import supabase from '~/lib/supabase'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { data } = await supabase
    .from('posts')
    .select('*')
    .order('created_at', { ascending: false })

  res.status(200).json({ data })
}
