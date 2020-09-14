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
import User from '../views/User.vue'
import Preferences from '../views/Preferences.vue'

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
    {
        path: '/u/:username',
        name: 'User',
        component: User,
        props: true
    },
    {
        path: '/preferences',
        name: 'Preferences',
        component: Preferences,
        meta: { 
            requiresAuth: true
        }
    }
]

const router = new VueRouter({
    mode: 'history',
    routes: routes
})

router.beforeEach((to, from, next) => {
    if (store.getters.isLoggedIn) {
        fetch(`${process.env.VUE_APP_BASE_URL}/api/validate`, {
            method: 'post',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(store.getters.getToken)
        })
            .then(resp => {
                if (resp.ok) {
                    return resp.json()
                        .then(resp => {
                            store.dispatch('renewToken', {token: resp.token, username: resp.username})
                        })
                } else {
                    if (resp.status == 401){
                        store.dispatch('logout', resp)
                    }
                }
            })
    }
    if(from.name != "Login" && from.name != "Register") {
        localStorage.setItem('prevRoute', from.fullPath)
    }
    if(to.name == "Login" || to.name == "Register") {
        if (store.getters.isLoggedIn) {
            next('/')
        }
    }
    if(to.matched.some(record => record.meta.requiresAuth)) {
      if (store.getters.isLoggedIn) {
        next()
        return
      }
      next('/login') 
    } else {
      next() 
    }
})

export default router
