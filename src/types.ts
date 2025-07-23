export interface Product {
  id: number
  title: string
  price: number
  description: string
  category: string
  image?: string
  quantity?: number
}

export interface Order {
  name: string
  email: string
  city: string
  street: string
  house: string
  cardNumber: string
  expiration: string
  cvv: string
  agree: boolean
}

export interface CartItem extends Product {
  quantity: number
}

export type NewProduct = Omit<Product, 'id'>

export interface BinanceTradeMessage {
  e: string
  E: number
  s: string
  t: number
  p: string
  q: string
  b: number
  a: number
  T: number
  m: boolean
  M: boolean
}