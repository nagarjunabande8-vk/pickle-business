'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog'
import { Field, FieldLabel } from '@/components/ui/field'
import { Input } from '@/components/ui/input'
import { products, money } from '@/lib/products'
import { useStore } from './store-provider'

export function SearchDialog() {
  const { searchOpen, setSearchOpen } = useStore()
  const [query, setQuery] = useState('')
  const results = products.filter((p) => `${p.name} ${p.description} ${p.category}`.toLowerCase().includes(query.toLowerCase().trim()))
  return <Dialog open={searchOpen} onOpenChange={(open) => { setSearchOpen(open); if (!open) setQuery('') }}><DialogContent className="sm:max-w-xl"><DialogHeader><DialogTitle>What are you craving?</DialogTitle><DialogDescription>Find a familiar favourite, or a new little obsession.</DialogDescription></DialogHeader><Field><FieldLabel className="sr-only" htmlFor="global-search">Search pickles</FieldLabel><Input id="global-search" type="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search mango, gongura, garlic…" /></Field><p role="status" className="text-sm text-muted-foreground">{results.length} {results.length === 1 ? 'pickle' : 'pickles'} to explore</p><div className="max-h-[50dvh] overflow-y-auto">{results.map((p) => <Link key={p.id} href={`/pickles/${p.id}`} onClick={() => { setSearchOpen(false); setQuery('') }} className="flex items-center gap-4 rounded-lg p-3 transition-colors hover:bg-muted"><Image src={p.image} alt="" width={64} height={64} className="size-16 rounded-md object-cover" /><div className="flex-1"><p className="font-serif text-base">{p.name}</p><p className="mt-1 text-sm text-muted-foreground">{money(p.price)} · 250g · {p.category}</p></div><ArrowUpRight className="size-4 text-primary" aria-hidden="true" /></Link>)}{!results.length && <p className="py-10 text-center text-muted-foreground">No pickles found. Try another ingredient or name.</p>}</div></DialogContent></Dialog>
}
