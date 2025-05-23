<template>
  <div class="search-header">
    <input v-model="localName" type="text" placeholder="Search by name" />
    <input v-model.number="localPrice" type="number" placeholder="Max price" />
  </div>
</template>

<script setup>
import { ref, watch } from 'vue';
const props = defineProps({
  searchName: String,
  searchPrice: [String, Number]
});
const emit = defineEmits(['update:searchName', 'update:searchPrice']);

const localName = ref(props.searchName);
const localPrice = ref(props.searchPrice);


watch(localName, val => emit('update:searchName', val));
watch(localPrice, val => emit('update:searchPrice', val));
</script>

<style>
.search-header {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
}
.search-header input {
  flex: 1;
  padding: 0.5rem;
}
</style>
