<template>
    <div>
        <span class="header">
            <p class="title">r/{{subName}}</p>
            <p class="headerBtn" v-if="this.$store.getters.isLoggedIn && subExists"><router-link to="/createthread">create thread</router-link></p>
        </span>
        <div class="divider"></div>
        <p v-if="!subExists">Sub does not exist.</p>
        <Listing v-for="listing in listings" :listing="listing" :parentSub="subName" :key="listing.title"></Listing>
    </div>
</template>

<script>
    import Listing from '@/components/Listing.vue'
    export default {
        name: 'Sub',
        props: {
            subName: String,
        },
        components: {
            Listing
        },
        data: () => ({
            subExists: true,
            listings: [
                {
                    title: "history of the world i guess",
                    user: "currentUser",
                    points: 2042,
                    sub: "something"
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
            ]
        }),
        methods: {
            getSubData () {
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getsubdata/${this.subName}`, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    }
                })
                    .then(resp => {
                        if (resp.ok) {
                            this.subExists = true
                            console.log("SUCC")
                        } else {
                            this.subExists = false
                            return resp.text()
                        }
                    })
                    .then(result => {
                        console.log(result)
                    })
            }
        },
        mounted () {
            this.getSubData()
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
</style>