import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, Heart, Leaf, CookingPot, Truck, Sun, Sprout } from 'lucide-react'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

export function Hero() {
  return <>
    <section className="overflow-hidden bg-background" aria-labelledby="hero-heading">
      <div className="site-container flex flex-col items-center py-10 md:flex-row md:py-12 lg:py-14">
        <div className="reveal flex w-full flex-col items-start gap-6 md:w-[52%] md:pr-5">
          <p className="eyebrow flex items-center gap-2"><Sun className="size-4" strokeWidth={1.5} aria-hidden="true" /> A little jar of tradition</p>
          <h1 id="hero-heading" className="hero-title font-serif font-medium">A little spice.<br />A lot of<br /><span className="text-primary italic">homemade love.</span></h1>
          <p className="max-w-md text-base leading-relaxed text-muted-foreground">Grandma&apos;s recipes. Handpicked ingredients.<br className="hidden sm:block" /> And that unmistakable taste of home, in every spoon.</p>
          <div className="flex flex-wrap items-center gap-3">
            <Link href="#shop" className={buttonVariants({ size: 'lg' })}>Shop Pickles <ArrowRight data-icon="inline-end" /></Link>
            <Link href="#our-story" className={cn(buttonVariants({ size: 'lg', variant: 'outline' }))}>Our Story <Heart data-icon="inline-end" /></Link>
          </div>
          <div className="flex flex-wrap items-center gap-3 pt-1 text-sm text-accent">
            <span className="flex items-center gap-1.5"><Leaf className="size-4" aria-hidden="true" /> Real ingredients</span>
            <span className="size-1 rounded-full bg-accent/40" aria-hidden="true" />
            <span>Small batches</span>
            <span className="size-1 rounded-full bg-accent/40" aria-hidden="true" />
            <span>Big love</span>
          </div>
        </div>
        <div className="reveal-later relative mt-10 w-full max-w-lg md:mt-0 md:w-[48%]">
          <div className="hero-picture relative aspect-square overflow-hidden">
            <Image src="/images/hero-pickle.png" alt="A cloth-topped jar of Amma’s Andhra mango pickle, with fresh mango, curry leaves, and a brass serving spoon" fill priority sizes="(max-width: 767px) 100vw, 48vw" className="object-cover" />
          </div>
          <div className="handmade-seal absolute -bottom-3 left-1 -rotate-12 sm:-left-3" aria-label="Made by hand, with love">
            <Heart className="mb-1 size-4" strokeWidth={1.5} aria-hidden="true" />
            <span className="text-center text-sm leading-tight font-semibold">MADE BY HAND.<br />WITH LOVE.</span>
          </div>
          <p className="pt-4 text-right font-serif text-base italic text-muted-foreground">A recipe passed down. Not made up.</p>
        </div>
      </div>
    </section>
    <div className="border-y border-border/70 bg-muted text-foreground">
      <div className="site-container grid grid-cols-2 py-6 md:grid-cols-4">
        {[
          { icon: CookingPot, title: 'Homemade, always', text: 'From our kitchen to yours' },
          { icon: Sprout, title: 'Nothing but the good', text: 'Real, honest ingredients' },
          { icon: Heart, title: 'Tradition in every jar', text: 'Recipes worth passing down' },
          { icon: Truck, title: 'A little closer to home', text: 'Made for your everyday meals' },
        ].map(({ icon: Icon, title, text }, index) => <div key={title} className={cn('flex items-center gap-3 py-3 md:py-0', index % 2 === 1 && 'pl-3', index > 0 && 'md:border-l md:border-border md:pl-6')}>
          <Icon className="size-7 shrink-0 text-accent" strokeWidth={1.4} aria-hidden="true" />
          <div><p className="text-sm font-semibold">{title}</p><p className="mt-1 hidden text-sm text-muted-foreground lg:block">{text}</p></div>
        </div>)}
      </div>
    </div>
  </>
}
