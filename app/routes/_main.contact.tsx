import { CheckCircleIcon, SendIcon, XCircleIcon } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { data, useFetcher } from 'react-router'
import { z } from 'zod'
import { validationErrorsForField } from '~/lib/form'
import { createResendClient } from '~/lib/resend'
import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import Textarea from '../components/Textarea'
import type { Route } from './+types/_main.contact'
import { Turnstile } from '@marsidev/react-turnstile'

export const meta: Route.MetaFunction = () => {
  return [
    { title: 'Contact | Melbourne Tech' },
    { name: 'description', content: 'Contact Melbourne Tech' },
  ]
}

export const loader = async ({ request, context }: Route.LoaderArgs) => {
  const url = new URL(request.url)
  const subject = url.searchParams.get('subject')

  return {
    subject,
    cfTurnstileSiteKey: context.cloudflare.env.CLOUDFLARE_TURNSTILE_SITE_KEY,
  }
}

const schema = z.object({
  name: z.string().min(1, "Can't be empty"),
  email: z.string().email(),
  subject: z.string().min(1, "Can't be empty"),
  message: z.string().min(1, "Can't be empty"),
  cf_turnstile_response: z.string().min(1, 'You must complete the captcha'),
})

export const action = async ({ request, context }: Route.ActionArgs) => {
  const body = await request.formData()
  const parsed = schema.safeParse(Object.fromEntries(body))
  if (!parsed.success) {
    return data(
      {
        name: 'ValidationError' as const,
        formErrors: parsed.error.formErrors,
      },
      { status: 400 },
    )
  }

  // Validate the turnstile response with https://challenges.cloudflare.com/turnstile/v0/siteverify

  const turnstileResponse = await fetch(
    `https://challenges.cloudflare.com/turnstile/v0/siteverify`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        secret: context.cloudflare.env.CLOUDFLARE_TURNSTILE_SECRET_KEY,
        response: parsed.data.cf_turnstile_response,
      }),
    },
  )
  const turnstileResponseJson = await turnstileResponse.json()
  console.log('turnstileResponseJson:', turnstileResponseJson)

  if (
    !(
      typeof turnstileResponseJson === 'object' &&
      turnstileResponseJson !== null &&
      'success' in turnstileResponseJson &&
      turnstileResponseJson.success
    )
  ) {
    return data({ name: 'TurnstileError' }, { status: 400 })
  }

  const { name, email, subject, message } = parsed.data

  const resend = createResendClient(context.cloudflare.env.RESEND_API_KEY)

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
    return data({ name: 'SendError' }, { status: 500 })
  }

  return null
}

export default function ContactPage({
  loaderData: { subject, cfTurnstileSiteKey },
}: Route.ComponentProps) {
  const fetcher = useFetcher<typeof action>()

  const isSubmitting = fetcher.state === 'submitting'
  const isError =
    fetcher.data?.name === 'ValidationError' ||
    fetcher.data?.name === 'SendError' ||
    fetcher.data?.name === 'TurnstileError'
  const isSuccess = fetcher.data === null

  const ref = useRef<HTMLFormElement>(null)
  useEffect(() => {
    if (isSuccess) {
      ref.current?.reset()
    }
  }, [isSuccess])

  const [isTurnstileLoaded, setIsTurnstileLoaded] = useState(false)
  const turnstileResponseInputRef = useRef<HTMLInputElement>(null)

  return (
    <div className="flex flex-col flex-1">
      <section className="w-full max-w-xl px-4 mx-auto my-8 sm:my-12 flex flex-col gap-6 sm:gap-8">
        <h1
          className="font-bold leading-normal"
          style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
        >
          Contact
        </h1>

        <fetcher.Form ref={ref} method="post" className="flex flex-col gap-4">
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
              placeholder="Message"
              required
            />
            {validationErrorsForField(fetcher, 'message')}
          </div>

          <div hidden={!isTurnstileLoaded} className="h-20">
            <Turnstile
              siteKey={cfTurnstileSiteKey}
              onSuccess={(token) => {
                turnstileResponseInputRef.current!.value = token
              }}
              onLoadScript={() => setIsTurnstileLoaded(true)}
            />

            <input
              ref={turnstileResponseInputRef}
              required
              type="hidden"
              name="cf_turnstile_response"
              aria-hidden
            />

            {validationErrorsForField(fetcher, 'cf_turnstile_response')}
          </div>
          <div className="h-20" hidden={isTurnstileLoaded} />

          <Button
            type="submit"
            className="self-end"
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
            {isSuccess ? 'Sent' : isError ? 'Error' : 'Send'}
          </Button>
        </fetcher.Form>
      </section>
    </div>
  )
}
