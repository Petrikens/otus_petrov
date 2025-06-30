import { ref, onMounted } from 'vue'
import { useProductStore } from '@/store/products'

export function useProducts() {
    const store = useProductStore()
    const loading = ref(true)

    onMounted(async () => {
        if (store.products.length === 0) {
            const res = await fetch('https://fakestoreapi.com/products')
            const data = await res.json()
            store.setProducts(data)
        }
        loading.value = false
    })

    return {
        loading
    }
}