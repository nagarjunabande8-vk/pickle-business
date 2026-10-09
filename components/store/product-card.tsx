'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Flame, Star, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { type Product, type Weight, weights, priceFor, money } from '@/lib/products'
import { useStore } from './store-provider'
import { cn } from '@/lib/utils'

export function SpiceLevel({ level }: { level: number }) {
  return <span className="flex items-center gap-0.5" aria-label={`${['Mild', 'Medium', 'Hot'][level - 1]} spice`}>
    {[1, 2, 3].map((n) => <Flame key={n} className={cn('size-3.5', n <= level ? 'fill-primary/15 text-primary' : 'text-foreground/20')} strokeWidth={1.6} aria-hidden="true" />)}
  </span>
}

export function ProductCard({ product }: { product: Product }) {
  const [weight, setWeight] = useState<Weight>('250g')
  const { addItem } = useStore()
  return <article className="product-card group">
    <Link href={`/pickles/${product.id}`} className="relative block aspect-square overflow-hidden" aria-label={`View ${product.name}`}>
      <Image src={product.image} alt={`Amma’s ${product.name} in a cloth-topped glass jar`} fill sizes="(max-width: 639px) 90vw, (max-width: 767px) 45vw, 25vw" className="object-cover transition-transform duration-500 group-hover:scale-105" />
      {product.tag && <Badge variant="secondary" className="absolute top-3 left-3">{product.tag}</Badge>}
    </Link>
    <div className="p-4 lg:p-5">
      <div className="mb-2 flex items-center justify-between">
        <span className="flex items-center gap-1 text-sm"><Star className="size-3.5 fill-secondary text-secondary" aria-hidden="true" /><span>{product.rating}</span><span className="text-muted-foreground">({product.reviews})</span><span className="sr-only">Sample rating</span></span>
        <SpiceLevel level={product.spice} />
      </div>
      <h3 className="font-serif text-lg font-medium leading-snug"><Link href={`/pickles/${product.id}`} className="hover:text-primary">{product.name}</Link></h3>
      <p className="mt-2 min-h-10 text-sm leading-relaxed text-muted-foreground">{product.description}</p>
      <div className="mt-4 flex items-center justify-between">
        <p className="text-lg font-semibold">{money(priceFor(product, weight))}</p>
        <Select value={weight} onValueChange={(value) => value && setWeight(value as Weight)} items={weights.map((w) => ({ label: w, value: w }))}>
          <SelectTrigger aria-label={`Weight for ${product.name}`}><SelectValue /></SelectTrigger>
          <SelectContent><SelectGroup>{weights.map((w) => <SelectItem key={w} value={w}>{w}</SelectItem>)}</SelectGroup></SelectContent>
        </Select>
      </div>
      <Button variant="outline" className="mt-4 w-full" aria-label={`Add ${product.name} to cart`} onClick={() => addItem(product.id, weight)}>Add to Cart <Plus data-icon="inline-end" /></Button>
    </div>
  </article>
}
