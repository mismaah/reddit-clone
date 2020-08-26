import Vue from 'vue'
import VueRouter from 'vue-router'
import Thread from '../views/Thread.vue'
import Sub from '../views/Sub.vue'
import Home from '../views/Home.vue'
import CreateSub from '../views/CreateSub.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/sub',
        name: 'Sub',
        component: Sub
    },
    {
        path: '/thread',
        name: 'Thread',
        component: Thread
    },
    {
        path: '/createsub',
        name: 'CreateSub',
        component: CreateSub
    },
]

const router = new VueRouter({
    routes
})

export default router
