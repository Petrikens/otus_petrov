import { createRouter, createWebHistory } from 'vue-router'

import Home from '../pages/Home.vue'
import ProductDetails from '../pages/ProductDetails.vue'
import AddProduct from '../pages/AddProduct.vue'
import Cart from '../pages/Cart.vue'
import Checkout from '../pages/Checkout.vue'
import Login from '../pages/Login.vue'

const routes = [
    { path: '/', component: Home },
    { path: '/product/:id', component: ProductDetails },
    { path: '/add-product', component: AddProduct },
    { path: '/cart', component: Cart },
    { path: '/checkout', component: Checkout },
    {
        path: '/login',
        component: Login,
        meta: { public: true }
    },
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

router.beforeEach((to, from, next) => {
    const isAuth = localStorage.getItem('isAuth') === 'true'
    const isPublic = to.meta.public === true

    if (!isAuth && !isPublic) {
        return next('/login')
    }

    if (isAuth && to.path === '/login') {
        return next('/')
    }

    next()
})

export default router
