<template>
    <div id="app">
        <div id="nav">
            <router-link to="/" class="navleft plain">
                <img class="navLogo" src="@/assets/logo.png" alt="">
                <span class="name">{{name}}</span> - 
                <span>HOME</span>
            </router-link>
            
            <span v-if="isLoggedIn" class="navright">
                <a class="user" @click="goToUser()">{{username}}</a> - 
                <a class="navBtn" @click="$router.push('/preferences')">PREFERENCES</a> - 
                <a class="navBtn" @click="logout()">LOGOUT</a>
                <nav-search></nav-search>
            </span>
            <span v-else class="navright plain">
                <router-link to="/login">LOGIN</router-link> - 
                <router-link to="/register">REGISTER</router-link>
                <nav-search></nav-search>
            </span>
        </div>
        <router-view :key="$route.fullPath" id="routerview"/>
    </div>
</template>

<script>
    import {constants} from './constants.js'
    import NavSearch from './components/NavSearch.vue'
    export default {
        components: {
            NavSearch
        },
        data: () => ({
            name: constants.APP_NAME
        }),
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                if (this.$route.meta.requiresAuth) this.$router.push("/login")
            },
            goToUser(){
                this.$router.push(`/u/${this.username}`)
            }
        },
        computed : {
            isLoggedIn : function(){return this.$store.getters.isLoggedIn},
            username: function(){return this.$store.getters.getCurrentUser}
        },
    }
</script>

<style>
body {
    margin: 0px;
}
#app {
    font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
}
#routerview {
    margin-top: 15px;
    margin-left: 8px;
    margin-right: 8px;
}
#nav {
    background-color:rgb(202, 202, 202);
    margin: 0px;
    font-size: 12px;
    padding: 3px;
    font-weight: 500;
    display: flex;
    height: 20px;
    justify-content: space-between;
    align-items: center;
}
.navleft {
    padding-left: 10px;
    display: flex;
    align-items: center;
    white-space: pre;
    text-decoration: none;
    color: inherit;
}
.plain a, .plain a:hover, .plain a:focus, .plain a:active {
    text-decoration: none;
    color: inherit;
}
.navright {
    display: flex;
    padding-right: 10px;
    white-space: pre;
    align-items: center;
}
.user {
    font-size: 11px;
    font-weight: bold;
    vertical-align: middle;
    color: darkcyan;
    cursor: pointer;
}
.divider {
    border: 0.5px solid #000000;
    margin-bottom: 20px;
}
.title {
    text-align: left;
    margin-top: 0px;
}
.voteArea {
    display: flex;
    flex-direction: column;
    font-size: 5px;
}
.textArea {
    display: flex;
    flex-direction: column;
}
.voteArrow {
    font-size: 20px;
    cursor: pointer;
    user-select: none;
}
.subName {
    font-size: 11px;
    font-weight: bold;
    vertical-align: middle;
    color: darkslateblue;
    cursor: pointer;
}
.navBtn {
    cursor: pointer;
}
.navLogo {
    width: 25px;
    height: 25px;
}
.name {
    color: red;
    font-size: 16px;
    line-height: 1px;
    margin-top: -2px;
}
</style>
