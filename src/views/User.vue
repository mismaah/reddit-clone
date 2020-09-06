<template>
    <div>
        <span class="header">
            <p class="title">u/{{username}}</p>
        </span>
        <div class="divider"></div>
        <span class="tabs">
            <p class="tab"><a @click="tab='posts'" :style="{'text-decoration': isOn('posts')}">posts</a></p>
            <p class="tab"><a @click="tab='comments'" :style="{'text-decoration': isOn('comments')}">comments</a></p>
        </span>
        <div v-if="tab=='posts'" class="listings">
            <div class="sortBy">
                sort by
                <select v-model="sortPostsBy">
                    <option>top</option>
                    <option>bottom</option>
                    <option>new</option>
                    <option>old</option>
                </select>
            </div>
            <div>
                <p v-if="postsError">{{postsError}}</p>
                <Listing v-for="listing in listings" :listing="listing" :key="listing.ID"></Listing>
            </div>
        </div>
        <div v-if="tab=='comments'" class="comments">
            <div class="sortBy">
                sort by
                <select v-model="sortCommentsBy">
                    <option>top</option>
                    <option>bottom</option>
                    <option>new</option>
                    <option>old</option>
                </select>
            </div>
            <div>
                <p v-if="commentsError">{{commentsError}}</p>
                <Comment v-for="comment in comments" :comment="comment" :key="comment.ID"></Comment>
            </div>
        </div>
    </div>
</template>

<script>
    import Listing from '@/components/Listing.vue'
    import Comment from '@/components/Comment.vue'
    export default {
        name: 'User',
        props: {
            username: String,
        },
        components: {
            Listing,
            Comment
        },
        data: () => ({
            postsError: null,
            commentsError: null,
            tab: "posts",
            listings: [],
            comments: [],
            sortPostsBy: "top",
            sortCommentsBy: "top",
        }),
        methods: {
            getPosts () {
                let data = {
                    kind: "user",
                    id: this.username,
                    currentUser: this.$store.getters.getCurrentUser,
                    sortBy: this.sortPostsBy
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
                                    this.postsError = error
                                })
                        } else {
                            return resp.json()
                                .then(result => {
                                    this.listings = result
                                })
                        }
                    })
            },
            getComments () {
                let data = {
                    kind: "user",
                    id: this.username,
                    currentUser: this.$store.getters.getCurrentUser,
                    sortBy: this.sortCommentsBy
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
                                    this.commentsError = error
                                })
                        } else {
                            return resp.json()
                                .then(comments => {
                                    if (comments) this.comments = comments
                                })
                        }
                    })
            },
            isOn (tab) {
                if (this.tab == tab) {
                    return 'underline'
                }
                return 'none'
            }
        },
        mounted () {
            this.getPosts()
            this.getComments()
        },
        watch: {
            sortPostsBy: function(){
                this.getPosts()
            },
            sortCommentsBy: function(){
                this.comments = []
                this.getComments()
            }
        }
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
}
.divider {
    margin-bottom: 10px;
}
.tabs {
    margin-left: 50px;
    margin-bottom: 20px;
    display: flex;
}
.tab {
    display: flex;
    text-align: end;
    margin-bottom: 0px;
    margin-top: 0px;
    margin-right: 20px;
    cursor: pointer;
    align-self: flex-end;
}
.tab:hover {
    text-decoration: underline;
}
a, a:hover, a:focus, a:active {
    text-decoration: none;
    color: inherit;
}
.listings {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.comments {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.sortBy {
    margin-left: 50px;
    margin-bottom: 20px;
    font-size: 14px;
}
</style>