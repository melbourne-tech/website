import type { NextApiRequest, NextApiResponse } from 'next'
import { Resend } from 'resend'
import { z } from 'zod'

if (!process.env.RESEND_API_KEY) {
  throw new Error('RESEND_API_KEY is not set')
}

const resend = new Resend(process.env.RESEND_API_KEY)

const schema = z.object({
  name: z.string().min(1, "Can't be empty"),
  email: z.string().email(),
  subject: z.string().min(1, "Can't be empty"),
  message: z.string().min(1, "Can't be empty"),
})

async function handler(req: NextApiRequest, res: NextApiResponse) {
  const result = schema.safeParse(req.body)

  if (result.success) {
    const { name, email, subject, message } = result.data

    await resend.emails.send({
      from: 'Melbourne Tech Contact Form <contact@mail.melbournetech.com>',
      to: 'support@melbournetech.com',
      subject,
      reply_to: `${name} <${email}>`,
      text: `${message}

---
From: ${name}
`,
    })

    res.status(200).json({ sent: true })
  } else {
    res
      .status(400)
      .json({ name: 'ValidationError', errors: result.error.formErrors })
  }
}

export default handler
