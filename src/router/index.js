import Vue from 'vue'
import VueRouter from 'vue-router'
import Thread from '../views/Thread.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Thread',
        component: Thread
    }
]

const router = new VueRouter({
    routes
})

export default router
