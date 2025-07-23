import { defineStore } from 'pinia'
import type { CartItem, Product } from '@/types'

export const useCartStore = defineStore('cart', {
    state: (): { items: CartItem[] } => ({
        items: []
    }),
    actions: {
        addToCart(product: Product) {
            const existing = this.items.find(item => item.id === product.id)
            if (existing) {
                existing.quantity++
            } else {
                this.items.push({ ...product, quantity: 1 })
            }
        },
        clearCart() {
            this.items = []
        }
    }
})
