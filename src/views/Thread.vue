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
        <Comment v-for="comment in comments" :comment="comment" :collapseAll="collapseAll" :key="comment.body"></Comment>
    </div>
</template>

<script>
    import {constants} from '@/constants.js'
    import Comment from '@/components/Comment.vue'
    import Listing from '@/components/Listing.vue'
    export default {
        name: 'Thread',
        props: {
            subName: String,
            threadID: String
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
            upvoted: false,
            downvoted: false,
            collapseAll: false,
            comments: [
                {
                    username: "TestUser",
                    body: "Yes",
                    points: 5,
                    children: [
                        {
                            username: "UserTest",
                            body: "No",
                            points: 1,
                            children: [
                                {
                                    username: "AnotherTest",
                                    body: "wedfbiskd",
                                    points: -1,
                                    children: []
                                }
                            ]
                        },
                        {
                            username: "mm",
                            body: "pp",
                            points: 0,
                            children: []
                        }
                    ]
                }
            ]
        }),
        methods: {
            reply () {
                this.errorReply = null
                if (!this.body || this.body.trim() == "") return
                let comment = {
                    body: this.body,
                    username: this.$store.getters.getCurrentUser,
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
                                .then(comment => {
                                    this.comments.unshift(comment)
                                    this.body = ""
                                })
                        } else {
                            return resp.text()
                                .then(result => {
                                    this.errorReply = result
                                })
                        }
                    })
            },
            upvote () {
                if (this.upvoted) this.upvoted = false
                else {
                    this.upvoted = true
                    this.downvoted = false
                }
            },
            downvote () {
                if (this.downvoted) this.downvoted = false
                else {
                    this.downvoted = true
                    this.upvoted = false
                }
            },
            collapseComments () {
                this.collapseAll = !this.collapseAll
            },
            goToSub () {
                this.$router.push(`/r/${this.subName}`)
            },
            getListingData () {
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getlistingdata/thread/${this.threadID}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
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
            }
        },
        computed: {
            voteState: function () {
                if (this.downvoted && !this.upvoted) return 1
                if (this.upvoted && !this.downvoted) return 2
                else return 0
            },
            points: function () {
                var point = 2042
                if (this.voteState == 1) return point - 1
                if (this.voteState == 2) return point + 1
                else return point
            },
            upArrowColor: function () {
                if (this.upvoted) return constants.COLOR_UPVOTE
                else return "black"
            },
            downArrowColor: function () {
                if (this.downvoted) return constants.COLOR_DOWNVOTE
                else return "black"
            },
        },
        mounted () {
            this.getListingData()
        }
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
}
.voteArea {
    margin-right: 10px;
    min-width: 50px;
}
.points {
    font-size: 15px;
    vertical-align: middle;
    justify-self: center;
    margin: 0px;
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
.voteArrow {
    margin: -5px;
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
textarea {
  font-family: inherit;
  font-size: 15px;
  width: 80%;
}
</style>