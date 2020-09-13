<template>
    <div class="commentBox">
        <div class="top">
            <i v-if="!collapsed" @click="collapse()" title="Hide child comments" class="material-icons collapseBtn">remove</i>
            <i v-else @click="collapse()" title="Show child comments" class="material-icons collapseBtn">add</i>
            <span class="user" @click="goToUser()">{{comment.username}} </span>
            <span class="points" v-if="!inSearch"> {{points}} <span v-if="points == 1">point</span><span v-else>points</span></span>
            <span class="points" :title="dateFromUnixTime(comment.createdOn)">{{timeAgo(comment.createdOn)}}</span>
            <p class="utilBtn" @click="permalink()">permalink</p>
        </div>
        <div v-show="!collapsed">
            <div class="contents">
                <span v-if="this.$store.getters.isLoggedIn && !inSearch" class="voteArea">
                    <i @click="vote('up')" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
                    <i @click="vote('down')" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
                </span>
                <span class="textArea">
                    <span class="body" :style="`font-size: ${bodyFontSize}px;`">{{comment.body}}</span>
                    <i v-if="this.$store.getters.isLoggedIn && !inSearch" @click="replyBtn()" title="Reply" class="material-icons replyBtn">reply</i>
                </span>
            </div>
            
        </div>
        <div v-show="replyTextBox" class="replyBox">
            <input ref="replyInput" @keypress.enter="submitReply()" @keydown.esc="replyTextBox = null" v-model="body" placeholder="Reply to comment">
            <i @click="submitReply()" title="Submit" class="material-icons replyCommands">send</i>
            <i @click="replyTextBox = null" title="Cancel" class="material-icons replyCommands">cancel</i>
            <p class="error" v-if="errorReply">{{errorReply}}</p>
        </div>
        <p class="childCount" v-show="collapsed && totalChildCount > 0">{{totalChildCount}} child <span v-if="totalChildCount == 1">comment</span><span v-else>comments</span></p>
        <Comment v-show="!collapsed" v-for="comment in children" :comment="comment" :key="comment.ID"></Comment>
    </div>
</template>

<script>
    import {constants} from '@/constants.js'
    import Comment from '@/components/Comment.vue'
    export default {
        name: 'Comment',
        components: {
            Comment
        },
        props: {
            comment: Object,
            collapseAll: Boolean,
            inSearch: Boolean
        },
        data: () => ({
            children: [],
            replyTextBox: null,
            body: "",
            errorReply: null,
            collapsed: false,
            totalChildCount: 0,
            voteState: null,
            points: null,
            bodyFontSize: 15,
        }),
        methods: {
            vote (type) {
                let vote = {
                    voteType: type,
                    kind: "comment",
                    kindID: this.comment.ID,
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
                            return resp.json()
                                .then(resp => {
                                    this.voteState = resp.voteState
                                    this.points = resp.points
                                })
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
            permalink () {
                this.$router.push(`/permalink/${this.comment.ID}`)
            },
            replyBtn () {
                this.replyTextBox = true
                this.$nextTick(() => {
                    this.$refs.replyInput.focus();
                })
            },
            submitReply () {
                this.errorReply = null
                if (!this.body || this.body.trim() == "") return
                let comment = {
                    body: this.body,
                    token: this.$store.getters.getToken,
                    threadID: this.comment.threadID,
                    subName: this.comment.subName,
                    parent: this.comment.ID
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
                                    this.children.unshift(resp.comment)
                                    this.body = ""
                                    this.replyTextBox = null
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
            countChildComments (children) {
                var total = 0
                if (children) {
                    total = children.length
                    for (var i of children) {
                        total += this.countChildComments(i.children)
                    }
                }
                return total
            },
            collapse () {
                this.collapsed = !this.collapsed
            },
            goToUser(){
                this.$router.push(`/u/${this.comment.username}`)
            },
            dateFromUnixTime(unixTime) {
                let moment = require('moment')
                let datetime = new Date(unixTime * 1000)
                let formattedDateTime = moment(datetime).format("LLL")
                return formattedDateTime
            },
            timeAgo(unixTime) {
                let now = (Date.now() / 1000).toFixed(0)
                let diff = (now - unixTime)
                if (unixTime == 0) diff = 0
                let unit
                let plural = "s"
                if (diff < 60) unit = 'second'
                else if (diff < 60*60) {
                    unit = 'minute'
                    diff = diff / 60
                }
                else if (diff < 60*60*24) {
                    unit = 'hour'
                    diff = diff / 60 / 60
                }
                else if (diff < 60*60*24*30) {
                    unit = 'day'
                    diff = diff / 60 / 60 / 24
                }
                else if (diff < 60*60*24*365) {
                    unit = 'month'
                    diff = diff / 60 / 60 / 24 / 30
                }
                else {
                    unit = 'year'
                    diff = diff / 60 / 60 / 24 / 365
                }
                if (diff.toFixed(0) == 1) plural = ""
                return `${diff.toFixed(0)} ${unit}${plural} ago`
            }
        },
        mounted () {
            if (this.comment.children) this.children = this.comment.children
            this.points = this.comment.points
            this.voteState = this.comment.voteState
            if (this.inSearch) this.bodyFontSize = 12
        },
        computed: {
            upArrowColor: function () {
                if (this.voteState == "up") return constants.COLOR_UPVOTE
                else return "black"
            },
            downArrowColor: function () {
                if (this.voteState == "down") return constants.COLOR_DOWNVOTE
                else return "black"
            }
        },
        watch: {
            children: {
                handler: function () {
                    if (this.children) this.totalChildCount = this.countChildComments(this.children)
                },
                deep: true
            },
            collapseAll: {
                handler: function () {
                    if (this.collapseAll) this.collapsed = true
                    else this.collapsed = false
                }
            }
        },
    }
</script>

<style scoped>
.top {
    display: flex;
}
.commentBox {
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    margin-top: 5px;    
    margin-bottom: 1px;
    margin-left: 20px;
    text-align: left;
    min-width: 95%;
}
.points {
    font-size: 11px;
    vertical-align: middle;
    margin-left: 10px;
}
.body {
    margin-top: 0px;
    margin-bottom: 0px;
    white-space: pre-wrap;
}
.replyBtn {
    -moz-transform: scale(-1, -1);
    -webkit-transform: scale(-1, -1);
    -o-transform: scale(-1, -1);
    -ms-transform: scale(-1, -1);
    transform: scale(-1, -1);
    cursor: pointer;
    user-select: none;
    font-size: 20px;
}
.collapseBtn {
    font-size: 20px;
    cursor: pointer;
    vertical-align: middle;
    user-select: none;
}
.childCount {
    font-size: 13px;
    margin: 0px;
}
.contents {
    display: flex;
    flex-direction: row;
}
.textArea {
    align-items: flex-start;
}
.replyCommands {
    cursor: pointer;
    user-select: none;
}
.replyBox {
    display: flex;
}
.error {
    margin: 0px;
    font-size: 12px;
    color: red;
}
.utilBtn {
    cursor: pointer;
    margin: 0px;
    font-size: 11px;
    margin-left: 10px;
    vertical-align: middle;
}
.utilBtn:hover {
    text-decoration: underline;
}
</style>