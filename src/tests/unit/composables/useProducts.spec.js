import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import { defineComponent, h } from 'vue'
import { mount } from '@vue/test-utils'

function flushPromises() {
    return new Promise(resolve => setTimeout(resolve))
}

let useProducts
let useProductStore
const setProducts = vi.fn()
const mockData = [
    { id: 1, title: 'Product A' },
    { id: 2, title: 'Product B' }
]

beforeEach(async () => {
    vi.resetModules()
    setProducts.mockClear()
    useProductStore = vi.fn()

    vi.stubGlobal('fetch', vi.fn(() =>
        Promise.resolve({
            json: () => Promise.resolve(mockData)
        })
    ))

    vi.doMock('@/store/products', async () => {
        const mod = await vi.importActual('@/store/products')
        return {
            ...mod,
            useProductStore
        }
    })

    const mod = await import('@/composables/useProducts')
    useProducts = mod.useProducts
})

afterEach(() => {
    vi.unstubAllGlobals()
})

function createTestComponent() {
    return defineComponent({
        setup() {
            const { loading } = useProducts()
            return { loading }
        },
        render() {
            return h('div')
        }
    })
}

describe('useProducts', () => {
    it('загружает товары и обновляет store, если store пустой', async () => {
        useProductStore.mockReturnValue({
            products: [],
            setProducts
        })

        const wrapper = mount(createTestComponent())

        await flushPromises()
        await flushPromises()

        expect(fetch).toHaveBeenCalledWith('https://fakestoreapi.com/products')
        expect(setProducts).toHaveBeenCalledWith(mockData)
        expect(wrapper.vm.loading).toBe(false)
    })

    it('не загружает товары, если они уже есть в store', async () => {
        useProductStore.mockReturnValue({
            products: [{ id: 999, title: 'Already Loaded' }],
            setProducts
        })

        const wrapper = mount(createTestComponent())

        await flushPromises()

        expect(fetch).not.toHaveBeenCalled()
        expect(setProducts).not.toHaveBeenCalled()
        expect(wrapper.vm.loading).toBe(false)
    })
})
