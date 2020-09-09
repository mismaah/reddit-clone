<template>
    <div>
        <div class="centered">
            <input placeholder="Enter sub name" v-model="subname" type="text">
            <button @click="createSub()">Create sub</button>
        </div>
        <p class="error" v-if="error">{{error}}</p>
    </div>
</template>

<script>
    export default {
        name: "CreateSub",
        data: () => ({
            subname: "",
            error: null
        }),
        methods: {
            createSub() {
                this.error = null
                if (this.subname == "") return
                let payload = {
                    subName: this.subname,
                    token: this.$store.getters.getToken
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/createsub`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload)
                })
                    .then(resp => {
                        if (resp.ok) {
                            this.$router.push(`/r/${this.subname}`)
                        } else {
                            if (resp.status == 401){
                                setTimeout(function() {
                                    this.$store.dispatch('logout', resp)
                                    this.$router.push("/login")
                                }.bind(this), 2000)
                            }
                            return resp.text()
                                .then(result => {
                                    this.error = result
                                })
                        }
                    })
                    
            }
        }
    }
</script>

<style scoped>
.centered {
    padding: 20px;
    padding-bottom: 10px;
    display: flex;
    justify-content: center;
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