<template>
    <div class="top">
        <i v-if="!searching" class="material-icons searchBtn">search</i>
        <i v-else class="material-icons searchBtnAnimated">search</i>
        <input v-model="query" ref="search" @input="debouncedSearch()" type="text" placeholder="search" @focus.stop="expand();box=true" :style="`width: ${width}px;`" @blur="contract()" @keypress.esc="query=''">
        <div class="results" v-if="box" @click="closeSearch()">
            <p class="searchHelp">
                <span class="helpSection">
                    <span>by:username</span> <span class="thin">search by user </span>
                </span>
                <span class="helpSection">
                    <span>in:sub</span> <span class="thin">search in sub</span>
                </span>
            </p>
            <p v-if="error">{{error}}</p>
            <div v-for="result in results" :key="result.ID">
                <Listing v-if="result.kind=='thread'" :listing="result" parentSub="home" :inSearch="true" style="margin-left:-10px;margin-top:5px;"></Listing>
                <Comment v-if="result.kind=='comment'" :comment="result" :inSearch="true" style="margin-bottom:10px;background-color:rgb(236, 236, 236); margin-right: 20px;"></Comment>
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
            debounced: null,
            searching: false
        }),
        methods: {
            expand () {
                this.width = 460
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
            debouncedSearch () {
                if (this.debounced) return
                this.debounced = true
                this.searching = true
                setTimeout(() => {
                    this.search()
                    this.debounced = false
                }, 400)
            },
            search () {
                this.error = null
                this.box = true
                this.results = []
                this.searching = true
                let query = this.query
                let inPattern = /\bin:\w*\b/
                let byPattern = /\bby:\w*\b/
                let inMatch = inPattern.exec(query)
                let byMatch = byPattern.exec(query)
                query = query.replace(/\bin:\w*\b/g, "")
                query = query.replace(/\bby:\w*\b/g, "")
                query = query.replace(/\s+/g,' ').trim()
                if (query == "") {
                    this.searching = false
                    return
                }
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
                                    this.searching = false
                                })
                        } else {
                            return resp.json()
                                .then(result => {
                                    this.results = result
                                    this.searching = false
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
    margin-left: 10px;
    display: flex;
}
.searchBtn {
    font-size: 17px;
    line-height: inherit;
    margin-bottom: -5px;
}
.searchBtnAnimated {
    font-size: 17px;
    line-height: inherit;
    margin-bottom: -5px;
    animation: color-change 0.5s infinite;
}
@keyframes color-change {
  0% { color: red; }
  100% { color: rgb(202, 202, 202) }
}
.results {
    position: absolute;
    z-index: 1;
    max-height: 400px;
    overflow-y: auto;
    overflow-x: hidden;
    width: 500px;
    right: 0;
    margin-left: auto;
    margin-right: auto;
    margin-top: 23px;
    background-color: rgb(219, 219, 219);
}
.searchHelp {
    display: flex;
    justify-content: center;
    margin-top: 5px;
    margin-bottom: 5px;
}
.helpSection {
    margin-left: 30px;
    margin-right: 30px;
}
.thin {
    font-weight:400;
}
input {
    height: 14px;
    transition:0.1s ease-in-out;
}
</style>