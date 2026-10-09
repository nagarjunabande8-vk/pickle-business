'use client'

import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Minus, Plus, ShoppingBag, Trash2, Truck } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle } from '@/components/ui/sheet'
import { Separator } from '@/components/ui/separator'
import { deliveryFor, money, priceFor, products } from '@/lib/products'
import { useStore } from './store-provider'

export function CartDrawer() {
  const { items, count, subtotal, cartOpen, setCartOpen, setCheckoutOpen, updateQuantity, announcement } = useStore()
  const delivery = deliveryFor(subtotal)
  return <Sheet open={cartOpen} onOpenChange={setCartOpen}>
    <SheetContent className="data-[side=right]:w-full data-[side=right]:sm:max-w-md">
      <SheetHeader className="px-6 pt-6"><SheetTitle>Your little basket ({count})</SheetTitle><SheetDescription>A few jars closer to home.</SheetDescription></SheetHeader>
      {items.length === 0 ? <div className="flex flex-1 flex-col items-center justify-center gap-5 px-8 text-center"><ShoppingBag className="size-12 text-primary" strokeWidth={1.3} aria-hidden="true" /><h3 className="font-serif text-2xl">Something good belongs here.</h3><p className="text-base leading-relaxed text-muted-foreground">Fill your basket with a little spice and a lot of love.</p><Link href="/#shop" onClick={() => setCartOpen(false)} className="text-sm font-semibold text-primary underline underline-offset-4">Explore the pickles</Link></div> : <>
        <div className="px-6"><p className="mb-2 flex items-center gap-2 text-sm text-accent"><Truck className="size-4" aria-hidden="true" />{subtotal >= 499 ? 'Free delivery in this order preview!' : `Add ${money(499 - subtotal)} for free sample delivery`}</p><progress className="h-1.5 w-full overflow-hidden rounded-full accent-accent" value={Math.min(subtotal, 499)} max={499} aria-label="Progress toward free sample delivery" /></div>
        <div className="flex-1 overflow-y-auto px-6">
          {items.map((item) => {
            const product = products.find((p) => p.id === item.productId)!
            const maxedOut = items.filter((i) => i.productId === item.productId).reduce((sum, i) => sum + i.quantity, 0) >= 12
            return <div key={`${item.productId}-${item.weight}`} className="flex items-start gap-4 border-b border-border py-5">
              <Image src={product.image} alt={product.name} width={88} height={100} className="size-22 rounded-lg object-cover" />
              <div className="min-w-0 flex-1"><Link href={`/pickles/${product.id}`} onClick={() => setCartOpen(false)} className="font-serif text-base font-medium hover:text-primary">{product.name}</Link><p className="mt-1 text-sm text-muted-foreground">{item.weight} · {money(priceFor(product, item.weight))} / jar</p><div className="mt-3 flex items-center justify-between"><div className="flex items-center gap-2 rounded-lg border border-border"><Button size="icon-sm" variant="ghost" aria-label={`Decrease ${product.name} ${item.weight} quantity`} onClick={() => updateQuantity(item.productId, item.weight, item.quantity - 1)}><Minus /></Button><span className="min-w-4 text-center text-sm">{item.quantity}</span><Button size="icon-sm" variant="ghost" disabled={maxedOut} aria-label={`Increase ${product.name} ${item.weight} quantity`} onClick={() => updateQuantity(item.productId, item.weight, item.quantity + 1)}><Plus /></Button></div><span className="text-sm font-semibold">{money(priceFor(product, item.weight) * item.quantity)}</span></div></div>
              <Button size="icon-sm" variant="ghost" aria-label={`Remove ${product.name} ${item.weight}`} onClick={() => updateQuantity(item.productId, item.weight, 0)}><Trash2 /></Button>
            </div>
          })}
          {announcement.includes('12 jars') && <p role="status" className="mt-4 text-sm text-primary">{announcement}</p>}
        </div>
        <SheetFooter className="border-t border-border p-6">
          <div className="flex justify-between text-sm"><span>Subtotal</span><span>{money(subtotal)}</span></div>
          <div className="flex justify-between text-sm"><span>Sample delivery</span><span>{delivery ? money(delivery) : 'Free'}</span></div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-semibold"><span>Total</span><span>{money(subtotal + delivery)}</span></div>
          <Button size="lg" className="mt-3 w-full" onClick={() => { setCartOpen(false); setCheckoutOpen(true) }}>Proceed to Checkout <ArrowRight data-icon="inline-end" /></Button>
          <p className="mt-1 text-center text-sm leading-relaxed text-muted-foreground">Demo checkout only. No payment or real order.<br />Your basket resets on refresh.</p>
        </SheetFooter>
      </>}
    </SheetContent>
  </Sheet>
}
