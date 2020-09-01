<template>
    <div>
        <p class="sub" @click="goToSub()">r/{{subName}}</p>
        <div class="divider"></div>
        <p v-if="error">{{error}}</p>
        <Listing v-if="listing" :listing="listing" :parentSub="subName">{{listing.title}}</Listing>
        <div class="threadUtil">
            <p class="utilBtn" @click="goToThread()">view full context</p>
        </div>
        <Comment v-if="comment" :comment="comment"></Comment>
    </div>
</template>

<script>
    import Listing from '@/components/Listing.vue'
    import Comment from '@/components/Comment.vue'
    export default {
        name: 'Thread',
        props: {
            commentID: String,
        },
        components: {
            Listing,
            Comment,
        },
        data: () => ({
            error: null,
            subName: null,
            listing: null,
            comment: null,
        }),
        methods: {
            goToThread(){
                this.$router.push({name: 'Thread', params: {subName: this.listing.subName, threadID: this.listing.ID, url: this.listing.url}})
            },
            goToSub () {
                this.$router.push(`/r/${this.subName}`)
            },
            getCommentData () {
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getcommentdata/comment/${this.commentID}`, {
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
                                .then(resp => {
                                    this.comment = resp.comment
                                    this.listing = resp.listing
                                    this.subName = resp.listing.subName
                                })
                        }
                    })
            }
        },
        mounted () {
            this.getCommentData()
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
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    padding-bottom: 5px
}
.error {
    margin: 0px;
    font-size: 12px;
    color: red;
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