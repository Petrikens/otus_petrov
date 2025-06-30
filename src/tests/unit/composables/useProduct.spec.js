// src/tests/unit/composables/useProduct.spec.js
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h, ref } from 'vue'
import { mount } from '@vue/test-utils'

function flushPromises() {
    return new Promise(resolve => setTimeout(resolve))
}

const mockProduct = {
    id: 42,
    title: 'Test Product',
    price: 99.99
}

let useProduct

beforeEach(async () => {
    vi.resetModules()

    vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockProduct)
        })
    ))

    const mod = await import('@/composables/useProduct')
    useProduct = mod.useProduct
})

afterEach(() => {
    vi.unstubAllGlobals()
})

function createTestComponent(id) {
    return defineComponent({
        setup() {
            const { product, loading } = useProduct(id)
            return { product, loading }
        },
        render() {
            return h('div')
        }
    })
}

describe('useProduct', () => {
    it('загружает данные о товаре по id', async () => {
        const wrapper = mount(createTestComponent(42))

        await flushPromises()
        await flushPromises()

        expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products/42')
        expect(wrapper.vm.product).toEqual(mockProduct)
        expect(wrapper.vm.loading).toBe(false)
    })
})
