<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else-if="product">
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
  </div>
  <div v-else>
    <p>Продукт не найден</p>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useProduct } from '@/composables/useProduct'

const route = useRoute()
const id = String(route.params.id)

const { product, loading } = useProduct(id)
</script>
