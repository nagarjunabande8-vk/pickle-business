'use client'

import { useState } from 'react'
import { ArrowRight, SlidersHorizontal, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Field, FieldGroup, FieldLabel } from '@/components/ui/field'
import { ToggleGroup, ToggleGroupItem } from '@/components/ui/toggle-group'
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { products } from '@/lib/products'
import { ProductCard } from './product-card'

const categories = ['All Pickles', 'Vegetarian', 'Non-Vegetarian']
const sortItems = [{ label: 'Our favourites', value: 'featured' }, { label: 'Price: low to high', value: 'low' }, { label: 'Price: high to low', value: 'high' }]
const priceItems = [{ label: 'Any price', value: 'all' }, { label: 'Under ₹250', value: '250' }, { label: '₹250 and above', value: 'premium' }]

export function ProductCatalog() {
  const [category, setCategory] = useState('All Pickles')
  const [showAll, setShowAll] = useState(false)
  const [filtersOpen, setFiltersOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [sort, setSort] = useState('featured')
  const [price, setPrice] = useState('all')
  const filtered = products.filter((p) => (category === 'All Pickles' || p.category === category) && `${p.name} ${p.description}`.toLowerCase().includes(query.toLowerCase().trim()) && (price === 'all' || (price === '250' ? p.price < 250 : p.price >= 250)))
  if (sort !== 'featured') filtered.sort((a, b) => sort === 'low' ? a.price - b.price : b.price - a.price)
  const showFullResults = showAll || category !== 'All Pickles' || !!query || sort !== 'featured' || price !== 'all'
  const visible = showFullResults ? filtered : filtered.slice(0, 4)

  return <section id="shop" className="site-container py-16 md:py-20" aria-labelledby="shop-heading">
    <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-end">
      <div><p className="eyebrow mb-3">The family favourites</p><h2 id="shop-heading" className="section-title">Little jars. Big memories.</h2><p className="mt-3 text-base leading-relaxed text-muted-foreground">Meet the pickles that make every meal feel like home.</p></div>
      <Button variant="link" onClick={() => setShowAll(!showAll)}>{showAll ? 'Show favourites' : 'View all pickles'} <ArrowRight data-icon="inline-end" /></Button>
    </div>
    <div className="my-7 flex flex-wrap items-center justify-between gap-4">
      <ToggleGroup value={[category]} onValueChange={(value) => { if (value.length) setCategory(value[0]) }} spacing={2} aria-label="Pickle category">
        {categories.map((item) => <ToggleGroupItem value={item} key={item}>{item}</ToggleGroupItem>)}
      </ToggleGroup>
      <Button size="sm" variant="ghost" aria-expanded={filtersOpen} aria-controls="catalog-filters" onClick={() => setFiltersOpen(!filtersOpen)}><SlidersHorizontal data-icon="inline-start" /> Filter & sort</Button>
    </div>
    {filtersOpen && <FieldGroup id="catalog-filters" className="mb-7 sm:flex-row sm:items-end">
      <Field className="sm:flex-1"><FieldLabel htmlFor="catalog-search">Find your favourite</FieldLabel><Input id="catalog-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Try mango, garlic, or chicken…" /></Field>
      <Field className="sm:w-44"><FieldLabel htmlFor="price-filter">Price per 250g</FieldLabel><Select items={priceItems} value={price} onValueChange={(v) => v && setPrice(v)}><SelectTrigger id="price-filter" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{priceItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
      <Field className="sm:w-48"><FieldLabel htmlFor="sort-filter">Sort by</FieldLabel><Select items={sortItems} value={sort} onValueChange={(v) => v && setSort(v)}><SelectTrigger id="sort-filter" className="w-full"><SelectValue /></SelectTrigger><SelectContent><SelectGroup>{sortItems.map((i) => <SelectItem key={i.value} value={i.value}>{i.label}</SelectItem>)}</SelectGroup></SelectContent></Select></Field>
      <Button variant="ghost" aria-label="Reset filters" onClick={() => { setQuery(''); setPrice('all'); setSort('featured'); setCategory('All Pickles') }}><X />Reset</Button>
    </FieldGroup>}
    <p className="sr-only" role="status">Showing {visible.length} of {products.length} pickles</p>
    {visible.length ? <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-4">{visible.map((product) => <ProductCard product={product} key={product.id} />)}</div> : <div className="py-16 text-center"><h3 className="font-serif text-2xl">No jars found this time.</h3><p className="mt-3 text-muted-foreground">Try another search or reset your filters.</p><Button variant="outline" className="mt-5" onClick={() => { setQuery(''); setPrice('all'); setCategory('All Pickles') }}>Reset filters</Button></div>}
    <p className="mt-5 text-center text-sm text-muted-foreground">Sample collection · Prices and ratings are for demonstration. No live orders are accepted.</p>
  </section>
}
