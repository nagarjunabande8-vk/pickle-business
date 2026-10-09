'use client'

import { useState, type FormEvent } from 'react'
import { Check, ArrowRight, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { useStore } from './store-provider'

function EnquiryForm({ topic }: { topic: string }) {
  const [preview, setPreview] = useState<{ name: string; message: string } | null>(null)
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const data = new FormData(event.currentTarget)
    setPreview({ name: String(data.get('name')).trim(), message: String(data.get('message')).trim() })
  }
  if (preview) return <div className="flex flex-col gap-5"><div className="flex items-center gap-2 text-accent"><Check className="size-5" /><h3 className="font-semibold">Your enquiry preview</h3></div><p className="text-sm leading-relaxed">Hi Amma&apos;s! I&apos;m {preview.name}, and I&apos;d love to know more about {topic.toLowerCase()}.</p><p className="whitespace-pre-wrap rounded-lg bg-muted p-4 text-sm leading-relaxed text-foreground">{preview.message}</p><p role="status" className="form-note">This message has not been sent. Email, phone, and WhatsApp contact details will be added before the real store launches.</p><Button variant="outline" onClick={() => setPreview(null)}>Write another enquiry</Button></div>
  return <form onSubmit={submit}>
    <p className="form-note mb-5">This is an enquiry preview. No message will be sent. Use sample details; a live WhatsApp number and email are not configured.</p>
    <FieldGroup>
      <Field><FieldLabel htmlFor="enquiry-name">Your name</FieldLabel><Input id="enquiry-name" name="name" placeholder="Your name" required minLength={2} maxLength={100} pattern=".*\S.*" /></Field>
      <Field><FieldLabel htmlFor="enquiry-email">Email address</FieldLabel><Input id="enquiry-email" name="email" type="email" placeholder="you@example.com" required maxLength={200} /></Field>
      <Field><FieldLabel htmlFor="enquiry-message">What can we help with?</FieldLabel><Textarea id="enquiry-message" name="message" placeholder={topic.includes('Gift') ? 'Tell us about the occasion, number of boxes, and your favourite flavours…' : 'Tell us what you have in mind…'} required minLength={10} maxLength={2000} rows={4} /></Field>
    </FieldGroup>
    <Button className="mt-6 w-full" size="lg" type="submit">Preview enquiry <ArrowRight data-icon="inline-end" /></Button>
  </form>
}

export function ContactDialog() {
  const { contactTopic, setContactTopic } = useStore()
  return <Dialog open={!!contactTopic} onOpenChange={(open) => { if (!open) setContactTopic(null) }}><DialogContent className="max-h-[90dvh] overflow-y-auto p-6 sm:max-w-lg"><DialogHeader className="pr-6"><DialogTitle>Let&apos;s talk pickles.</DialogTitle><DialogDescription>{contactTopic}</DialogDescription></DialogHeader>{contactTopic && <EnquiryForm key={contactTopic} topic={contactTopic} />}</DialogContent></Dialog>
}
