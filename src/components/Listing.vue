<template>
    <div class="top">
        <div class="contents">
            <span class="voteArea" v-if="!inSearch">
                <i v-if="this.$store.getters.isLoggedIn" @click="vote('up')" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
                <p class="points">{{points}}</p>
                <i v-if="this.$store.getters.isLoggedIn" @click="vote('down')" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
            </span>
            <span class="imageArea" v-if="imageURL && inSearch" @click="goToThread(listing)">
                <img class="thumbnail" :src="imageURL">
            </span>
            <span class="imageArea" v-if="imageURL && !inSearch" title="click to expand" @click="expandImage = !expandImage">
                <img class="thumbnail" :src="imageURL">
            </span>
            <span class="textArea">
                <span>
                    <span @click="goToThread(listing)" class="listingTitle">{{listing.threadTitle}}</span>
                    <a class="threadLink" v-if="listing.threadLink" :href="listing.threadLink" target="_blank">({{shorterLink}})<i class="material-icons launch">launch</i></a>
                </span>
                <span class="subtitle">
                    <span class="user" @click="goToUser(listing)">{{listing.createdBy}} </span>
                    <span v-if="!inSub">to </span>
                    <span v-if="!inSub" class="subName" @click="goToSub(listing)">r/{{listing.subName}} </span>
                    <span :title="dateFromUnixTime(listing.createdOn)">{{timeAgo(listing.createdOn)}}</span>
                </span>
                <span class="commentCount" v-if="listing.commentCount" @click="goToThread(listing)">
                    {{listing.commentCount}} <span v-if="listing.commentCount==1">comment</span> <span v-else>comments</span>
                </span>
            </span>
        </div>
        <div class="bigImageContainer" v-if="expandImage">
            <img class="bigImage" :src="imageURL">
        </div>
    </div>
</template>

<script>
    import {constants} from '@/constants.js'
    export default {
        name: 'Listing',
        props: {
            listing: Object,
            parentSub: String,
            inSearch: Boolean
        },
        data: () => ({
            voteState: null,
            points: null,
            imageURL: null,
            threadLink: null,
            expandImage: false
        }),
        methods: {
            vote (type) {
                let vote = {
                    voteType: type,
                    kind: "thread",
                    kindID: this.listing.ID,
                    token: this.$store.getters.getToken,
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
                            if (resp.status == 401){
                                setTimeout(function() {
                                    this.$store.dispatch('logout', resp)
                                    this.$router.push("/login")
                                }.bind(this), 2000)
                            }
                            return resp.text()
                                .then(resp => {
                                    alert(resp)
                                })
                        }
                    })
            },
            goToThread(listing){
                this.$router.push({name: 'Thread', params: {subName: listing.subName, threadID: listing.ID, url: listing.threadURL}})
            },
            goToSub(listing){
                this.$router.push(`/r/${listing.subName}`)
            },
            goToUser(listing){
                this.$router.push(`/u/${listing.createdBy}`)
            },
            dateFromUnixTime(unixTime) {
                let moment = require('moment')
                let datetime = new Date(unixTime * 1000)
                let formattedDateTime = moment(datetime).format("LLL")
                return formattedDateTime
            },
            timeAgo(unixTime) {
                let now = (Date.now() / 1000).toFixed(0)
                let diff = (now - unixTime)
                if (unixTime == 0) diff = 0
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
                else if (diff < 60*60*24*365) {
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
            },
            shorterLink: function () {
                let link = this.listing.threadLink
                if (link.substring(0,12) == "https://www.") link = link.substring(12, link.length)
                if (link.substring(0,8) == "https://") link = link.substring(8, link.length)
                if (link.length > 30) return link.substring(0, 27)+"..."
                return link
            }
        },
        mounted () {
            this.points = this.listing.points
            this.voteState = this.listing.voteState
            if (this.listing.imageURL) this.imageURL = process.env.VUE_APP_BASE_URL + this.listing.imageURL
        }
    }
</script>

<style scoped>
.top {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
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
    min-width: 50px;
}
.voteArrow {
    margin: -5px;
}
.imageArea {
    width: 70px;
    height: 70px;
    margin-right: 10px;
    cursor: pointer;
}
.thumbnail {
    width: 100%;
    height: 100%;
    object-fit:cover;
}
.bigImageContainer {
    max-width: 90%;
    max-height: 400px;
    margin-left: 50px;
}
.bigImage {
    max-width: 100%;
    height: auto;
    max-height: 400px;
}
.textArea {
    text-align: left;
}
.listingTitle {
    cursor: pointer;
    white-space: pre-wrap;
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
    cursor: pointer;
}
.threadLink {
    font-size: 12px;
    margin-left: 5px;
}
.launch {
    font-size: 10px;
}
</style>