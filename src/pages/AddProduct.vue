<template>
  <Form :validation-schema="productValidationSchema" @submit="createProduct">
    <div>
      <label>Title</label>
      <Field name="title" />
      <ErrorMessage name="title" />
    </div>
    <div>
      <label>Price</label>
      <Field name="price" type="number" />
      <ErrorMessage name="price" />
    </div>
    <div>
      <label>Description</label>
      <Field name="description" as="textarea" />
      <ErrorMessage name="description" />
    </div>
    <div>
      <label>Category</label>
      <Field name="category" />
      <ErrorMessage name="category" />
    </div>
    <button type="submit">Create Product</button>
  </Form>
</template>

<script setup>
import { Field, Form, ErrorMessage } from 'vee-validate';
import { useProductStore } from '../store/products'
import { useRouter } from 'vue-router'
import * as yup from 'yup';

const productValidationSchema = yup.object({
  title: yup.string().required(),
  price: yup.number().required().positive(),
  description: yup.string().required(),
  category: yup.string().required()
})

const store = useProductStore()
const router = useRouter()

const createProduct = async (values) => {
  store.addProduct(values)
  router.push('/')
}
</script>

<style>
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

