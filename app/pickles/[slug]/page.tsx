import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { products } from '@/lib/products'
import { ProductDetail } from '@/components/store/product-detail'

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.id }))
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)
  return { title: product ? `${product.name} | Amma’s Aachar` : 'Pickle not found', description: product?.story }
}

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const product = products.find((p) => p.id === slug)
  if (!product) notFound()
  return <ProductDetail product={product} />
}
