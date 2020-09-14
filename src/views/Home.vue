<template>
    <div>
        <span class="header">
            <p class="title">r/</p>
            <p class="headerBtn" v-if="this.$store.getters.isLoggedIn"><router-link to="/createsub">create sub</router-link></p>
        </span>
        <div class="divider"></div>
        <div class="homeDiv">
            <div class="listings">
                <div class="sortBy">
                    sort by
                    <select v-model="preferences.postSorting" @change="getAllThreads()">
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
            <p v-if="error">{{error}}</p>
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
            preferences: {
                postSorting: "hot",
                commentSorting: "top"
            }
        }),
        methods: {
            getAllThreads () {
                let data = {
                    kind: "home",
                    id: "",
                    currentUser: this.$store.getters.getCurrentUser,
                    sortBy: this.preferences.postSorting,
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
            getPreferences(){
                if (localStorage.getItem('preferences') === null) return
                this.preferences = JSON.parse(localStorage.getItem('preferences'))
            }
        },
        mounted () {
            this.getPreferences()
            this.getAllThreads()
        },
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