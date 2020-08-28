<template>
    <div id="app">
        <div id="nav">
            <span class="navleft plain">
                <router-link to="/">HOME</router-link>
            </span>
            <span v-if="isLoggedIn" class="navright">
                <a class="user">{{username}}</a> - 
                <a class="logoutBtn" @click="logout()">LOGOUT</a>
            </span>
            <span v-else class="navright plain">
                <router-link to="/login">LOGIN</router-link> - 
                <router-link to="/register">REGISTER</router-link>
            </span>
        </div>
        <router-view :key="$route.fullPath" id="routerview"/>
    </div>
</template>

<script>
    export default {
        methods: {
            logout: function () {
                this.$store.dispatch('logout')
                    .then(() => {
                        this.$router.push('/')
                    })
            },
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
    justify-content: space-between;
}
.navleft {
    padding-left: 10px;
}
.plain a, .plain a:hover, .plain a:focus, .plain a:active {
    text-decoration: none;
    color: inherit;
}
.navright {
    display: flex;
    padding-right: 10px;
    white-space: pre;
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
.logoutBtn {
    cursor: pointer;
}
</style>
