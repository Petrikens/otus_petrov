<template>
  <div>
    <h1>Корзина</h1>
    <div v-if="cart.items.length === 0">Корзина пуста</div>
    <div v-else>
      <ul>
        <li v-for="item in cart.items" :key="item.id">
          <img :src="item.image" :alt="item.title" class="product-image"/>
          {{ item.title }} — {{ item.quantity }} шт.
        </li>
      </ul>
      <button @click="cart.clearCart()">Очистить корзину</button>
    </div>
  </div>
</template>

<script setup>
import { useCartStore } from '../store/cart'

const cart = useCartStore()
</script>

<style scoped>
.product-image {
  max-width: 200px;
  height: auto;
}
</style>
