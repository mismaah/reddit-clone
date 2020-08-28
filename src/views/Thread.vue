<template>
    <div>
        <p class="sub">r/{{subName}}</p>
        <div class="divider"></div>
        <p v-if="error">Thread does not exist.</p>
        <Listing v-if="listing" :listing="listing" :parentSub="subName">{{listing.title}}</Listing>
        <div class="box" v-if="listing">
            <p>{{listing.threadBody}}</p>
        </div>
        <div class="threadUtil" v-if="listing">
            <p v-if="collapseAll" class="utilBtn" @click="collapseComments()" >expand all comments</p>
            <p v-else class="utilBtn" @click="collapseComments()" >collapse all comments</p>
        </div>
        <div v-if="this.$store.getters.isLoggedIn && listing">
            <textarea v-model="replyMsg" rows="3" placeholder="Reply to thread"></textarea>
            <br>
            <button @click="reply">Submit</button>
        </div>
        <Comment v-for="comment in comments" :comment="comment" :collapseAll="collapseAll" :key="comment.msg"></Comment>
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
            replyMsg: "",
            upvoted: false,
            downvoted: false,
            collapseAll: false,
            comments: [
                {
                    user: "TestUser",
                    msg: "Yes",
                    points: 5,
                    children: [
                        {
                            user: "UserTest",
                            msg: "No",
                            points: 1,
                            children: [
                                {
                                    user: "AnotherTest",
                                    msg: "wedfbiskd",
                                    points: -1,
                                    children: []
                                }
                            ]
                        },
                        {
                            user: "mm",
                            msg: "pp",
                            points: 0,
                            children: []
                        }
                    ]
                }
            ]
        }),
        methods: {
            reply () {
                if (!this.replyMsg || this.replyMsg.trim() == "") return
                this.comments.unshift({
                    user: this.$store.getters.getCurrentUser,
                    msg: this.replyMsg.trim(),
                    children: [],
                    points: 0,
                })
                this.replyMsg = ""
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
textarea {
  font-family: inherit;
  font-size: 15px;
  width: 80%;
}
</style>