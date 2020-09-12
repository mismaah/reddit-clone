<template>
    <div class="top">
        <i class="material-icons searchBtn">search</i>
        <input v-model="query" ref="search" @input="search()" type="search" placeholder="search" @focus.stop="expand();box=true" :style="`width: ${width}px`" @blur="contract()">
        <div class="results" v-if="box" @click="closeSearch()">
            <p v-if="error">{{error}}</p>
            <div v-for="result in results" :key="result.ID">
                <Listing v-if="result.kind=='thread'" :listing="result" parentSub="home" :inSearch="true" style="margin-left:-10px;margin-top:5px;"></Listing>
                <Comment v-if="result.kind=='comment'" :comment="result" :inSearch="true" style="margin-bottom:10px;background-color:rgb(236, 236, 236);"></Comment>
            </div>
        </div>
    </div>
</template>

<script>
    import Listing from './Listing.vue'
    import Comment from './Comment.vue'
    export default {
        name: "NavSearch",
        components: {
            Listing,
            Comment
        },
        data: () => ({
            width: 75,
            query: "",
            results: [],
            box: false,
            error: null,
            clickOut: false,
        }),
        methods: {
            expand () {
                this.width = 200
            },
            contract () {
                this.width = 100
            },
            closeSearch () {
                let focused = document.activeElement
                let search = this.$refs.search
                if (focused == search) return
                this.box = false
            },
            search () {
                this.error = null
                this.box = true
                this.results = []
                let query = this.query
                let inPattern = /\bin:\w*\b/
                let byPattern = /\bby:\w*\b/
                let inMatch = inPattern.exec(query)
                let byMatch = byPattern.exec(query)
                query = query.replace(/\bin:\w*\b/g, "")
                query = query.replace(/\bby:\w*\b/g, "")
                query = query.replace(/\s+/g,' ').trim()
                // console.log(query, inMatch ? inMatch[0] : "", byMatch ? byMatch[0] : "")
                if (query == "") return
                let url = `${process.env.VUE_APP_BASE_URL}/api/search?query=${query}`
                if (inMatch) url += `&in=${inMatch[0].substring(3)}`
                if (byMatch) url += `&by=${byMatch[0].substring(3)}`
                fetch(url, {
                    method: 'get',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'plain/text',
                    },
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
                                    this.results = result
                                })
                        }
                    })
            }         
        },
        watch: {
            '$route.fullPath': function () {
                this.results = []
                this.query = ""
            }
        },
        created: function() {
            window.addEventListener('click',this.closeSearch);
        },
    }
</script>

<style scoped>
.top{
    margin-left: 20px;
    display: flex;
}
.searchBtn {
    font-size: 17px;
    line-height: inherit;
    margin-bottom: -5px;
}
.results {
    position: absolute;
    z-index: 1;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 700px;
    left: 0;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 18px;
    transition: height 0.5s ease-in-out;
    background-color: rgb(219, 219, 219);
}
input {
    height: 16px;
    transition: width 0.5s ease-in-out;
}
</style>