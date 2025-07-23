<template>
  <Form :validation-schema="productValidationSchema" @submit="handleSubmit(createProduct)">
    <div>
      <label for="title">Title</label>
      <Field id="title" name="title" data-testid="title" />
      <ErrorMessage name="title" />
    </div>
    <div>
      <label for="price">Price</label>
      <Field id="price" name="price" type="number" data-testid="price" />
      <ErrorMessage name="price" />
    </div>
    <div>
      <label for="description">Description</label>
      <Field id="description" name="description" as="textarea" data-testid="description" />
      <ErrorMessage name="description" />
    </div>
    <div>
      <label for="category">Category</label>
      <Field id="category" name="category" data-testid="category" />
      <ErrorMessage name="category" />
    </div>
    <button type="submit" data-testid="submit">Create Product</button>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage, useForm  } from 'vee-validate';
import { useProductStore } from '@/store/products';
import { useRouter } from 'vue-router';
import { ROUTES } from '@/constants';
import type { NewProduct } from '@/types'
import * as yup from 'yup';

const productValidationSchema = yup.object({
  title: yup.string().required('Title is required'),
  price: yup.number().required('Price is required').positive(),
  description: yup.string().required('Description is required'),
  category: yup.string().required('Category is required')
});

const store = useProductStore();
const router = useRouter();
const { handleSubmit } = useForm<NewProduct>()
const createProduct = (values: NewProduct) => {
  store.addProduct(values);
  router.push(ROUTES.HOME);
};
</script>

<style scoped>
form > div {
  margin-bottom: 0.5rem;
}
label {
  display: block;
  font-weight: bold;
}
input, textarea {
  width: 100%;
  padding: 0.5rem;
  box-sizing: border-box;
}
button {
  padding: 0.5rem 1rem;
}
</style>
