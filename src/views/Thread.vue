<template>
    <div>
        <p class="sub" @click="goToSub()">r/{{subName}}</p>
        <div class="divider"></div>
        <p v-if="error">Thread does not exist.</p>
        <Listing v-if="listing" :listing="listing" :parentSub="subName">{{listing.title}}</Listing>
        <div class="box" v-if="listing && listing.threadBody">
            <p>{{listing.threadBody}}</p>
        </div>
        <div class="threadUtil" v-if="listing">
            <p v-if="collapseAll" class="utilBtn" @click="collapseComments()" >expand all comments</p>
            <p v-else class="utilBtn" @click="collapseComments()" >collapse all comments</p>
        </div>
        <div v-if="this.$store.getters.isLoggedIn && listing">
            <textarea v-model="body" rows="3" placeholder="Reply to thread"></textarea>
            <br>
            <button @click="reply">Submit</button>
            <p class="error" v-if="errorReply">{{errorReply}}</p>
        </div>
        <div class="comments">
            <div class="sortBy">
                sort by
                <select v-model="preferences.commentSorting" @change="getCommentData()">
                    <option>top</option>
                    <option>bottom</option>
                    <option>new</option>
                    <option>old</option>
                </select>
            </div>
            <p v-if="errorComments">{{errorComments}}</p>
            <Comment v-for="comment in comments" :comment="comment" :collapseAll="collapseAll" :key="comment.ID"></Comment>
        </div>
    </div>
</template>

<script>
    import Comment from '@/components/Comment.vue'
    import Listing from '@/components/Listing.vue'
    export default {
        name: 'Thread',
        props: {
            subName: String,
            threadID: String,
            url: String,
        },
        components: {
            Comment,
            Listing
        },
        data: () => ({
            listing: null,
            error: null,
            body: "",
            errorReply: null,
            errorComments: null,
            collapseAll: false,
            comments: [],
            preferences: {
                postSorting: "hot",
                commentSorting: "top"
            }
        }),
        methods: {
            reply () {
                this.errorReply = null
                if (!this.body || this.body.trim() == "") return
                let comment = {
                    body: this.body,
                    token: this.$store.getters.getToken,
                    threadID: this.threadID,
                    subName: this.subName,
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/createcomment`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(comment)
                })
                    .then(resp => {
                        if (resp.ok) {
                            return resp.json()
                                .then(resp => {
                                    this.comments.unshift(resp.comment)
                                    this.body = ""
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
            collapseComments () {
                this.collapseAll = !this.collapseAll
            },
            goToSub () {
                this.$router.push(`/r/${this.subName}`)
            },
            getListingData () {
                let data = {
                    kind: "thread",
                    id: this.threadID,
                    currentUser: this.$store.getters.getCurrentUser
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getlistingdata`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(data)
                })
                    .then(resp => {
                        if (!resp.ok) {
                            return resp.text()
                                .then(error => {
                                    this.error = error
                                })
                        } else {
                            return resp.json()
                                .then(result => {
                                    this.listing = result
                                })
                        }
                    })
            },
            getCommentData () {
                this.comments = []
                let data = {
                    kind: "thread",
                    id: this.threadID,
                    currentUser: this.$store.getters.getCurrentUser,
                    sortBy: this.preferences.commentSorting
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getcommentdata`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(data)
                })
                    .then(resp => {
                        if (!resp.ok) {
                            return resp.text()
                                .then(error => {
                                    this.errorComments = error
                                })
                        } else {
                            return resp.json()
                                .then(comments => {
                                    if (comments) this.comments = comments
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
            this.getListingData()
            this.getCommentData()
        },
    }
</script>

<style scoped>
.sub {
    font-size: large;
    font-weight: bold;
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 50px;
    cursor: pointer;
}
.box {
    border-radius: 20px;
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
    white-space: pre-wrap;
}
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    padding-bottom: 5px
}
.textArea {
    align-items: flex-start;
}
.threadUtil {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-left: 20px;
}
.utilBtn {
    cursor: pointer;
    margin: 0px;
    font-size: 12px;
}
.utilBtn:hover {
    text-decoration: underline;
}
.error {
    margin: 0px;
    font-size: 12px;
    color: red;
}
.comments {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.sortBy {
    margin-left: 50px;
    margin-bottom: 10px;
    font-size: 14px;
}
textarea {
  font-family: inherit;
  font-size: 15px;
  width: 80%;
}
</style>