<template>
    <div>
        <span class="header">
            <p class="title">r/</p>
            <p class="headerBtn" v-if="this.$store.getters.isLoggedIn"><router-link to="/createsub">create sub</router-link></p>
        </span>
        <div class="divider"></div>
        <p v-if="error">{{error}}</p>
        <div v-else class="homeDiv">
            <div>
                <Listing v-for="listing in listings" :listing="listing" parentSub="home" :key="listing.title"></Listing>
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
            listings: [
                {
                    title: "*Schniff*",
                    user: "RNAi",
                    points: 65,
                    sub: "slatt"
                },
                {
                    title: "Healthcare plz",
                    user: "hexflagonbear",
                    points: 77,
                    sub: "cth"
                },
                {
                    title: "history of the world i guess",
                    user: "currentUser",
                    points: 2042,
                    sub: "something"
                },
                {
                    title: "Bruh did capitalism just fuckin DIE?",
                    user: "TestUser",
                    points: 20,
                    sub: "cth"
                },
                {
                    title: "October Surprise will be a nationwide Covid shutdown",
                    user: "UserTest",
                    points: 57,
                    sub: "something"
                },
                {
                    title: "Medium-rare sirloin with baked french fries.",
                    user: "mk_bla",
                    points: 3978,
                    sub: "something"
                },
                {
                    title: "me_irl",
                    user: "okisleep",
                    points: 2185,
                    sub: "something"
                },
            ],
            subs: [],
            error: null,
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
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getlistingdata/home`, {
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
</style>