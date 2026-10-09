import { Hero } from '@/components/store/hero'
import { ProductCatalog } from '@/components/store/product-catalog'
import { BrandSections } from '@/components/store/brand-sections'

export default function HomePage() {
  return <main id="main-content"><Hero /><ProductCatalog /><BrandSections /></main>
}
