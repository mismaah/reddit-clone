<template>
    <div id="app">
        <div id="nav">
            <span class="navleft">
                <router-link to="/">HOME</router-link> - 
                <router-link to="/sub">SUB</router-link> - 
                <router-link to="/thread">THREAD</router-link>
            </span>
            <span class="navright">
                <router-link to="/login">LOGIN</router-link> - 
                <router-link to="/register">REGISTER</router-link>
            </span>
        </div>
        <router-view id="routerview"/>
    </div>
</template>

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
#nav a, #nav a:hover, #nav a:focus, #nav a:active {
    text-decoration: none;
    color: inherit;
}
.navleft {
    padding-left: 10px;
}
.navright {
    padding-right: 10px;
}
.user {
    font-size: 11px;
    font-weight: bold;
    vertical-align: middle;
    color: darkcyan;
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
}
</style>
