<template>
  <nav v-if="showNavigation">
    <router-link to="/" exact-active-class="active">Главная</router-link> |
    <router-link to="/cart" active-class="active">Корзина {{ cart.items.length }}</router-link> |
    <router-link to="/checkout" active-class="active">Чекаут</router-link> |
    <router-link to="/add-product" active-class="active">Добавить товар</router-link> |
    <router-link 
      v-if="!isAuth" 
      to="/login" 
      active-class="active">Логин</router-link>
    <button v-if="isAuth" @click="logout">Выйти</button>
  </nav>
</template>

<script setup>
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useCartStore } from '@/store/cart'
import { ROUTES } from '@/constants.js'

const cart = useCartStore()
const route = useRoute()
const router = useRouter()

const showNavigation = computed(() => route.path !== ROUTES.LOGIN)
const isAuth = computed(() => localStorage.getItem('isAuth') === 'true')

function logout() {
  localStorage.removeItem('isAuth')
  router.push(ROUTES.LOGIN)
}
</script>

<style scoped>
nav {
  padding: 1rem;
  background-color: #f0f0f0;
}

router-link {
  margin-right: 1rem;
  text-decoration: none;
  color: #333;
}

.active {
  font-weight: bold;
  color: #1976d2;
}

button {
  margin-left: 1rem;
  cursor: pointer;
}
</style>
