import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppCountries from '@/pages/AppCountries.vue'

const mockCountries = [
    { code: 'RU', name: 'Russia', emoji: '🇷🇺' },
    { code: 'US', name: 'United States', emoji: '🇺🇸' }
]

vi.mock('@vue/apollo-composable', () => {
    return {
        useQuery: vi.fn()
    }
})

import { useQuery } from '@vue/apollo-composable'

describe('AppCountries.vue', () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    it('отображает индикатор загрузки', () => {
        useQuery.mockReturnValue({
            result: {},
            loading: true,
            error: null
        })

        const wrapper = mount(AppCountries)
        expect(wrapper.text()).toContain('Загрузка...')
    })

    it('отображает ошибку', () => {
        useQuery.mockReturnValue({
            result: {},
            loading: false,
            error: { message: 'Ошибка сервера' }
        })

        const wrapper = mount(AppCountries)
        expect(wrapper.text()).toContain('Ошибка: Ошибка сервера')
    })

    it('отображает список стран', () => {
        useQuery.mockReturnValue({
            result: {
                countries: mockCountries
            },
            loading: false,
            error: null
        })

        const wrapper = mount(AppCountries)

        for (const country of mockCountries) {
            expect(wrapper.text()).toContain(country.name)
            expect(wrapper.text()).toContain(country.emoji)
            expect(wrapper.text()).toContain(country.code)
        }
    })
})
