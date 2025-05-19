<template>
  <div id="app">
    <h1>Список товаров</h1>

    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка загрузки: {{ error }}</div>
    <ProductsList v-else :products="products" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import ProductsList from '@/components/products/ProductsList.vue'

const products = ref([])
const loading = ref(true)
const error = ref(null)
const url = 'https://fakestoreapi.com/products'

onMounted(async () => {
  try {
    const res = await fetch(url)
    if (!res.ok) throw new Error(`HTTP ${res.status}`)
    products.value = await res.json()
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
})
</script>

<style>
#app {
  max-width: 800px;
  margin: 0 auto;
  padding: 1rem;
  font-family: Arial, sans-serif;
}
</style>