import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useProductStore = defineStore('products', () => {
    const products = ref([])

    function setProducts(items) {
        products.value = items
    }

    function addProduct(newProduct) {
        newProduct.id = Date.now() // симулируем уникальный id
        products.value.push(newProduct)
    }

    return {
        products,
        setProducts,
        addProduct
    }
})
