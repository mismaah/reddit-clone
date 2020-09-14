<template>
    <div>
        <span style="cursor:pointer;" @click="getAllSubs()">ALL SUBS</span>
        <div class="dropdown" v-if="dropdown">
            <div style="display:flex;">
                <input type="text" placeholder="filter" v-model="filter">
            </div>
            <span class="subName" v-for="sub in filtered" :key="sub"><a :href="`/r/${sub}`">r/{{sub}}</a></span>
        </div>
    </div>
</template>

<script>
    export default {
        name: "SubList",
        data: () => ({
            subs: [],
            error: null,
            dropdown: false,
            filter: "",
        }),
        methods: {
            close () {
                this.dropdown = false
                this.subs = []
            },
            getAllSubs () {
                if (this.subs.length > 0) {
                    this.close()
                    return
                }
                this.error = null
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
                                    this.dropdown = true
                                })
                        }
                    })
            },
        },
        computed: {
            filtered: function () {
                if (this.filter == "") return this.subs
                return this.subs.filter(function(sub) {
                    return sub.includes(this.filter)
                }.bind(this))
            }
        }
    }
</script>

<style scoped>
.dropdown {
  position: absolute;
  background-color: rgb(219, 219, 219);
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  z-index: 1;
  margin-top: 5px;
  padding: 5px;
}
input {
    max-width: 80px;
}
a {
    text-decoration: none;
    color: inherit;
}
</style>