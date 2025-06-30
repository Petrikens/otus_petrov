<template>
  <form @submit.prevent="login">
    <input v-model="username" data-testid="login-username"  placeholder="Логин" required />
    <input v-model="password" data-testid="login-password"  type="password" placeholder="Пароль" required />
    <button data-testid="login-submit" type="submit">Войти</button>
  </form>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants.js'


const username = ref('')
const password = ref('')
const router = useRouter()

function login() {
  if (username.value && password.value) {
    localStorage.setItem('isAuth', 'true')
    router.push(ROUTES.HOME)
  }
}
</script>
