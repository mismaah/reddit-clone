<template>
    <div>
        <span class="header">
            <p class="title" @click="goToSub()">r/{{subName}}</p>
        </span>
        <div class="divider"></div>
        <div class="centered">
            <div class="radioBtns">
                <input type="radio" id="text" value="text" v-model="threadType">
                <label for="text">text</label>
                <input type="radio" id="link" value="link" v-model="threadType">
                <label for="link">link</label>
                <input type="radio" id="image" value="image" v-model="threadType">
                <label for="image">image</label>
            </div>
            <input placeholder="Enter thread title" v-model="threadTitle" type="text">
            <form enctype="multipart/form-data">
                <input v-if="threadType=='image'" accept="image/*" type="file" id="image-select" @change="fileHandler">
            </form>
            <input v-if="threadType=='link'" placeholder="Enter url" v-model="threadLink" type="text">
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
            threadType: "text",
            threadLink: "",
            error: null,
            file: null
        }),
        methods: {
            createThread () {
                this.error = null
                let formData = new FormData()
                formData.append("subName", this.subName)
                formData.append("token", this.$store.getters.getToken)
                formData.append("threadTitle", this.threadTitle)
                formData.append("threadBody", this.threadBody)
                formData.append("threadType", this.threadType)
                if (this.threadType == "link") formData.append("threadLink", this.threadLink)
                if (this.threadType == "image") formData.append("file", this.file)
                fetch(`${process.env.VUE_APP_BASE_URL}/api/createthread`, {
                    method: 'post',
                    body: formData
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
                            this.$router.push({name: 'Thread', params: {subName: this.subName, threadID: listing.threadID, url: listing.threadURL}})
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
            fileHandler(e) {
                let file = e.target.files[0]
                this.file = file
            }
        },
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
.radioBtns {
    display: flex;
    align-items:baseline;
}
textarea, input {
  font-family: inherit;
  font-size: 15px;
  margin-bottom: 10px;
}
</style>