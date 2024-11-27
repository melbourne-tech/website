import {
  ActionFunctionArgs,
  json,
  LoaderFunctionArgs,
  type MetaFunction,
} from '@remix-run/node'
import { useFetcher, useLoaderData } from '@remix-run/react'
import { CheckCircleIcon, SendIcon, XCircleIcon } from 'lucide-react'
import { useEffect, useRef } from 'react'
import { z } from 'zod'
import { validationErrorsForField } from '~/lib/form'
import resend from '~/lib/resend'
import Button from '../components/ui/Button'
import Input from '../components/ui/Input'
import Label from '../components/ui/Label'
import Textarea from '../components/ui/Textarea'
import { Turnstile } from '@marsidev/react-turnstile'
import { verifyTurnstileResponse } from '~/lib/turnstile'

export const meta: MetaFunction = () => {
  return [
    { title: 'Contact | Melbourne Tech' },
    { name: 'description', content: 'Contact Melbourne Tech' },
  ]
}

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url)
  const subject = url.searchParams.get('subject')

  return json({ subject })
}

const schema = z.object({
  name: z.string().min(1, "Can't be empty"),
  email: z.string().email(),
  subject: z.string().min(1, "Can't be empty"),
  message: z.string().min(1, "Can't be empty"),
  is_bot: z.literal('false'),
  'cf-turnstile-response': z.string(),
})

export const action = async ({ request }: ActionFunctionArgs) => {
  const body = await request.formData()
  const parsed = schema.safeParse(Object.fromEntries(body))
  if (!parsed.success) {
    return json(
      {
        name: 'ValidationError' as const,
        formErrors: parsed.error.formErrors,
      },
      { status: 400 },
    )
  }

  const turnstileResponse = parsed.data['cf-turnstile-response']
  const ip = request.headers.get('cf-connecting-ip')
  const isValidTurnstile = await verifyTurnstileResponse(turnstileResponse, ip)
  if (!isValidTurnstile) {
    return json({ name: 'TurnstileError' }, { status: 400 })
  }

  const { name, email, subject, message } = parsed.data

  const { error } = await resend.emails.send({
    from: 'Melbourne Tech Contact Form <contact@mail.melbournetech.com>',
    to: 'support@melbournetech.com',
    subject,
    replyTo: `${name} <${email}>`,
    text: `${message}

  ---
  From: ${name}
  `,
  })

  if (error) {
    return json({ name: 'SendError' }, { status: 500 })
  }

  return null
}

export default function ContactPage() {
  const { subject } = useLoaderData<typeof loader>()
  const fetcher = useFetcher<typeof action>()

  const isSubmitting = fetcher.state === 'submitting'
  const isError =
    fetcher.data?.name === 'ValidationError' ||
    fetcher.data?.name === 'SendError'
  const isSuccess = fetcher.data === null

  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (isSuccess) {
      ref.current?.reset()
    }
  }, [isSuccess])

  return (
    <div className="flex flex-col flex-1">
      <section className="w-full max-w-6xl px-4 mx-auto my-8 sm:my-12 md:my-16">
        <h1
          className="font-bold leading-normal mb-8"
          style={{ fontSize: 'clamp(2rem, 9vw, 5rem)' }}
        >
          Contact Us
        </h1>

        <div className="flex flex-col md:flex-row gap-12">
          <div className="flex-1 flex flex-col gap-6">
            <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
            <p>
              We&apos;d love to hear from you. Whether you have a question about
              our services, projects, or just want to say hello, don&apos;t
              hesitate to reach out.
            </p>

            <div>
              <h3 className="text-xl font-semibold mb-2">
                Melbourne Tech, LLC
              </h3>
              <p>30 N Gould St Ste 6707</p>
              <p>Sheridan, WY 82801</p>
            </div>

            <div>
              <p>
                <strong>Phone:</strong>{' '}
                <a href="tel:+13072781445">+1 (307) 278-1445</a>
              </p>
              <p>
                <strong>Email:</strong>{' '}
                <a href="mailto:support@melbournetech.com">
                  support@melbournetech.com
                </a>
              </p>
            </div>
          </div>

          <div className="flex-1">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message</h2>
            <fetcher.Form
              ref={ref}
              method="post"
              className="flex flex-col gap-4"
            >
              <div className="flex flex-col gap-1">
                <Label htmlFor="name">Name</Label>
                <Input
                  type="text"
                  id="name"
                  name="name"
                  placeholder="Your Name"
                  required
                  // eslint-disable-next-line jsx-a11y/no-autofocus
                  autoFocus
                />
                {validationErrorsForField(fetcher, 'name')}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  name="email"
                  placeholder="you@example.com"
                  required
                />
                {validationErrorsForField(fetcher, 'email')}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="subject">Subject</Label>
                <Input
                  type="text"
                  id="subject"
                  name="subject"
                  placeholder="Subject"
                  defaultValue={subject ?? undefined}
                  required
                />
                {validationErrorsForField(fetcher, 'subject')}
              </div>

              <div className="flex flex-col gap-1">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Your message"
                  required
                />
                {validationErrorsForField(fetcher, 'message')}
              </div>

              <input type="hidden" name="is_bot" defaultValue="false" aria-hidden />

              <Turnstile
                siteKey={
                  typeof window !== 'undefined'
                    ? window.ENV.CLOUDFLARE_TURNSTILE_SITE_KEY
                    : ''
                }
              />

              <Button
                type="submit"
                className="self-start"
                icon={
                  isSuccess ? (
                    <CheckCircleIcon className="w-5 h-5" />
                  ) : isError ? (
                    <XCircleIcon className="w-5 h-5" />
                  ) : (
                    <SendIcon className="w-5 h-5" />
                  )
                }
                variant={isSuccess ? 'SUCCESS' : isError ? 'ERROR' : 'DEFAULT'}
                isLoading={isSubmitting}
                disabled={isSubmitting}
              >
                {isSuccess ? 'Sent' : isError ? 'Error' : 'Send Message'}
              </Button>
            </fetcher.Form>
          </div>
        </div>
      </section>
    </div>
  )
}
