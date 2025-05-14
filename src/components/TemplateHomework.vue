<script setup>
import { ref } from 'vue'

const namesList = ref([
  {
    name: 'John',
    years: 30,
    isShowYears: true,
    isHovered: false
  },
  {
    name: 'Jane',
    years: 25,
    isShowYears: true,
    isHovered: false
  },
  {
    name: 'Bob',
    years: 20,
    isShowYears: true,
    isHovered: false
  }
]);
const isShowNamesList = ref(true);
</script>

<template>
  <div class="container">
    <button
      type="button"
      class="toggle-list-btn"
      @click="isShowNamesList = !isShowNamesList"
    >
      {{ isShowNamesList ? 'Hide names list' : 'Show names list' }}
    </button>

    <div
      v-if="isShowNamesList"
      v-for="person in namesList"
      :key="person.name"
      class="card"
    >
      <h1
        class="name"
        :style="{ color: person.isHovered ? '#e3342f' : '#333' }"
        @mouseover="person.isHovered = true"
        @mouseleave="person.isHovered = false"
      >
        {{ person.name }}
      </h1>
      <h2 class="years" v-show="person.isShowYears">{{ person.years }} years</h2>
      <button
        type="button"
        class="toggle-years-btn"
        @click="person.isShowYears = !person.isShowYears"
      >
        {{ person.isShowYears ? 'Hide years' : 'Show years' }}
      </button>
    </div>
  </div>
</template>

<style scoped>
.container {
  max-width: 600px;
  margin: 0 auto;
  padding: 20px;
  font-family: Arial, sans-serif;
}

.toggle-list-btn,
.toggle-years-btn {
  background-color: #3490dc;
  color: #fff;
  border: none;
  padding: 10px 15px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-bottom: 15px;
}

.toggle-list-btn:hover,
.toggle-years-btn:hover {
  background-color: #2779bd;
}

.card {
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  margin-bottom: 20px;
  text-align: center;
}

.name {
  font-size: 1.5em;
  margin-bottom: 10px;
  transition: color 0.3s;
}

.years {
  font-size: 1.2em;
  color: #555;
  margin-bottom: 15px;
}
</style>
