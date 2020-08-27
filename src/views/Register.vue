<template>
    <div class="centered">
        <input class="item" placeholder="Enter username" v-model="username" type="text">
        <input class="item" placeholder="Enter password" v-model="password" type="password">
        <input class="item" placeholder="Re-enter password" v-model="passwordRe" type="password">
        <input class="item" placeholder="Enter email address" v-model="email" type="text">
        <span class="btns">
            <button @click="register()" class="item">Register</button>
            <button @click="clearErrors();clearFields()" class="item">Clear</button>
        </span>
        <p class="error" v-for="error in errors" :key="error">{{error}}</p>
    </div>
</template>

<script>
    import {constants} from '@/constants.js'
    export default {
        name: "Register",
        data: () => ({
            username: "",
            password: "",
            passwordRe: "",
            email: "",
            errors: []
        }),
        methods: {
            register () {
                this.clearErrors()
                if (!this.validate()) return
                this.clearFields()
                var user = {
                    Username: this.username,
                    Password: this.password,
                    Email: this.email
                }
                console.log(process.env.VUE_APP_BASE_URL)
                fetch(`${process.env.VUE_APP_BASE_URL}/api/register`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(user)
                })
            },
            validate () {
                var valid = true
                if (this.username.length <= constants.VALIDATIONS.USERNAME_MIN) {
                    valid = false
                    this.errors.push(`Username should be more than ${constants.VALIDATIONS.USERNAME_MIN} characters.`)
                }
                if (this.username.length >= constants.VALIDATIONS.USERNAME_MAX) {
                    valid = false
                    this.errors.push(`Username should be less than ${constants.VALIDATIONS.USERNAME_MIN} characters.`)
                }
                if (this.password.length <= constants.VALIDATIONS.PASSWORD_MIN) {
                    valid = false
                    this.errors.push(`Password should be more than ${constants.VALIDATIONS.PASSWORD_MIN} characters.`)
                }
                if (!(this.password == this.passwordRe)) {
                    valid = false
                    this.errors.push("Passwords do not match.")
                }
                if (!constants.VALIDATIONS.EMAIL.test(this.email.toLowerCase())) {
                    valid = false
                    this.errors.push("Invalid email.")
                }
                return valid
            },
            clearFields () {
                this.username = "",
                this.password = "",
                this.passwordRe = "",
                this.email = ""
            },
            clearErrors () {
                this.errors = []
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