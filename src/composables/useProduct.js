import { ref, onMounted } from 'vue'

export function useProduct(id) {
    const product = ref(null)
    const loading = ref(true)

    onMounted(async () => {
        const res = await fetch(`https://fakestoreapi.com/products/${id}`)
        product.value = await res.json()
        loading.value = false
    })

    return { product, loading }
}
