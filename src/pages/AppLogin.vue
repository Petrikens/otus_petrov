<template>
  <form @submit.prevent="login">
    <input v-model="username" data-testid="login-username"  placeholder="Логин" required />
    <input v-model="password" data-testid="login-password"  type="password" placeholder="Пароль" required />
    <button data-testid="login-submit" type="submit">Войти</button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ROUTES } from '@/constants'

const username = ref<string>('')
const password = ref<string>('')
const router = useRouter()

function login(): void {
  if (username.value && password.value) {
    localStorage.setItem('isAuth', 'true')
    router.push(ROUTES.HOME)
  }
}
</script>
