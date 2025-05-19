<template>
  <div class="product-card">
    <img :src="product.image" :alt="product.title" class="product-image" />
    <h2 class="product-title">{{ product.title }}</h2>
    <p class="product-price">\${{ product.price.toFixed(2) }}</p>
    <p class="product-desc">{{ product.description }}</p>
  </div>
</template>

<script setup>
import { defineProps } from 'vue'

const props = defineProps({
  product: {
    type: Object,
    required: true
  }
})
</script>

<style>
.product-card {
  border: 1px solid #ddd;
  border-radius: 8px;
  padding: 1rem;
  display: flex;
  flex-direction: column;
  align-items: center;
}
.product-image {
  max-width: 100%;
  height: auto;
  margin-bottom: 0.5rem;
}
.product-title {
  font-size: 1.1rem;
  margin: 0.5rem 0;
  text-align: center;
}
.product-price {
  font-weight: bold;
  margin-bottom: 0.5rem;
}
.product-desc {
  font-size: 0.9rem;
  color: #555;
}
</style>