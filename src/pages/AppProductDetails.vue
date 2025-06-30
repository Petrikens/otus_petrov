<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else>
    <h1>{{ product.title }}</h1>
    <p>{{ product.description }}</p>
  </div>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { useProduct } from '@/composables/useProduct'

const route = useRoute()
const { product, loading } = useProduct(route.params.id)
</script>
