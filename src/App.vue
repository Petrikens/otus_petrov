<template>
  <div>
    <Navigation />
    <router-view />
  </div>
</template>

<script setup>
import Navigation from './components/Navigation.vue'
</script>

<style>
body {
  font-family: Arial, sans-serif;
  margin: 0;
  padding: 0;
}
</style>
