'use client'

import Image from 'next/image'
import { ArrowRight, Check, CookingPot, Leaf, Heart, Sparkles, Gift, Package, Star, Quote, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import { useStore } from './store-provider'

export function BrandSections() {
  const { setContactTopic } = useStore()
  return <>
    <section id="our-story" className="border-y border-border/60 bg-muted py-16 md:py-20" aria-labelledby="story-heading">
      <div className="site-container flex flex-col items-center gap-10 md:flex-row md:gap-16">
        <div className="relative w-full overflow-hidden rounded-t-[7rem] rounded-b-xl md:w-1/2">
          <Image src="/images/our-kitchen.png" alt="Hands lovingly mixing raw mango and traditional spices in a brass bowl in a family kitchen" width={800} height={650} sizes="(max-width: 767px) 100vw, 45vw" className="aspect-[1.1] w-full object-cover" />
        </div>
        <div className="flex w-full flex-col items-start gap-5 md:w-1/2">
          <p className="eyebrow">Not just a recipe. A legacy.</p>
          <h2 id="story-heading" className="section-title">Some things should<br />taste just like <span className="text-primary italic">home.</span></h2>
          <p className="text-base leading-relaxed text-muted-foreground">Amma&apos;s Aachar started with a simple idea — bring the authentic taste of homemade Andhra pickles from our family kitchen to your table.</p>
          <p className="text-base leading-relaxed text-muted-foreground">The same patiently perfected recipes. The same freshly ground spices. The same little extra spoonful of love. Because the best things in life aren&apos;t made in a hurry.</p>
          <p className="font-serif text-xl italic text-primary">“A good pickle doesn&apos;t just add flavour.<br />It brings everyone back to the table.”</p>
          <div className="flex items-center gap-2 text-sm text-accent"><Heart className="size-4" aria-hidden="true" /> From Amma&apos;s kitchen, with love</div>
        </div>
      </div>
    </section>

    <section id="why-ammas" className="site-container py-16 md:py-20" aria-labelledby="why-heading">
      <div className="text-center"><p className="eyebrow mb-3">The Amma&apos;s promise</p><h2 id="why-heading" className="section-title">Good food. No shortcuts.</h2><p className="mt-4 text-muted-foreground">Nothing fancy. Just the things that really matter.</p></div>
      <div className="mt-12 grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-4">
        {[
          { icon: CookingPot, title: 'Recipes with roots', text: 'Time-honoured Andhra recipes, lovingly passed from one generation to the next.' },
          { icon: Leaf, title: 'Ingredients you know', text: 'Fresh produce, authentic spices, and real flavour. Nothing that needs explaining.' },
          { icon: Heart, title: 'Small batches, big care', text: 'Made by hand, with the patience and attention that every good pickle deserves.' },
          { icon: Sparkles, title: 'Clean kitchen. Honest food.', text: 'Thoughtful preparation and careful packing, from the first ingredient to the final jar.' },
        ].map(({ icon: Icon, title, text }) => <div key={title} className="flex flex-col items-center gap-4 text-center"><div className="flex size-16 items-center justify-center rounded-full bg-muted text-accent"><Icon className="size-7" strokeWidth={1.4} aria-hidden="true" /></div><h3 className="font-serif text-xl font-medium">{title}</h3><p className="max-w-64 text-sm leading-relaxed text-muted-foreground">{text}</p></div>)}
      </div>
    </section>

    <section id="gifting" className="bg-accent py-12 text-accent-foreground md:py-14" aria-labelledby="gifting-heading">
      <div className="site-container flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
        <div className="flex items-start gap-5"><Gift className="mt-1 hidden size-12 shrink-0 text-secondary sm:block" strokeWidth={1.25} aria-hidden="true" /><div><p className="mb-3 text-sm font-medium uppercase tracking-[.16em] text-secondary">Good things are better shared</p><h2 id="gifting-heading" className="font-serif text-3xl leading-tight text-balance">Gift a little taste of home.</h2><p className="mt-3 max-w-lg text-base leading-relaxed text-accent-foreground/80">Festival boxes, thoughtful gifts, and big family gatherings.<br className="hidden lg:block" /> There&apos;s always a reason to share a jar.</p></div></div>
        <div className="flex shrink-0 flex-col items-start gap-3"><Button variant="secondary" size="lg" onClick={() => setContactTopic('Gift packs & festival boxes')}>Let&apos;s put a box together <ArrowRight data-icon="inline-end" /></Button><button onClick={() => setContactTopic('Bulk orders')} className="flex items-center gap-2 text-sm text-accent-foreground/80 underline-offset-4 hover:underline"><Package className="size-4" aria-hidden="true" /> Buying in bulk? Let&apos;s talk.</button></div>
      </div>
    </section>

    <section id="reviews" className="site-container py-16 md:py-20" aria-labelledby="reviews-heading">
      <div className="text-center"><p className="eyebrow mb-3">A little love, sent back</p><h2 id="reviews-heading" className="section-title">The taste that takes you back.</h2><p className="mt-4 text-muted-foreground">The kind of memories our pickles are made for.</p></div>
      <div className="mt-10 grid gap-6 md:grid-cols-3">
        {[
          { quote: 'The mango pickle tastes exactly like the pickle my grandmother used to make. One bite and I’m home again.', name: 'Priya R.', location: 'Hyderabad', initial: 'P' },
          { quote: 'Amazing Andhra-style spice and excellent quality. The gongura pickle has become a permanent fixture at our table.', name: 'Karthik S.', location: 'Bengaluru', initial: 'K' },
          { quote: 'The perfect companion to rice, dosa and curd rice. That familiar homemade flavour makes even a simple meal special.', name: 'Ananya M.', location: 'Chennai', initial: 'A' },
        ].map((review) => <figure key={review.name} className="rounded-xl border border-border bg-muted/40 p-6"><div className="mb-5 flex items-center justify-between"><div className="rating-stars" aria-label="Sample 5 out of 5 rating">{[1, 2, 3, 4, 5].map((i) => <Star key={i} className="size-4 fill-current" aria-hidden="true" />)}</div><Quote className="size-6 text-primary/25" aria-hidden="true" /></div><blockquote className="min-h-30 font-serif text-lg leading-relaxed">“{review.quote}”</blockquote><figcaption className="mt-6 flex items-center gap-3"><span className="flex size-10 items-center justify-center rounded-full bg-secondary/20 font-serif text-primary">{review.initial}</span><div><p className="text-sm font-semibold">{review.name}</p><p className="text-sm text-muted-foreground">{review.location}</p></div></figcaption></figure>)}
      </div>
      <p className="mt-6 text-center text-sm text-muted-foreground">Illustrative testimonials for this sample website, not verified customer reviews.</p>
    </section>

    <section id="faq" className="border-t border-border bg-muted/50 py-16 md:py-20" aria-labelledby="faq-heading">
      <div className="site-container flex flex-col gap-8 md:flex-row md:gap-20">
        <div className="md:w-2/5"><p className="eyebrow mb-3">A few things worth knowing</p><h2 id="faq-heading" className="section-title">A little curious?<br />We like that.</h2><p className="mt-4 text-base leading-relaxed text-muted-foreground">From your first jar to your last spoonful.</p><Button variant="link" className="mt-5" onClick={() => setContactTopic('Question about our pickles')}>Ask us a question <ArrowRight data-icon="inline-end" /></Button></div>
        <Accordion className="md:w-3/5" multiple>
          {[
            { q: 'How spicy are your pickles?', a: 'There’s a jar for every palate. Lemon is our mildest, garlic and tomato have a medium kick, while Andhra mango, gongura, chicken, and prawn bring the heat. Look for the flame indicators on each product.' },
            { q: 'How should I store my pickle?', a: 'Always use a clean, dry spoon and close the lid after serving. Follow the storage directions and best-before date on your jar. Keep non-vegetarian pickles refrigerated as directed on their label. Product information here is illustrative and must be confirmed before sale.' },
            { q: 'What sizes are available?', a: 'Our sample collection comes in 250g, 500g, and 1kg jars. Choose your size on a product card or product page. Prices update automatically.' },
            { q: 'Do you offer delivery across India?', a: 'The sample checkout shows a ₹49 delivery charge, waived for baskets of ₹499 or more. Delivery coverage and timelines will be confirmed when the live store opens. No orders are shipped from this demo.' },
            { q: 'Can I order gift boxes or buy in bulk?', a: 'Absolutely, that’s part of the vision! Use the gifting or bulk enquiry option to try the enquiry form. This preview does not send messages; live contact details will be added before launch.' },
            { q: 'Can I place a real order on this website?', a: 'Not yet. This is an interactive sample storefront. You can browse, build a basket, and preview checkout, but no payment is collected, no order is placed, and personal details are not sent or saved. Your basket resets when the page is refreshed.' },
          ].map((faq) => <AccordionItem value={faq.q} key={faq.q}><AccordionTrigger className="py-5">{faq.q}</AccordionTrigger><AccordionContent className="pb-5 leading-relaxed">{faq.a}</AccordionContent></AccordionItem>)}
        </Accordion>
      </div>
    </section>

    <section id="contact" className="bg-secondary/15 py-12 text-foreground">
      <div className="site-container flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left"><div><h2 className="font-serif text-2xl font-medium">There&apos;s always room at Amma&apos;s table.</h2><p className="mt-2 text-muted-foreground">A question, a special request, or just a hello — we&apos;re all ears.</p></div><Button size="lg" onClick={() => setContactTopic('WhatsApp ordering')}><MessageCircle data-icon="inline-start" /> Let&apos;s talk pickles</Button></div>
    </section>
    <div className="heritage-rule" aria-hidden="true" />
  </>
}
