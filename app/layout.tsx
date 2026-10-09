import type { Metadata, Viewport } from 'next'
import { DM_Sans, Lora } from 'next/font/google'
import { StoreProvider } from '@/components/store/store-provider'
import { SiteHeader } from '@/components/store/site-header'
import { SiteFooter } from '@/components/store/site-footer'
import { CartDrawer } from '@/components/store/cart-drawer'
import { CheckoutDialog } from '@/components/store/checkout-dialog'
import { SearchDialog } from '@/components/store/search-dialog'
import { ContactDialog } from '@/components/store/contact-dialog'
import './globals.css'

const dmSans = DM_Sans({ subsets: ['latin'], variable: '--font-dm-sans', display: 'swap' })
const lora = Lora({ subsets: ['latin'], variable: '--font-lora', display: 'swap' })

export const metadata: Metadata = {
  title: 'Amma’s Aachar | A Little Spice. A Lot of Homemade Love.',
  description: 'Discover Amma’s Aachar: traditional Andhra mango, gongura, lemon, garlic, and more. Grandma’s recipes, handpicked ingredients, and the unmistakable taste of home. Interactive sample storefront.',
  applicationName: 'Amma’s Aachar',
  openGraph: {
    title: 'Amma’s Aachar — A Little Jar of Home',
    description: 'Grandma’s recipe. Homemade love. Authentic taste. Explore our sample collection of traditional Andhra pickles.',
    type: 'website',
    images: [{ url: '/images/hero-pickle.png', width: 1024, height: 1024, alt: 'Amma’s Andhra mango pickle' }],
  },
  icons: { icon: '/images/mango-pickle.png', apple: '/images/mango-pickle.png' },
}

export const viewport: Viewport = { colorScheme: 'light', themeColor: '#faf6ed', width: 'device-width', initialScale: 1 }

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en" className={`bg-background ${dmSans.variable} ${lora.variable}`}><body className="font-sans antialiased"><StoreProvider><a href="#main-content" className="sr-only fixed top-2 left-2 z-50 rounded-md bg-primary px-4 py-3 text-primary-foreground focus:not-sr-only">Skip to content</a><SiteHeader />{children}<SiteFooter /><CartDrawer /><CheckoutDialog /><SearchDialog /><ContactDialog /></StoreProvider></body></html>
}
