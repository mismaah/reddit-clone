<template>
    <div class="centered">
        <input class="item" placeholder="Enter username" v-model="username" type="text">
        <input class="item" placeholder="Enter password" v-model="password" type="password">
        <input class="item" placeholder="Re-enter password" v-model="passwordRe" type="password">
        <input class="item" placeholder="Enter email address" v-model="email" type="text">
        <button class="item">Register</button>
    </div>
</template>

<script>
export default {
    name: "Register",
    data: () => ({
        username: "",
        password: "",
        passwordRe: "",
        email: "",
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