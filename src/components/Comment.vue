<template>
    <div class="commentBox">
        <div>
            <i v-if="showChildren" @click="showChildren = false" title="Hide child comments" class="material-icons collapseBtn">remove</i>
            <i v-else @click="showChildren = true" title="Show child comments" class="material-icons collapseBtn">add</i>
            <span class="user">{{comment.user}}</span>
        </div>
        <p class="msg">{{comment.msg}}</p>
        <i @click="replyBtn()" title="Reply" class="material-icons replyBtn">reply</i>
        <div v-show="replyTextBox">
            <input ref="replyInput" v-model="replyMsg" placeholder="Reply to comment">
            <button @click="submitReply()">Submit</button><button @click="replyTextBox = null">Cancel </button>
        </div>
        <Comment v-show="showChildren" v-for="comment in children" :comment="comment" :key="comment.msg"></Comment>
        <!-- <hr class="divider"> -->
    </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
    export default {
        name: 'Comment',
        components: {
            Comment
        },
        props: {
            comment: Object
        },
        data: () => ({
            children: [],
            replyTextBox: null,
            replyMsg: "",
            showChildren: true
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
                    children: []
                })
                this.replyMsg = ""
                this.replyTextBox = null
            }
        },
        mounted () {
            this.children = this.$props.comment.children
        }
    }
</script>

<style>
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
.user {
    font-size: 13px;
    font-weight: bold;
    vertical-align: middle;
}
.msg {
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
}
.collapseBtn {
    font-size: 20px;
    cursor: pointer;
    vertical-align: middle;
}
</style>