import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '../store/store.js'
import Thread from '../views/Thread.vue'
import Sub from '../views/Sub.vue'
import Home from '../views/Home.vue'
import CreateSub from '../views/CreateSub.vue'
import CreateThread from '../views/CreateThread.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import Permalink from '../views/Permalink.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/login',
        name: 'Login',
        component: Login
    },
    {
        path: '/register',
        name: 'Register',
        component: Register
    },
    {
        path: '/r/:subName',
        component: Sub,
        props: true,
    },
    {
        path: '/r/:subName/:threadID/:url',
        name: 'Thread',
        component: Thread,
        props: true,
    },
    {
        path: '/createsub',
        name: 'Create Sub',
        component: CreateSub,
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/r/:subName/createthread',
        name: 'Create Thread',
        component: CreateThread,
        props: true,
        meta: { 
            requiresAuth: true
        }
    },
    {
        path: '/permalink/:commentID',
        name: 'Permalink',
        component: Permalink,
        props: true,
    },
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    localStorage.setItem('prevRoute', from.name)
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/') 
    } else {
      next() 
    }
})

export default router
