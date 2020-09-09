<template>
    <div>
        <span class="header">
            <p class="title">r/</p>
            <p class="headerBtn" v-if="this.$store.getters.isLoggedIn"><router-link to="/createsub">create sub</router-link></p>
        </span>
        <div class="divider"></div>
        <p v-if="error">{{error}}</p>
        <div v-else class="homeDiv">
            <div class="listings">
                <div class="sortBy">
                    sort by
                    <select v-model="sortBy">
                        <option>hot</option>
                        <option>top</option>
                        <option>bottom</option>
                        <option>new</option>
                        <option>old</option>
                    </select>
                </div>
                <div>
                    <Listing v-for="listing in listings" :listing="listing" parentSub="home" :key="listing.ID"></Listing>
                </div>
            </div>
            <div class="subList">
                <p class="subListHeader">All subs</p>
                <span class="subName" v-for="sub in subs" :key="sub" @click="goToSub(sub)">r/{{sub}}</span>
            </div>
        </div>
    </div>
</template>

<script>
    import Listing from '@/components/Listing.vue'
    export default {
        name: 'Sub',
        components: {
            Listing
        },
        data: () => ({
            listings: [],
            subs: [],
            error: null,
            sortBy: "hot"
        }),
        methods: {
            getAllSubs () {
                fetch(`${process.env.VUE_APP_BASE_URL}/api/home/`, {
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
                                    this.subs = result
                                })
                        }
                    })
            },
            getAllThreads () {
                let data = {
                    kind: "home",
                    id: "",
                    currentUser: this.$store.getters.getCurrentUser,
                    sortBy: this.sortBy,
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getlistingdata`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'plain/text',
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
                                    this.listings = result
                                })
                        }
                    })
            },
            goToSub (subName) {
                this.$router.push(`/r/${subName}`)
            }
        },
        mounted () {
            this.getAllSubs()
            this.getAllThreads()
        },
        watch: {
            sortBy: function(){
                this.getAllThreads()
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
.headerBtn {
    display: flex;
    text-align: end;
    margin-bottom: 0px;
    margin-top: 0px;
    margin-right: 50px;
    cursor: pointer;
    align-self: flex-end;
}
.headerBtn:hover {
    text-decoration: underline;
}
a, a:hover, a:focus, a:active {
      text-decoration: none;
      color: inherit;
}
.homeDiv {
    display: flex;
    justify-content: space-between;
    align-items: flex-start;
}
.subList {
    margin-right: 50px;
    padding: 10px;
    display: flex;
    flex-direction: column;
    align-items: baseline;
    border-radius: 10px;
    background-color: rgb(202, 202, 202);
}
.subListHeader {
    margin-top: 0px;
    margin-bottom: 5px;
}
.listings {
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