<template>
    <div class="commentBox">
        <div>
            <i v-if="!collapsed" @click="collapse()" title="Hide child comments" class="material-icons collapseBtn">remove</i>
            <i v-else @click="collapse()" title="Show child comments" class="material-icons collapseBtn">add</i>
            <span class="user">{{comment.user}} </span>
            <span class="points"> {{points}} <span v-if="points == 1">point</span><span v-else>points</span></span>
        </div>
        <div v-show="!collapsed">
            <div class="contents">
                <span class="voteArea">
                    <i @click="upvote()" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
                    <i @click="downvote()" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
                </span>
                <span class="textArea">
                    <span class="msg">{{comment.msg}}</span>
                    <i @click="replyBtn()" title="Reply" class="material-icons replyBtn">reply</i>
                </span>
            </div>
            
        </div>
        <div v-show="replyTextBox" class="replyBox">
            <input ref="replyInput" @keypress.enter="submitReply()" @keydown.esc="replyTextBox = null" v-model="replyMsg" placeholder="Reply to comment">
            <i @click="submitReply()" title="Submit" class="material-icons replyCommands">send</i>
            <i @click="replyTextBox = null" title="Cancel" class="material-icons replyCommands">cancel</i>
        </div>
        <p class="childCount" v-show="collapsed && totalChildCount > 0">{{totalChildCount}} child <span v-if="totalChildCount == 1">comment</span><span v-else>comments</span></p>
        <Comment v-show="!collapsed" v-for="comment in children" :comment="comment" :key="comment.msg"></Comment>
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
    },
    data: () => ({
        children: [],
        replyTextBox: null,
        replyMsg: "",
        collapsed: false,
        totalChildCount: 0,
        upvoted: false,
        downvoted: false,
    }),
    methods: {
        replyBtn () {
            this.replyTextBox = true
            this.$nextTick(() => {
                this.$refs.replyInput.focus();
            })
        },
        submitReply () {
            if (!this.replyMsg || this.replyMsg.trim() == "") return
            this.children.unshift({
                user: "currentUser",
                msg: this.replyMsg.trim(),
                children: [],
                points: 0,
            })
            this.replyMsg = ""
            this.replyTextBox = null
        },
        countChildComments (children) {
            var total = (children.length > 0) ? children.length : 0
            if (children.length > 0) {
                for (var i of children) {
                    total += this.countChildComments(i.children)
                }
            }
            return total
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
        collapse () {
            this.collapsed = !this.collapsed
        }
    },
    mounted () {
        this.children = this.$props.comment.children
    },
    computed: {
        voteState: function () {
            if (this.downvoted && !this.upvoted) return 1
            if (this.upvoted && !this.downvoted) return 2
            else return 0
        },
        points: function () {
            var point = this.$props.comment.points
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
        }
    },
    watch: {
        children: {
            handler: function () {
                this.totalChildCount = this.countChildComments(this.children)
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
.commentBox {
    border-left: 1px solid #bbb;
    border-bottom: 1px solid #bbb;;
    padding-left: 10px;
    padding-right: 10px;
    padding-top: 0px;
    margin-bottom: 1px;
    margin-left: 20px;
    text-align: left;
}
.points {
    font-size: 11px;
    vertical-align: middle;
}
.msg {
    font-size: 15px;
    margin-top: 0px;
    margin-bottom: 0px;
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
</style>