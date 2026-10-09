'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ChevronRight, Leaf, Plus, Star, Truck, Heart } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion'
import { products, weights, money, priceFor, type Product, type Weight } from '@/lib/products'
import { useStore } from './store-provider'
import { ProductCard, SpiceLevel } from './product-card'

export function ProductDetail({ product }: { product: Product }) {
  const [weight, setWeight] = useState<Weight>('250g')
  const { addItem, setCheckoutOpen } = useStore()
  return <main>
    <div className="site-container py-7"><nav aria-label="Breadcrumb" className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"><Link href="/" className="hover:text-primary">Home</Link><ChevronRight className="size-3" aria-hidden="true" /><Link href="/#shop" className="hover:text-primary">Our pickles</Link><ChevronRight className="size-3" aria-hidden="true" /><span aria-current="page">{product.name}</span></nav></div>
    <section className="site-container flex flex-col items-start gap-10 pb-16 md:flex-row lg:gap-16">
      <div className="relative w-full overflow-hidden rounded-t-[6rem] rounded-b-xl md:sticky md:top-28 md:w-1/2"><Image src={product.image} alt={`Amma’s ${product.name}, made in small batches and packed in a glass jar`} width={800} height={800} priority sizes="(max-width: 767px) 100vw, 50vw" className="w-full object-cover" />{product.tag && <Badge variant="secondary" className="absolute bottom-5 left-5">{product.tag}</Badge>}</div>
      <div className="w-full md:w-1/2"><p className="eyebrow mb-4">A little jar of tradition</p><h1 className="font-serif text-4xl leading-tight font-medium text-balance lg:text-5xl">{product.name}</h1><p className="mt-4 text-lg leading-relaxed text-muted-foreground">{product.description}</p>
        <div className="mt-5 flex flex-wrap items-center gap-4"><span className="flex items-center gap-1 text-sm"><Star className="size-4 fill-secondary text-secondary" aria-hidden="true" /> {product.rating} <span className="text-muted-foreground">({product.reviews} sample ratings)</span></span><SpiceLevel level={product.spice} /><span className="text-sm text-accent">{product.category}</span></div>
        <p className="mt-6 text-base leading-relaxed text-muted-foreground">{product.story}</p>
        <p className="mt-6 text-3xl font-semibold">{money(priceFor(product, weight))}<span className="ml-2 text-sm font-normal text-muted-foreground">/ {weight} jar</span></p>
        <div className="mt-6"><p id="weight-label" className="mb-3 text-sm font-medium">A little or a lot? Choose your jar.</p><ToggleGroup aria-labelledby="weight-label" variant="outline" value={[weight]} onValueChange={(values) => { if (values.length) setWeight(values[0] as Weight) }}>{weights.map((w) => <ToggleGroupItem key={w} value={w} className="min-w-20">{w}</ToggleGroupItem>)}</ToggleGroup></div>
        <div className="mt-6 flex flex-wrap gap-3"><Button size="lg" className="flex-1" onClick={() => addItem(product.id, weight)}>Add to Cart <Plus data-icon="inline-end" /></Button><Button variant="outline" size="lg" className="flex-1" onClick={() => { if (addItem(product.id, weight, false)) setCheckoutOpen(true) }}>Buy Now <ArrowRight data-icon="inline-end" /></Button></div>
        <p className="mt-4 flex items-center gap-2 text-sm text-accent"><Truck className="size-4" aria-hidden="true" /> Sample delivery is free on baskets of ₹499 or more.</p>
        <p className="mt-3 text-sm leading-relaxed text-muted-foreground">Sample product — no real orders or payments. Ingredients and product information must be confirmed before sale.</p>
        <Accordion className="mt-7" multiple defaultValue={['ingredients']}><AccordionItem value="ingredients"><AccordionTrigger className="py-4">What goes into this jar?</AccordionTrigger><AccordionContent className="pb-4 leading-relaxed"><p>{product.ingredients}</p><p className="mt-3 font-medium">{product.allergens}</p></AccordionContent></AccordionItem><AccordionItem value="pairings"><AccordionTrigger className="py-4">Made for your favourite meals</AccordionTrigger><AccordionContent className="pb-4 leading-relaxed">{product.pairsWith}</AccordionContent></AccordionItem><AccordionItem value="storage"><AccordionTrigger className="py-4">A little care for your jar</AccordionTrigger><AccordionContent className="pb-4 leading-relaxed">Use a clean, dry spoon and keep the lid tightly closed. Follow the storage and best-before instructions on the actual jar. Non-vegetarian varieties require extra care and refrigeration as directed.</AccordionContent></AccordionItem></Accordion>
      </div>
    </section>
    <section className="border-t border-border bg-muted/40 py-16"><div className="site-container"><p className="eyebrow mb-3">A few more family favourites</p><h2 className="section-title mb-8">Make a little room for these.</h2><div className="grid gap-5 sm:grid-cols-2 md:grid-cols-4">{products.filter((p) => p.id !== product.id).slice(0, 4).map((p) => <ProductCard product={p} key={p.id} />)}</div></div></section>
  </main>
}
