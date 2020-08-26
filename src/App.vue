<template>
    <div id="app">
        <div id="nav">
            <router-link to="/">Home</router-link> | <router-link to="/sub">Sub</router-link> | <router-link to="/thread">Thread</router-link>
        </div>
        <router-view/>
    </div>
</template>

<style>
#app {
  font-family: "Lato", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav a {
  font-weight: bold;
  color: #2c3e50;
}
#nav a.router-link-exact-active {
  color: #42b983;
}
.user {
    font-size: 11px;
    font-weight: bold;
    vertical-align: middle;
    color: darkcyan;
}
</style>
