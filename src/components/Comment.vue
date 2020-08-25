<template>
    <div class="commentBox">
        <p class="user">{{comment.user}}</p>
        <p class="msg">{{comment.msg}}</p>
        <i @click="replyTextBox = true" title="Reply" class="material-icons replyBtn">reply</i>
        <div v-if="replyTextBox">
            <input v-model="replyMsg" placeholder="Reply to comment">
            <button @click="reply()">Submit</button><button @click="replyTextBox = null">Cancel </button>
        </div>
        <Comment v-for="comment in children" :comment="comment" :key="comment.msg"></Comment>
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
            replyMsg: null
        }),
        methods: {
            reply () {
                this.children.unshift({
                    user: "currentUser",
                    msg: this.replyMsg,
                    children: []
                })
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
    margin-top: 0px;
    margin-bottom: 0px;
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
</style>