<template>
  <form @submit.prevent="login">
    <input v-model="username" placeholder="Логин" required />
    <input v-model="password" type="password" placeholder="Пароль" required />
    <button type="submit">Войти</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  if (username.value && password.value) {
    localStorage.setItem('isAuth', 'true')
    router.push('/add-product')
  }
}
</script>
