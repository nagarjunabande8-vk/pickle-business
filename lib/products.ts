export type Weight = '250g' | '500g' | '1kg'
export type Product = {
  id: string
  name: string
  description: string
  story: string
  price: number
  image: string
  category: 'Vegetarian' | 'Non-Vegetarian'
  spice: 1 | 2 | 3
  rating: string
  reviews: number
  tag?: string
  ingredients: string
  pairsWith: string
  allergens: string
}

export const products: Product[] = [
  { id: 'andhra-mango-pickle', name: 'Andhra Mango Pickle', description: 'The original. Bold, tangy & timeless.', story: 'Our take on the beloved Andhra avakaya. Firm, sun-ripened raw mango meets freshly ground mustard, fiery red chilli, and the slow magic of a family recipe. One spoonful turns a simple meal into a memory.', price: 249, image: '/images/mango-pickle.png', category: 'Vegetarian', spice: 3, rating: '4.9', reviews: 128, tag: 'Bestseller', ingredients: 'Raw mango, chilli powder, mustard seeds, fenugreek, sesame oil, garlic, salt.', pairsWith: 'Hot rice and ghee, curd rice, or a crisp dosa.', allergens: 'Contains mustard and sesame.' },
  { id: 'gongura-pickle', name: 'Gongura Pickle', description: 'A little tang. A whole lot of Andhra.', story: 'A celebration of Andhra’s favourite leafy green. Fresh gongura leaves are slowly cooked with fragrant spices and garlic to create that unmistakable, lip-smacking tang.', price: 229, image: '/images/gongura-pickle.png', category: 'Vegetarian', spice: 3, rating: '4.8', reviews: 96, tag: 'Andhra favourite', ingredients: 'Gongura leaves, chilli powder, garlic, mustard seeds, sesame oil, salt.', pairsWith: 'Steamed rice, a drizzle of ghee, and sliced onion.', allergens: 'Contains mustard and sesame.' },
  { id: 'lemon-pickle', name: 'Lemon Pickle', description: 'Sunshine in a jar. Tangy & comforting.', story: 'Juicy lemons, gently mellowed and brought together with a warm blend of traditional spices. Bright, zesty, and a little nostalgic, this is comfort food’s favourite companion.', price: 199, image: '/images/lemon-pickle.png', category: 'Vegetarian', spice: 1, rating: '4.8', reviews: 84, ingredients: 'Lemon, chilli powder, turmeric, mustard seeds, fenugreek, sesame oil, salt.', pairsWith: 'Curd rice, khichdi, dal rice, or soft chapatis.', allergens: 'Contains mustard and sesame.' },
  { id: 'garlic-pickle', name: 'Garlic Pickle', description: 'Big flavour for the garlic lover in you.', story: 'Whole garlic cloves, slowly softened in a richly spiced pickle masala. Bold, savoury, and deeply satisfying, with just enough heat to keep you reaching for another spoonful.', price: 249, image: '/images/garlic-pickle.png', category: 'Vegetarian', spice: 2, rating: '4.9', reviews: 72, tag: 'Kitchen favourite', ingredients: 'Garlic, tamarind, chilli powder, mustard seeds, sesame oil, salt.', pairsWith: 'Parathas, dal rice, idli, or your favourite dosa.', allergens: 'Contains mustard and sesame.' },
  { id: 'tomato-pickle', name: 'Tomato Pickle', description: 'Slow-cooked tomatoes. Everyday happiness.', story: 'Ripe tomatoes are slow-cooked with tamarind and a fragrant tempering. This smooth, tangy favourite is the easiest way to bring a little homemade warmth to any meal.', price: 219, image: '/images/tomato-pickle.png', category: 'Vegetarian', spice: 2, rating: '4.8', reviews: 63, ingredients: 'Tomato, tamarind, chilli powder, garlic, mustard seeds, sesame oil, salt.', pairsWith: 'Idli, dosa, warm rice, or a simple sandwich.', allergens: 'Contains mustard and sesame.' },
  { id: 'mixed-vegetable-pickle', name: 'Mixed Vegetable Pickle', description: 'All your favourites, happily together.', story: 'A cheerful mix of crunchy vegetables, each bringing its own little personality to our traditional pickle masala. Tangy, textured, and made for sharing around the table.', price: 229, image: '/images/mixed-pickle.png', category: 'Vegetarian', spice: 2, rating: '4.7', reviews: 48, ingredients: 'Carrot, raw mango, lemon, chilli powder, mustard seeds, sesame oil, salt.', pairsWith: 'Stuffed parathas, pulao, and everyday thalis.', allergens: 'Contains mustard and sesame.' },
  { id: 'chicken-pickle', name: 'Chicken Pickle', description: 'Andhra-style heat. Tender, spiced chicken.', story: 'Tender boneless chicken pieces meet a punchy Andhra spice blend. Prepared in small batches for a rich, savoury pickle that makes every mouthful a little more special.', price: 399, image: '/images/chicken-pickle.png', category: 'Non-Vegetarian', spice: 3, rating: '4.9', reviews: 91, tag: 'Spice lover’s pick', ingredients: 'Chicken, ginger, garlic, chilli powder, lemon, mustard seeds, sesame oil, salt.', pairsWith: 'Hot rice, ghee rice, or flaky parottas.', allergens: 'Contains mustard and sesame. Non-vegetarian.' },
  { id: 'prawn-pickle', name: 'Prawn Pickle', description: 'Coastal comfort with a fiery little kick.', story: 'A taste of the Andhra coast, with juicy prawns folded into a deeply fragrant, fiery pickle masala. A special addition to a slow weekend lunch.', price: 449, image: '/images/prawn-pickle.png', category: 'Non-Vegetarian', spice: 3, rating: '4.8', reviews: 57, ingredients: 'Prawns, ginger, garlic, chilli powder, lemon, mustard seeds, sesame oil, salt.', pairsWith: 'Steamed rice, coconut rice, or warm chapatis.', allergens: 'Contains shellfish, mustard, and sesame. Non-vegetarian.' },
]

export const weights: Weight[] = ['250g', '500g', '1kg']
export function priceFor(product: Product, weight: Weight) {
  return product.price * (weight === '1kg' ? 4 : weight === '500g' ? 2 : 1)
}
export function money(value: number) {
  return new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(value)
}
export function deliveryFor(subtotal: number) {
  return subtotal === 0 || subtotal >= 499 ? 0 : 49
}
