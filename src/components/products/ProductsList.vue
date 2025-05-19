<template>
  <div class="products-list">
    <ProductItem
      v-for="item in products"
      :key="item.id"
      :product="item"
    />
  </div>
</template>

<script setup>
import { defineProps } from 'vue'
import ProductItem from '@/components/products/ProductItem.vue'

const props = defineProps({
  products: {
    type: Array,
    required: true
  }
})
</script>

<style>
.products-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
</style>