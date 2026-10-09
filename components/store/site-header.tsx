'use client'

import { useState } from 'react'
import Link from 'next/link'
import { CookingPot, Menu, Search, ShoppingBag, Heart, ArrowRight } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetDescription } from '@/components/ui/sheet'
import { useStore } from './store-provider'

export function Brand({ inverse = false }: { inverse?: boolean }) {
  return <Link href="/" aria-label="Amma’s Aachar home" className={`inline-flex items-center gap-2.5 ${inverse ? 'text-accent-foreground' : 'text-primary'}`}>
    <CookingPot className="size-9" strokeWidth={1.35} aria-hidden="true" />
    <span className="flex flex-col items-center gap-1"><span className="brand-wordmark">Amma&apos;s</span><span className="text-sm leading-none font-medium tracking-[.34em]">AACHAR</span></span>
  </Link>
}

const links = [
  { label: 'Home', href: '/' },
  { label: 'Shop Pickles', href: '/#shop' },
  { label: 'Our Story', href: '/#our-story' },
  { label: 'Why Amma’s', href: '/#why-ammas' },
  { label: 'Reviews', href: '/#reviews' },
]

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false)
  const { count, setCartOpen, setSearchOpen, setContactTopic } = useStore()
  return <>
    <div className="bg-accent py-2 text-accent-foreground">
      <div className="site-container flex items-center justify-center gap-2 text-center text-sm">
        <Heart className="size-3.5 shrink-0" aria-hidden="true" />
        <span>Handmade with love. A little taste of home in every jar.</span>
        <span className="hidden sm:inline" aria-hidden="true">&nbsp; · &nbsp;</span>
        <a href="/#shop" className="hidden items-center gap-1.5 underline-offset-4 hover:underline sm:inline-flex">Explore our pickles <ArrowRight className="size-3.5" aria-hidden="true" /></a>
      </div>
    </div>
    <header className="sticky top-0 z-30 border-b border-border/60 bg-background/95 backdrop-blur-md">
      <div className="site-container flex h-21 items-center justify-between">
        <Brand />
        <nav aria-label="Main navigation" className="hidden items-center gap-5 lg:gap-7 md:flex">
          {links.map((link) => <Link key={link.href} href={link.href} className="nav-link">{link.label}</Link>)}
          <button className="nav-link" onClick={() => setContactTopic('General enquiry')}>Contact</button>
        </nav>
        <div className="flex items-center gap-1 sm:gap-3">
          <Button variant="ghost" size="icon-lg" aria-label="Search pickles" onClick={() => setSearchOpen(true)}><Search /></Button>
          <button aria-label={`Open basket, ${count} items`} onClick={() => setCartOpen(true)} className="relative flex size-10 items-center justify-center rounded-lg transition-colors hover:bg-muted">
            <ShoppingBag className="size-5" strokeWidth={1.7} aria-hidden="true" />
            <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-full bg-primary text-sm leading-none text-primary-foreground">{count}</span>
          </button>
          <Button variant="ghost" size="icon-lg" className="md:hidden" aria-label="Open menu" onClick={() => setMenuOpen(true)}><Menu /></Button>
        </div>
      </div>
    </header>
    <Sheet open={menuOpen} onOpenChange={setMenuOpen}>
      <SheetContent side="left">
        <SheetHeader><SheetTitle>Amma&apos;s Aachar</SheetTitle><SheetDescription>A little taste of home.</SheetDescription></SheetHeader>
        <nav aria-label="Mobile navigation" className="flex flex-col gap-3 px-5">
          {links.map((link) => <Link key={link.href} href={link.href} className="nav-link" onClick={() => setMenuOpen(false)}>{link.label}</Link>)}
          <button className="nav-link text-left" onClick={() => { setMenuOpen(false); setContactTopic('General enquiry') }}>Contact</button>
        </nav>
      </SheetContent>
    </Sheet>
  </>
}
