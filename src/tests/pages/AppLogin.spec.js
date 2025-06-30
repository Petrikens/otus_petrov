import { describe, it, expect, vi, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import AppLogin from '@/pages/AppLogin.vue'
import { ROUTES } from '@/constants'

const push = vi.fn()

vi.mock('vue-router', () => ({
    useRouter: () => ({
        push
    })
}))

const setItemSpy = vi.spyOn(window.localStorage.__proto__, 'setItem')

describe('AppLogin.vue', () => {
    beforeEach(() => {
        setItemSpy.mockClear()
        push.mockClear()
    })

    it('монтируется без ошибок', () => {
        const wrapper = mount(AppLogin)
        expect(wrapper.exists()).toBe(true)
    })

    it('успешный логин вызывает localStorage и router.push', async () => {
        const wrapper = mount(AppLogin)

        const usernameInput = wrapper.get('[data-testid="login-username"]')
        const passwordInput = wrapper.get('[data-testid="login-password"]')
        const submitButton = wrapper.get('[data-testid="login-submit"]')

        await usernameInput.setValue('testuser')
        await passwordInput.setValue('123456')
        await submitButton.trigger('submit')

        expect(setItemSpy).toHaveBeenCalledWith('isAuth', 'true')
        expect(push).toHaveBeenCalledWith(ROUTES.HOME)
    })
    it('не вызывает login, если поля не заполнены', async () => {
        const wrapper = mount(AppLogin)

        expect(wrapper.exists()).toBe(true)

        const submitButton = wrapper.get('[data-testid="login-submit"]')

        await submitButton.trigger('submit')

        expect(setItemSpy).not.toHaveBeenCalled()

        expect(push).not.toHaveBeenCalled()
    })
})
