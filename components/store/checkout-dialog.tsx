'use client'

import { useState, type FormEvent } from 'react'
import { ArrowRight, CheckCircle2, ShoppingBag } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Field, FieldError, FieldGroup, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { money, priceFor, products, deliveryFor } from '@/lib/products'
import { useStore } from './store-provider'

const fields = [
  { name: 'name', label: 'Full name', placeholder: 'Your name', type: 'text', autoComplete: 'name', wide: true },
  { name: 'mobile', label: 'Mobile number', placeholder: '9876543210', type: 'tel', autoComplete: 'tel', wide: false },
  { name: 'email', label: 'Email address', placeholder: 'you@example.com', type: 'email', autoComplete: 'email', wide: false },
  { name: 'address', label: 'Delivery address', placeholder: 'House, street, and area', type: 'text', autoComplete: 'street-address', wide: true },
  { name: 'city', label: 'City', placeholder: 'Hyderabad', type: 'text', autoComplete: 'address-level2', wide: false },
  { name: 'state', label: 'State', placeholder: 'Telangana', type: 'text', autoComplete: 'address-level1', wide: false },
  { name: 'pincode', label: 'Pincode', placeholder: '500001', type: 'text', autoComplete: 'postal-code', wide: false },
]

function CheckoutForm({ onClose }: { onClose: () => void }) {
  const { items, subtotal } = useStore()
  const [errors, setErrors] = useState<Record<string, string>>({})
  const [previewName, setPreviewName] = useState('')
  const delivery = deliveryFor(subtotal)

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    const form = event.currentTarget
    const data = new FormData(form)
    const nextErrors: Record<string, string> = {}
    for (const field of fields) {
      const value = String(data.get(field.name) ?? '').trim()
      if (!value) nextErrors[field.name] = `${field.label} is required.`
      else if (field.name === 'mobile' && !/^(?:\+91[ -]?)?[6-9]\d{9}$/.test(value)) nextErrors.mobile = 'Enter a valid 10-digit Indian mobile number.'
      else if (field.name === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) nextErrors.email = 'Enter a valid email address.'
      else if (field.name === 'pincode' && !/^[1-9]\d{5}$/.test(value)) nextErrors.pincode = 'Enter a valid 6-digit Indian pincode.'
      else if (['name', 'city', 'state'].includes(field.name) && value.length < 2) nextErrors[field.name] = 'Please enter at least 2 characters.'
      else if (field.name === 'address' && value.length < 8) nextErrors.address = 'Please enter a complete address.'
    }
    setErrors(nextErrors)
    if (Object.keys(nextErrors).length) {
      ;(form.elements.namedItem(Object.keys(nextErrors)[0]) as HTMLInputElement)?.focus()
      return
    }
    if (items.length) setPreviewName(String(data.get('name')).trim())
  }

  if (previewName) return <div className="flex flex-col items-center gap-5 py-7 text-center" role="status"><CheckCircle2 className="size-12 text-accent" strokeWidth={1.4} /><h3 className="font-serif text-3xl">Your order preview is ready.</h3><p className="max-w-md text-base leading-relaxed text-muted-foreground">Thanks for exploring, {previewName}. Your sample basket totals <strong className="text-foreground">{money(subtotal + delivery)}</strong>.</p><p className="form-note max-w-md">This is a preview, not an order confirmation. No order was placed, no payment was taken, and no personal information was sent or saved.</p><Button size="lg" onClick={onClose}>Back to the kitchen <ArrowRight data-icon="inline-end" /></Button></div>

  if (!items.length) return <div className="py-8 text-center"><ShoppingBag className="mx-auto mb-4 size-10 text-primary" /><p>Your basket is empty. Add a jar to preview checkout.</p><Button className="mt-5" onClick={onClose}>Continue browsing</Button></div>

  return <div className="grid gap-7 md:grid-cols-[1.4fr_1fr]">
    <form onSubmit={handleSubmit} noValidate className="min-w-0">
      <p className="form-note mb-5">Demo only — please use sample details. Nothing is sent, charged, or saved.</p>
      <FieldGroup className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {fields.map((field) => <Field key={field.name} className={field.wide ? 'sm:col-span-2' : ''} data-invalid={!!errors[field.name]}><FieldLabel htmlFor={`checkout-${field.name}`}>{field.label}</FieldLabel><Input id={`checkout-${field.name}`} name={field.name} type={field.type} autoComplete={field.autoComplete} placeholder={field.placeholder} required maxLength={field.name === 'address' ? 250 : 100} inputMode={field.name === 'pincode' ? 'numeric' : undefined} aria-invalid={!!errors[field.name]} aria-describedby={errors[field.name] ? `error-${field.name}` : undefined} onChange={() => { if (errors[field.name]) setErrors((current) => ({ ...current, [field.name]: '' })) }} />{errors[field.name] && <FieldError id={`error-${field.name}`}>{errors[field.name]}</FieldError>}</Field>)}
      </FieldGroup>
      <Button type="submit" size="lg" className="mt-6 w-full">Preview order <ArrowRight data-icon="inline-end" /></Button>
    </form>
    <aside className="self-start rounded-xl bg-muted p-5 text-foreground"><h3 className="mb-5 font-serif text-xl">Your little box of home</h3><div className="flex flex-col gap-4">{items.map((item) => { const p = products.find((product) => product.id === item.productId)!; return <div className="flex justify-between gap-3 text-sm" key={`${item.productId}-${item.weight}`}><div><p className="font-medium">{p.name}</p><p className="mt-1 text-muted-foreground">{item.weight} × {item.quantity}</p></div><span>{money(priceFor(p, item.weight) * item.quantity)}</span></div> })}</div><Separator className="my-5" /><div className="flex flex-col gap-3 text-sm"><div className="flex justify-between"><span>Subtotal</span><span>{money(subtotal)}</span></div><div className="flex justify-between"><span>Sample delivery</span><span>{delivery ? money(delivery) : 'Free'}</span></div><div className="flex justify-between text-lg font-semibold"><span>Total</span><span>{money(subtotal + delivery)}</span></div></div><p className="mt-5 text-sm leading-relaxed text-muted-foreground">No payment details are needed. This sample does not create a real order.</p></aside>
  </div>
}

export function CheckoutDialog() {
  const { checkoutOpen, setCheckoutOpen } = useStore()
  return <Dialog open={checkoutOpen} onOpenChange={setCheckoutOpen}><DialogContent className="max-h-[90dvh] overflow-y-auto p-6 sm:max-w-3xl"><DialogHeader className="mb-2 pr-7"><DialogTitle>Sample checkout</DialogTitle><DialogDescription>A little taste of the ordering experience.</DialogDescription></DialogHeader>{checkoutOpen && <CheckoutForm onClose={() => setCheckoutOpen(false)} />}</DialogContent></Dialog>
}
