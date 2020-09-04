<template>
    <div class="contents">
        <span class="voteArea">
            <i v-if="this.$store.getters.isLoggedIn" @click="vote('up')" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
            <p class="points">{{points}}</p>
            <i v-if="this.$store.getters.isLoggedIn" @click="vote('down')" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
        </span>
        <span class="textArea">
            <span @click="goToThread(listing)" class="listingTitle">{{listing.threadTitle}}</span>
            <span class="subtitle">
                <span class="user" @click="goToUser(listing)">{{listing.createdBy}} </span>
                <span v-if="!inSub">to </span>
                <span v-if="!inSub" class="subName" @click="goToSub(listing)">r/{{listing.subName}} </span>
                <span :title="dateFromUnixTime(listing.createdOn)">{{timeAgo(listing.createdOn)}}</span>
            </span>
            <span class="commentCount" v-if="listing.commentCount">
                {{listing.commentCount}} <span v-if="listing.commentCount==1">comment</span> <span v-else>comments</span>
            </span>
        </span>
    </div>
</template>

<script>
    import {constants} from '@/constants.js'
    export default {
        name: 'Listing',
        props: {
            listing: Object,
            parentSub: String
        },
        data: () => ({
            voteState: null,
            points: null
        }),
        methods: {
            vote (type) {
                let vote = {
                    voteType: type,
                    kind: "thread",
                    kindID: this.listing.ID,
                    username: this.$store.getters.getCurrentUser,
                }
                fetch(`${process.env.VUE_APP_BASE_URL}/api/createvote`, {
                    method: 'post',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(vote)
                })
                    .then(resp => {
                        if (resp.ok) {
                            return resp.json()
                                .then(resp => {
                                    this.voteState = resp.voteState
                                    this.points = resp.points

                                })
                        } else {
                            return resp.text()
                                .then(resp => {
                                    alert(resp)
                                })
                        }
                    })
            },
            goToThread(listing){
                this.$router.push({name: 'Thread', params: {subName: listing.subName, threadID: listing.ID, url: listing.url}})
            },
            goToSub(listing){
                this.$router.push(`/r/${listing.subName}`)
            },
            goToUser(listing){
                this.$router.push(`/u/${listing.createdBy}`)
            },
            dateFromUnixTime(unixTime) {
                let datetime = new Date(unixTime * 1000).toISOString()
                return `${datetime.substring(0, 10)} ${datetime.substring(11, 19)}`
            },
            timeAgo(unixTime) {
                let now = (Date.now() / 1000).toFixed(0)
                let diff = (now - unixTime)
                let unit
                let plural = "s"
                if (diff < 60) unit = 'second'
                else if (diff < 60*60) {
                    unit = 'minute'
                    diff = diff / 60
                }
                else if (diff < 60*60*24) {
                    unit = 'hour'
                    diff = diff / 60 / 60
                }
                else if (diff < 60*60*24*30) {
                    unit = 'day'
                    diff = diff / 60 / 60 / 24
                }
                else if (diff < 60*60*24*30*12) {
                    unit = 'month'
                    diff = diff / 60 / 60 / 24 / 30
                }
                else {
                    unit = 'year'
                    diff = diff / 60 / 60 / 24 / 365
                }
                if (diff.toFixed(0) == 1) plural = ""
                return `${diff.toFixed(0)} ${unit}${plural} ago`
            }
        },
        computed: {
            upArrowColor: function () {
                if (this.voteState == "up") return constants.COLOR_UPVOTE
                else return "black"
            },
            downArrowColor: function () {
                if (this.voteState == "down") return constants.COLOR_DOWNVOTE
                else return "black"
            },
            inSub: function () {
                if (this.parentSub == this.listing.subName) return true
                else return false
            }
        },
        mounted () {
            this.points = this.listing.points
            this.voteState = this.listing.voteState
        }
    }
</script>

<style scoped>
.points {
    font-size: 15px;
    vertical-align: middle;
    justify-self: center;
    margin: 0px;
}
.contents {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    margin-bottom: 15px;
}
.voteArea {
    margin-right: 10px;
    min-width: 50px;
}
.voteArrow {
    margin: -5px;
}
.textArea {
    text-align: left;
}
.listingTitle {
    cursor: pointer;
}
.subtitle {
    display: flex;
    flex-direction: row;
    font-size: 11px;
    vertical-align: middle;
    white-space: pre;
}
.commentCount {
    font-size: 10px;
    font-weight: 500;
}
</style>