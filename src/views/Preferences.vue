<template>
    <div>
        <span class="header">
            <p class="title">preferences</p>
        </span>
        <div class="divider"></div>
        <div class="block">
            <div class="indent1">
                default sorting
                <div class="indent2">
                    threads
                    <select v-model="preferences.postSorting">
                        <option>hot</option>
                        <option>top</option>
                        <option>bottom</option>
                        <option>new</option>
                        <option>old</option>
                    </select>
                </div>
                <div class="indent2">
                    comments
                    <select v-model="preferences.commentSorting">
                        <option>top</option>
                        <option>bottom</option>
                        <option>new</option>
                        <option>old</option>
                    </select>
                </div>
                <button class="updateBtn" @click="update()">update</button>
                <p v-if="error" class="error">{{error}}</p>
                <p class="success" v-if="success">Preferences updated.</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Preferences",
        data: () => ({
            error: null,
            success: null,
            preferences: {
                postSorting: "hot",
                commentSorting: "top"
            }
        }),
        methods: {
            update () {
                this.success = null
                let data = {
                    token: this.$store.getters.getToken,
                    preferences: this.preferences
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/updatepref`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(resp => {
                        if (resp.ok) {
                            return resp.json()
                                .then(resp => {
                                    this.success = true
                                    localStorage.setItem('preferences', resp.preferences)
                                })
                        } else {
                            if (resp.status == 401){
                                setTimeout(function() {
                                    this.$store.dispatch('logout', resp)
                                    this.$router.push("/login")
                                }.bind(this), 2000)
                            }
                            return resp.text()
                                .then(result => {
                                    this.errorReply = result
                                })
                        }
                    })
            },
            getPreferences(){
                if (localStorage.getItem('preferences') === null) return
                this.preferences = JSON.parse(localStorage.getItem('preferences'))
            }
        },
        mounted () {
            this.getPreferences()
        }
    }
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}
.title {
    font-size: large;
    font-weight: bold;
    margin-bottom: 0px;
    margin-left: 50px;
}
.divider {
    margin-bottom: 10px;
}
.block {
    margin-left: 50px;
    margin-right: 50px;
    display: flex;
}
.indent1 {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.indent2 {
    margin-left: 20px;
}
.error {
    margin: 0px;
    font-size: 12px;
    color: red;
}
.success {
    margin: 0px;
    font-size: 12px;
    color: darkcyan;
}
.updateBtn {
    margin-top: 10px;
}
</style>