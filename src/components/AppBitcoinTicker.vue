<template>
  <div>
    <h2>Текущий курс BTC/USDT:</h2>
    <div v-if="price">💰 {{ price }} USDT</div>
    <div v-else>Подключение к Binance WebSocket...</div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, onBeforeUnmount } from 'vue'
import type { BinanceTradeMessage } from '@/types'

const price = ref<string | null>(null)
const isConnected = ref(false)
let socket: WebSocket | null = null

onMounted(() => {
  socket = new WebSocket('wss://stream.binance.com:9443/ws/btcusdt@trade')

  socket.onopen = () => {
    isConnected.value = true
  }

  socket.onmessage = (event: MessageEvent) => {
    try {
      const data = JSON.parse(event.data) as BinanceTradeMessage
      price.value = parseFloat(data.p).toFixed(2)
    } catch (error) {
      console.error('Ошибка при парсинге сообщения:', error)
    }
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
