<template>
  <div class="product-card">
    <img :src="product?.image" :alt="product.title" class="product-image"/>
    <h3>{{ product.title }}</h3>
    <p>{{ product.price }}$</p>
    <router-link :to="`/product/${product.id}`">Подробнее</router-link>
    <button @click="$emit('add')">Добавить в корзину</button>
  </div>
</template>

<script setup lang="ts">
defineProps(['product'])
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 10px;
  margin: 10px;
  text-align: center;
}

.product-image {
  max-width: 100%;
  height: auto;
}
</style>
