<template>
  <div>
    <h1>Список стран</h1>
    <div v-if="loading">Загрузка...</div>
    <div v-else-if="error">Ошибка: {{ error.message }}</div>
    <ul v-else>
      <li v-for="country in data.countries" :key="country.code">
        {{ country.emoji }} {{ country.name }} ({{ country.code }})
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { gql } from '@apollo/client/core'

const GET_COUNTRIES = gql`
  query {
    countries {
      code
      name
      emoji
    }
  }
`

const { result: data, loading, error } = useQuery(GET_COUNTRIES)
</script>
