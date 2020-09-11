<template>
    <div class="centered">
        <input class="item" placeholder="Enter username" v-model="username" type="text">
        <input class="item" placeholder="Enter password" v-model="password" type="password">
        <button @click="login()" class="item">Login</button>
        <p class="error" v-if="error">{{error}}</p>
    </div>
</template>

<script>
    export default {
        name: "Login",
        data: () => ({
            username: "",
            password: "",
            error: null,
        }),
        methods: {
            login () {
                this.error = null
                this.$store.dispatch("login", {
                    username: this.username,
                    password: this.password,
                    email: this.email
                })
                    .then(() => {
                        if (localStorage.getItem('prevRoute') == 'Register') this.$router.go(-2)
                        else this.$router.back()
                    })
                    .catch(error => {
                        this.error = error
                    })
            }
        }
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
.error {
    margin: 0px;
    font-size: 12px;
    color: red;
}
input {
    margin-right: 10px;
}
</style>