<template>
  <div>
    <h2>Текущий курс BTC/USDT:</h2>
    <div v-if="price">💰 {{ price }} USDT</div>
    <div v-else>Подключение к Binance WebSocket...</div>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeUnmount } from 'vue'

const price = ref(null)
let socket = null
const isConnected = ref(false)

onMounted(() => {
  socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')
  socket.onopen = () => {
    isConnected.value = true
  }

  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    price.value = parseFloat(data.p).toFixed(2)
  }

  socket.onerror = (err) => {
    console.error('WebSocket error:', err)
    isConnected.value = false
  }
  socket.onclose = () => {
    isConnected.value = false
  }
})

onBeforeUnmount(() => {
  if (socket) {
    socket.close()
  }
})
</script>
