import {
  CheckCircleIcon,
  PaperAirplaneIcon,
  XCircleIcon,
} from '@heroicons/react/outline'
import Head from 'next/head'
import { FormEvent, useCallback, useState } from 'react'
import Button from '../components/Button'
import Input from '../components/Input'
import Label from '../components/Label'
import Layout from '../components/Layout'
import Textarea from '../components/Textarea'
import { NextPageWithLayout } from '../lib/types'

type ContactPageProps = {
  defaultSubject: string
}

const ContactPage: NextPageWithLayout<ContactPageProps> = ({
  defaultSubject,
}) => {
  const [state, setState] = useState<
    'IDLE' | 'SUBMITTING' | 'ERROR' | 'SUCCESS'
  >('IDLE')

  const onSubmit = useCallback(async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setState('SUBMITTING')

    const form = event.currentTarget
    const formData = new FormData(form)
    const data = Object.fromEntries(formData)

    const res = await fetch(`/api/contact`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })

    if (res.ok) {
      form.reset()
      setState('SUCCESS')
    } else {
      setState('ERROR')
    }
  }, [])

  return (
    <div className="flex flex-col flex-1">
      <Head>
        <title>Contact | Melbourne Tech</title>
        <meta name="description" content="Contact Melbourne Tech" />
      </Head>

      <section className="w-full max-w-xl px-4 mx-auto my-8 sm:my-12 md:my-16 flex flex-col gap-6 sm:gap-8">
        <h1
          className="font-bold leading-normal"
          style={{ fontSize: 'clamp(2rem, 6vw, 3rem)' }}
        >
          Contact
        </h1>

        <form className="flex flex-col gap-4" onSubmit={onSubmit}>
          <div className="flex flex-col gap-1">
            <Label htmlFor="name">Name</Label>
            <Input
              type="text"
              id="name"
              name="name"
              placeholder="Your Name"
              required
              autoFocus
            />
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
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="subject">Subject</Label>
            <Input
              type="text"
              id="subject"
              name="subject"
              placeholder="Subject"
              defaultValue={defaultSubject}
              required
            />
          </div>

          <div className="flex flex-col gap-1">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              name="message"
              placeholder="Message"
              required
            />
          </div>

          <Button
            type="submit"
            className="self-end"
            icon={
              state === 'SUCCESS' ? (
                <CheckCircleIcon className="w-5 h-5" />
              ) : state === 'ERROR' ? (
                <XCircleIcon className="w-5 h-5" />
              ) : (
                <PaperAirplaneIcon className="w-5 h-5" />
              )
            }
            variant={
              state === 'SUCCESS'
                ? 'SUCCESS'
                : state === 'ERROR'
                ? 'ERROR'
                : 'DEFAULT'
            }
            isLoading={state === 'SUBMITTING'}
            disabled={state === 'SUBMITTING'}
          >
            {state === 'SUCCESS'
              ? 'Sent'
              : state === 'ERROR'
              ? 'Error'
              : 'Send'}
          </Button>
        </form>
      </section>
    </div>
  )
}

ContactPage.getLayout = (page) => <Layout>{page}</Layout>

ContactPage.getInitialProps = ({ query }) => {
  let defaultSubject = ''

  if (query.subject !== undefined) {
    if (Array.isArray(query.subject)) {
      defaultSubject = query.subject[0]
    } else {
      defaultSubject = query.subject
    }
  }

  return {
    defaultSubject,
  }
}

export const config = {
  runtime: 'experimental-edge',
}

export default ContactPage
