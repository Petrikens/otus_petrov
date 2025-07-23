import { ref, onMounted, Ref } from 'vue'
import { useProductStore } from '@/store/products'
import type { Product } from '@/types'

export function useProduct(id: string): { product: Ref<Product | undefined>, loading: Ref<boolean> } {
  const store = useProductStore()
  const product = ref<Product>()
  const loading = ref<boolean>(true)

  onMounted(() => {
    const p = store.products.find(p => p.id === Number(id))
    product.value = p
    loading.value = false
  })

  return {
    product,
    loading
  }
}