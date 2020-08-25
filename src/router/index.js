import Vue from 'vue'
import VueRouter from 'vue-router'
import Thread from '../views/Thread.vue'
import Sub from '../views/Sub.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Sub',
        component: Sub
    },
    {
        path: '/thread',
        name: 'Thread',
        component: Thread
    }
]

const router = new VueRouter({
    routes
})

export default router
