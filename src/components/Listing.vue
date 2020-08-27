<template>
    <div class="contents">
        <span class="voteArea">
            <i v-if="this.$store.getters.isLoggedIn" @click="upvote()" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
            <p class="points">{{points}}</p>
            <i v-if="this.$store.getters.isLoggedIn" @click="downvote()" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
        </span>
        <span class="textArea">
            <span>{{listing.title}}</span>
            <span class="subtitle">
                <span class="user">{{listing.user}} </span>
                <span v-if="!inSub">to </span>
                <span v-if="!inSub" class="subName">r/{{listing.sub}}</span>
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
            upvoted: false,
            downvoted: false,
        }),
        methods: {
            upvote () {
                if (this.upvoted) this.upvoted = false
                else {
                    this.upvoted = true
                    this.downvoted = false
                }
            },
            downvote () {
                if (this.downvoted) this.downvoted = false
                else {
                    this.downvoted = true
                    this.upvoted = false
                }
            }
        },
        computed: {
            voteState: function () {
                if (this.downvoted && !this.upvoted) return 1
                if (this.upvoted && !this.downvoted) return 2
                else return 0
            },
            points: function () {
                var point = this.$props.listing.points
                if (this.voteState == 1) return point - 1
                if (this.voteState == 2) return point + 1
                else return point
            },
            upArrowColor: function () {
                if (this.upvoted) return constants.COLOR_UPVOTE
                else return "black"
            },
            downArrowColor: function () {
                if (this.downvoted) return constants.COLOR_DOWNVOTE
                else return "black"
            },
            inSub: function () {
                if (this.parentSub == this.listing.sub) return true
                else return false
            }
        },
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
.subtitle {
    display: flex;
    flex-direction: row;
    font-size: 11px;
    vertical-align: middle;
    white-space: pre;
}
</style>