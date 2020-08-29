<template>
    <div>
        <span class="header">
            <p class="title">r/{{subName}}</p>
            <p class="headerBtn" v-if="this.$store.getters.isLoggedIn && !error"><a @click="createThread()">create thread</a></p>
        </span>
        <div class="divider"></div>
        <p v-if="error">Sub does not exist.</p>
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
            error: null,
            listings: []
        }),
        methods: {
            getSubData () {
                fetch(`${process.env.VUE_APP_BASE_URL}/api/getlistingdata/sub/${this.subName}`, {
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
            createThread () {
                this.$router.push({name: 'Create Thread', params: {subName: this.subName}})
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