'use client'

import { createContext, useContext, useState, type ReactNode } from 'react'
import useSWR, { SWRConfig } from 'swr'
import { products, priceFor, type Weight } from '@/lib/products'

export type CartItem = { productId: string; weight: Weight; quantity: number }
type StoreContextValue = {
  items: CartItem[]
  count: number
  subtotal: number
  cartOpen: boolean
  setCartOpen: (open: boolean) => void
  checkoutOpen: boolean
  setCheckoutOpen: (open: boolean) => void
  searchOpen: boolean
  setSearchOpen: (open: boolean) => void
  contactTopic: string | null
  setContactTopic: (topic: string | null) => void
  addItem: (productId: string, weight: Weight, openCart?: boolean) => boolean
  updateQuantity: (productId: string, weight: Weight, quantity: number) => void
  announcement: string
}
const StoreContext = createContext<StoreContextValue | null>(null)

function StoreState({ children }: { children: ReactNode }) {
  const { data: items = [], mutate } = useSWR<CartItem[]>('amma-sample-cart', null, { fallbackData: [] })
  const [cartOpen, setCartOpen] = useState(false)
  const [checkoutOpen, setCheckoutOpen] = useState(false)
  const [searchOpen, setSearchOpen] = useState(false)
  const [contactTopic, setContactTopic] = useState<string | null>(null)
  const [announcement, setAnnouncement] = useState('')

  function addItem(productId: string, weight: Weight, openCart = true) {
    const product = products.find((item) => item.id === productId)
    if (!product) return false
    if (items.filter((item) => item.productId === productId).reduce((sum, item) => sum + item.quantity, 0) >= 12) {
      setAnnouncement('The sample cart allows up to 12 jars of each pickle. Contact us for bulk orders.')
      setCartOpen(true)
      return false
    }
    void mutate((current = []) => {
      const existing = current.find((item) => item.productId === productId && item.weight === weight)
      return existing
        ? current.map((item) => item === existing ? { ...item, quantity: item.quantity + 1 } : item)
        : [...current, { productId, weight, quantity: 1 }]
    }, { revalidate: false })
    setAnnouncement(`${product.name}, ${weight}, added to your basket.`)
    if (openCart) setCartOpen(true)
    return true
  }

  function updateQuantity(productId: string, weight: Weight, quantity: number) {
    if (!Number.isInteger(quantity) || quantity < 0) return
    void mutate((current = []) => {
      const others = current.filter((item) => item.productId === productId && item.weight !== weight).reduce((sum, item) => sum + item.quantity, 0)
      return current.map((item) => item.productId === productId && item.weight === weight ? { ...item, quantity: Math.min(quantity, 12 - others) } : item).filter((item) => item.quantity > 0)
    }, { revalidate: false })
    setAnnouncement(quantity === 0 ? 'Item removed from your basket.' : 'Basket quantity updated.')
  }

  const subtotal = items.reduce((sum, item) => {
    const product = products.find((p) => p.id === item.productId)
    return sum + (product ? priceFor(product, item.weight) * item.quantity : 0)
  }, 0)

  return <StoreContext.Provider value={{ items, count: items.reduce((sum, item) => sum + item.quantity, 0), subtotal, cartOpen, setCartOpen, checkoutOpen, setCheckoutOpen, searchOpen, setSearchOpen, contactTopic, setContactTopic, addItem, updateQuantity, announcement }}>
    {children}
    <span className="sr-only" role="status" aria-live="polite">{announcement}</span>
  </StoreContext.Provider>
}

export function StoreProvider({ children }: { children: ReactNode }) {
  return <SWRConfig value={{ provider: () => new Map() }}><StoreState>{children}</StoreState></SWRConfig>
}

export function useStore() {
  const store = useContext(StoreContext)
  if (!store) throw new Error('useStore must be used within StoreProvider')
  return store
}
