<template>
  <Form :validation-schema="orderValidationSchema" @submit="handleSubmit(postOrder)">
    <h2>Order Form</h2>
    <div>
      <label>Full Name</label>
      <Field name="name" />
      <ErrorMessage name="name" />
    </div>
    <div>
      <label>Email</label>
      <Field name="email" type="email" />
      <ErrorMessage name="email" />
    </div>
    <div>
      <label>City</label>
      <Field name="city" />
      <ErrorMessage name="city" />
    </div>
    <div>
      <label>Street</label>
      <Field name="street" />
      <ErrorMessage name="street" />
    </div>
    <div>
      <label>House №</label>
      <Field name="house" />
      <ErrorMessage name="house" />
    </div>
    <div>
      <label>Card Number</label>
      <Field name="cardNumber" />
      <ErrorMessage name="cardNumber" />
    </div>
    <div>
      <label>Expiration (MM/YY)</label>
      <Field name="expiration" />
      <ErrorMessage name="expiration" />
    </div>
    <div>
      <label>CVV</label>
      <Field name="cvv" />
      <ErrorMessage name="cvv" />
    </div>
    <div>
      <label>
        <Field name="agree" type="checkbox" /> I agree to terms
      </label>
      <ErrorMessage name="agree" />
    </div>
    <button type="submit">Place Order</button>
  </Form>
</template>

<script setup lang="ts">
import { Field, Form, ErrorMessage, useForm } from 'vee-validate';
import * as yup from 'yup';
import axios from 'axios';
import type { Order } from '@/types';

const orderValidationSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    city: yup.string().required(),
    street: yup.string().required(),
    house: yup.string().required(),
    cardNumber: yup
      .string()
      .required()
      .matches(/^\d{16}$/, 'Must be 16 digits'),
    expiration: yup
      .string()
      .required()
      .matches(/^\d{2}\/\d{2}$/, 'Format MM/YY'),
    cvv: yup.string().required().matches(/^\d{3}$/, '3 digits'),
    agree: yup.bool().oneOf([true], 'You must agree')
  });

  const { handleSubmit } = useForm<Order>()

  async function postOrder(values: Order) {
    try {
      await axios.post('https://httpbin.org/post', values);
      alert('Order placed successfully!');
      window.location.reload();
    } catch (e) {
      console.error('Order failed', e);
    }
  }
</script>

<style>
form {
  max-width: 400px;
}
form > div {
  margin-bottom: 0.75rem;
}
label {
  display: block;
  font-weight: bold;
  margin-bottom: 0.25rem;
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
