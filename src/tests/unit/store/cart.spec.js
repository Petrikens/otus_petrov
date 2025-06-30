import { setActivePinia, createPinia } from 'pinia'
import { useCartStore } from '@/store/cart'
import { describe, it, expect, beforeEach } from 'vitest'

describe('useCartStore', () => {
    beforeEach(() => {
        setActivePinia(createPinia())
    })

    it('добавляет новый товар в корзину', () => {
        const cart = useCartStore()
        const product = { id: 1, title: 'Test Product', price: 10 }

        cart.addToCart(product)

        expect(cart.items).toHaveLength(1)
        expect(cart.items[0]).toMatchObject({
            id: 1,
            title: 'Test Product',
            price: 10,
            quantity: 1
        })
    })

    it('увеличивает количество товара при повторном добавлении', () => {
        const cart = useCartStore()
        const product = { id: 1, title: 'Test Product', price: 10 }

        cart.addToCart(product)
        cart.addToCart(product)

        expect(cart.items).toHaveLength(1)
        expect(cart.items[0].quantity).toBe(2)
    })

    it('очищает корзину', () => {
        const cart = useCartStore()
        const product = { id: 1, title: 'Test Product', price: 10 }

        cart.addToCart(product)
        cart.clearCart()

        expect(cart.items).toHaveLength(0)
    })
})
