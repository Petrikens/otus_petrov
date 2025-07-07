import { createRouter, createWebHistory } from 'vue-router'
import AppHome from '@/pages/AppHome.vue' // главный компонент загружается сразу
import { ROUTES } from '@/constants.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        { path: ROUTES.HOME, component: AppHome },
        {
            path: ROUTES.PRODUCT_DETAILS,
            component: () => import('@/pages/AppProductDetails.vue')
        },
        {
            path: ROUTES.ADD_PRODUCT,
            component: () => import('@/pages/AppAddProduct.vue')
        },
        {
            path: ROUTES.CART,
            component: () => import('@/pages/AppCart.vue')
        },
        {
            path: ROUTES.CHECKOUT,
            component: () => import('@/pages/AppCheckout.vue')
        },
        {
            path: ROUTES.LOGIN,
            component: () => import('@/pages/AppLogin.vue'),
            meta: { public: true }
        },
        {
            path: ROUTES.COUNTRIES,
            component: () => import('@/pages/AppCountries.vue'),
        }
    ]
})

router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem('isAuth') === 'true'
    const isPublic = to.meta.public === true

    if (!isAuth && !isPublic) {
        return next(ROUTES.LOGIN)
    }

    if (isAuth && to.path === ROUTES.LOGIN) {
        return next(ROUTES.HOME)
    }

    next()
})

export default router
