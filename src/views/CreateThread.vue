<template>
    <div>
        <span class="header">
            <p class="title" @click="goToSub()">r/{{subName}}</p>
        </span>
        <div class="divider"></div>
        <div class="centered">
            <input placeholder="Enter thread title" v-model="threadTitle" type="text">
            <textarea v-model="threadBody" rows="3" placeholder="Enter thread body"></textarea>
        </div>
        <button @click="createThread()">Create thread</button>
        <p class="error" v-if="error">{{error}}</p>
    </div>
</template>

<script>
    export default {
        name: "CreateSub",
        props: {
            subName: String,
            threadID: String,
        },
        data: () => ({
            threadTitle: "",
            threadBody: "",
            error: null
        }),
        methods: {
            createThread () {
                // if (this.threadTitle == "") return
                this.error = null
                let createThread = {
                    subName: this.subName,
                    token: this.$store.getters.getToken,
                    threadTitle: this.threadTitle,
                    threadBody: this.threadBody
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/createthread`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(createThread)
                })
                    .then(resp => {
                        if (resp.ok) {
                            return resp.json()
                                .then(resp => {
                                    this.vote("up", resp)
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
                                    this.error = result
                                })
                        }
                    })
            },
            vote (type, listing) {
                let vote = {
                    voteType: type,
                    kind: "thread",
                    kindID: listing.threadID,
                    token: this.$store.getters.getToken,
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/createvote`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(vote)
                })
                    .then(resp => {
                        if (resp.ok) {
                            this.$router.push({name: 'Thread', params: {subName: this.subName, threadID: listing.threadID, url: listing.url}})
                        } else {
                            if (resp.status == 401){
                                setTimeout(function() {
                                    this.$store.dispatch('logout', resp)
                                    this.$router.push("/login")
                                }.bind(this), 2000)
                            }
                            return resp.text()
                                .then(resp => {
                                    alert(resp)
                                })
                        }
                    })
            },
            goToSub () {
                this.$router.push(`/r/${this.subName}`)
            },
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
    cursor: pointer;
}
.centered {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 60%;
}
.error {
    margin: 0px;
    font-size: 12px;
    color: red;
}
textarea, input {
  font-family: inherit;
  font-size: 15px;
  margin-bottom: 10px;
}
</style>