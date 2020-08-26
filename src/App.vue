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
.divider {
    border: 0.5px solid #000000;
    margin-bottom: 20px;
}
.title {
    text-align: left;
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
