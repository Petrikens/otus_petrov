<template>
  <div v-if="loading">Загрузка...</div>
  <div v-else>
    <ProductCard 
      v-for="p in products.products" 
      :key="p.id" 
      :product="p"
      @add="addToCart(p)" 
    />
  </div>
</template>

<script setup>
import { useProducts } from '../composables/useProducts'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../store/cart'
import { useProductStore } from '../store/products'

const { loading } = useProducts()
const cart = useCartStore()
const products = useProductStore()
const addToCart = cart.addToCart
</script>
