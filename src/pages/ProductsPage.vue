<template>
    <SearchHeader
      v-model:searchName="searchName"
      v-model:searchPrice="searchPrice"
    />

    <ProductList
      :products="products"
      :search-name="searchName"
      :search-price="searchPrice"
    />

    <hr />

    <ProductCreateForm @product-created="addProduct" />

    <hr />

    <OrderForm />
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import SearchHeader from '@/components/products/SearchHeader.vue';
import ProductList from '@/components/products/ProductList.vue';
import ProductCreateForm from '@/components/products/ProductCreateForm.vue';
import OrderForm from '@/components/products/OrderForm.vue';

const products = ref([]);
const searchName = ref('');
const searchPrice = ref('');
const url= 'https://fakestoreapi.com/products';

onMounted(async () => {
  try {
    const { data } = await axios.get(url);
    products.value = data;
  } catch (e) {
    console.error('Не удалось загрузить товары', e);
  }
});

function addProduct(newProduct) {
  products.value.unshift(newProduct);
}
</script>