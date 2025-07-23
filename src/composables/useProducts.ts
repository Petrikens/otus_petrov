import { ref, onMounted, Ref } from 'vue'
import { useProductStore } from '@/store/products'
import type { Product } from '@/types'

export function useProducts(): { loading: Ref<boolean> } {
    const store = useProductStore()
    const loading = ref < boolean > (true)

    onMounted(async () => {
        if (store.products.length === 0) {
            const res = await fetch('https://fakestoreapi.com/products')
            const data: Product[] = await res.json()
            store.setProducts(data)
        }
        loading.value = false
    })

    return {
        loading
    }
}
