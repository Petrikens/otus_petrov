<template>
  <div class="product-list">
    <div v-for="p in filtered" :key="p.id" class="product-item">
      <h3>{{ p.title }}</h3>
      <p>Price: ${{ p.price }}</p>
      <p>{{ p.description }}</p>
    </div>
    <div v-if="!filtered.length">No products found.</div>
  </div>
</template>

<script setup>
import { computed } from 'vue';
const props = defineProps({
  products: Array,
  searchName: String,
  searchPrice: [String, Number]
});

const filtered = computed(() =>
  props.products.filter(p => {
    const okName = props.searchName
      ? p.title.toLowerCase().includes(props.searchName.toLowerCase())
      : true;
    const okPrice = props.searchPrice
      ? p.price <= Number(props.searchPrice)
      : true;
    return okName && okPrice;
  })
);
</script>

<style>
.product-list {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 1rem;
}
.product-item {
  border: 1px solid #ccc;
  padding: 0.5rem;
  border-radius: 4px;
}
</style>
