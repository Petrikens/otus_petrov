import { defineStore } from 'pinia'
import { ref } from 'vue'
import type { Product, NewProduct } from '@/types'

export const useProductStore = defineStore('products', () => {
  const products = ref<Product[]>([])

  function setProducts(items: Product[]) {
    products.value = items
  }

  function addProduct(newProduct: NewProduct) {
    const productWithId: Product = {
      ...newProduct,
      id: Date.now()
    }
    products.value.push(productWithId)
  }

  return {
    products,
    setProducts,
    addProduct
  }
})
