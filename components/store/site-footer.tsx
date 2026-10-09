'use client'

import Link from 'next/link'
import { Heart, MapPin, ArrowUpRight } from 'lucide-react'
import { Separator } from '@/components/ui/separator'
import { Brand } from './site-header'
import { useStore } from './store-provider'

export function SiteFooter() {
  const { setContactTopic } = useStore()
  return <footer className="bg-background pt-14 text-foreground">
    <div className="site-container">
      <div className="grid grid-cols-2 gap-10 pb-12 lg:grid-cols-[1.6fr_1fr_1fr_1.2fr]">
        <div className="col-span-2 sm:col-span-1"><Brand /><p className="mt-5 max-w-64 text-sm leading-relaxed text-muted-foreground">Grandma&apos;s recipe. Homemade love.<br />Authentic taste.<br />A little piece of home, wherever you are.</p></div>
        <div><h3 className="mb-5 text-sm font-semibold">Explore the kitchen</h3><ul className="flex flex-col gap-3 text-sm text-muted-foreground"><li><Link href="/#shop" className="hover:text-primary">Shop all pickles</Link></li><li><Link href="/#our-story" className="hover:text-primary">Our story</Link></li><li><Link href="/#why-ammas" className="hover:text-primary">The Amma&apos;s promise</Link></li><li><Link href="/#reviews" className="hover:text-primary">A little customer love</Link></li></ul></div>
        <div><h3 className="mb-5 text-sm font-semibold">Here to help</h3><ul className="flex flex-col gap-3 text-sm text-muted-foreground"><li><Link href="/#faq" className="hover:text-primary">FAQs & delivery</Link></li><li><button onClick={() => setContactTopic('Bulk orders')} className="hover:text-primary">Bulk orders</button></li><li><button onClick={() => setContactTopic('Gift packs & festival boxes')} className="hover:text-primary">Gifts & festival boxes</button></li><li><button onClick={() => setContactTopic('General enquiry')} className="hover:text-primary">Contact us</button></li></ul></div>
        <div><h3 className="mb-5 text-sm font-semibold">From Andhra, with love</h3><p className="flex items-center gap-2 text-sm text-muted-foreground"><MapPin className="size-4" aria-hidden="true" /> Andhra Pradesh, India</p><p className="mt-3 text-sm leading-relaxed text-muted-foreground">A sample family-kitchen brand.<br />Phone, email, and social profiles will be added before launch.</p><button onClick={() => setContactTopic('WhatsApp ordering')} className="mt-4 inline-flex items-center gap-1 text-sm font-medium text-primary">WhatsApp ordering preview <ArrowUpRight className="size-4" aria-hidden="true" /></button></div>
      </div>
      <Separator />
      <div className="flex flex-col items-start justify-between gap-4 py-6 text-sm text-muted-foreground sm:flex-row"><p>© {new Date().getFullYear()} Amma&apos;s Aachar. A taste worth keeping.</p><p className="flex items-center gap-1.5">Made with <Heart className="size-3.5 text-primary" aria-label="love" /> & a pinch of tradition.</p></div>
      <p className="pb-6 text-sm leading-relaxed text-muted-foreground">Sample storefront only. Product images are illustrative; prices, reviews, recipes, and policies are examples. No orders, payments, or enquiries are transmitted. Cart and form data are held only in this browser session and are not saved.</p>
    </div>
  </footer>
}
