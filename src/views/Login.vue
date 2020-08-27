<template>
    <div class="centered">
        <input class="item" placeholder="Enter username" v-model="username" type="text">
        <input class="item" placeholder="Enter password" v-model="password" type="password">
        <button class="item">Login</button>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            username: "",
            password: "",
        })
    }
</script>

<style scoped>
.centered {
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
}
.item {
    margin: 5px;
}
input {
    margin-right: 10px;
}
</style>