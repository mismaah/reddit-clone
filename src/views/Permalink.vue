<template>
    <div>
        <p class="sub" @click="goToSub()">r/{{subName}}</p>
        <div class="divider"></div>
        <p v-if="error">{{error}}</p>
        <Listing v-if="listing" :listing="listing" :parentSub="subName">{{listing.title}}</Listing>
        <div class="threadUtil">
            <p class="utilBtn" @click="goToThread()">view full context</p>
        </div>
        <div class="comments">
            <div class="sortBy">
                sort by
                <select v-model="sortBy">
                    <option>top</option>
                    <option>bottom</option>
                    <option>new</option>
                    <option>old</option>
                </select>
            </div>
            <Comment v-if="comment" :comment="comment" :key="sortBy"></Comment>
        </div>
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
            sortBy: "top",
        }),
        methods: {
            goToThread(){
                this.$router.push({name: 'Thread', params: {subName: this.listing.subName, threadID: this.listing.ID, url: this.listing.url}})
            },
            goToSub () {
                this.$router.push(`/r/${this.subName}`)
            },
            getListingData () {
                let data = {
                    kind: "thread",
                    id: this.comment.threadID,
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
                                .then(resp => {
                                    this.listing = resp
                                    this.subName = resp.subName
                                })
                        }
                    })
            },
            getCommentData () {
                let data = {
                    kind: "comment",
                    id: this.commentID,
                    currentUser: this.$store.getters.getCurrentUser,
                    sortBy: this.sortBy
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
                                    this.error = error
                                })
                        } else {
                            return resp.json()
                                .then(resp => {
                                    this.comment = resp
                                    this.getListingData()
                                })
                        }
                    })
            }
        },
        mounted () {
            this.getCommentData()
        },
        watch: {
            sortBy: function(){
                this.comment = null
                this.getCommentData()
            }
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