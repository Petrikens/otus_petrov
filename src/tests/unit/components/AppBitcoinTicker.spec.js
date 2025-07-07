import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppBitcoinTicker from '@/components/AppBitcoinTicker.vue'

describe('AppBitcoinTicker.vue', () => {
    let socketMock
    let socketInstance

    beforeEach(() => {
        socketInstance = {
            onmessage: null,
            onerror: null,
            close: vi.fn(),
        }

        socketMock = vi.fn(() => socketInstance)

        vi.stubGlobal('WebSocket', socketMock)
    })

    it('монтируется корректно и показывает начальный статус', () => {
        const wrapper = mount(AppBitcoinTicker)
        expect(wrapper.text()).toContain('Подключение к Binance WebSocket...')
    })

    it('обновляет цену при получении сообщения от WebSocket', async () => {
        const wrapper = mount(AppBitcoinTicker)

        const message = {
            data: JSON.stringify({ p: '28500.1234' })
        }

        socketInstance.onmessage(message)

        await wrapper.vm.$nextTick()

        expect(wrapper.text()).toContain('💰 28500.12 USDT')
    })

    it('закрывает сокет при размонтировании', () => {
        const wrapper = mount(AppBitcoinTicker)
        wrapper.unmount()

        expect(socketInstance.close).toHaveBeenCalled()
    })
})
