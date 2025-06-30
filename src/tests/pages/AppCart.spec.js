import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCart from '@/pages/AppCart.vue'

const clearCart = vi.fn()

vi.mock('@/store/cart', () => ({
    useCartStore: vi.fn()
}))

const { useCartStore } = await import('@/store/cart')

describe('AppCart.vue', () => {
    beforeEach(() => {
        clearCart.mockClear()
    })

    it('рендерится с заголовком', () => {
        useCartStore.mockReturnValue({ items: [], clearCart })

        const wrapper = mount(AppCart)
        expect(wrapper.text()).toContain('Корзина')
    })

    it('отображает "Корзина пуста", если нет товаров', () => {
        useCartStore.mockReturnValue({ items: [], clearCart })

        const wrapper = mount(AppCart)
        expect(wrapper.text()).toContain('Корзина пуста')
    })

    it('отображает список товаров, если они есть', () => {
        useCartStore.mockReturnValue({
            items: [
                { id: 1, title: 'Товар 1', quantity: 2, image: 'image1.jpg' },
                { id: 2, title: 'Товар 2', quantity: 1, image: 'image2.jpg' }
            ],
            clearCart
        })

        const wrapper = mount(AppCart)
        const items = wrapper.findAll('li')

        expect(items.length).toBe(2)
        expect(wrapper.text()).toContain('Товар 1')
        expect(wrapper.text()).toContain('2 шт.')
    })

    it('очищает корзину при нажатии на кнопку', async () => {
        useCartStore.mockReturnValue({
            items: [{ id: 1, title: 'Товар', quantity: 1, image: 'img.jpg' }],
            clearCart
        })

        const wrapper = mount(AppCart)
        const button = wrapper.get('button')
        await button.trigger('click')

        expect(clearCart).toHaveBeenCalled()
    })
})
