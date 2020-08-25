<template>
    <div class="contents">
        <span class="voteArea">
            <i @click="upvote()" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
            <p class="points">{{points}}</p>
            <i @click="downvote()" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
        </span>
        <span class="textArea">
            <span class="">{{listing.title}}</span>
            <span class="user">{{listing.user}}</span>
        </span>
    </div>
</template>

<script>
export default {
    name: 'Listing',
    props: {
        listing: Object
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
            if (this.upvoted) return "red"
            else return "black"
        },
        downArrowColor: function () {
            if (this.downvoted) return "turquoise"
            else return "black"
        }
    },
}
</script>

<style scoped>
.user {
    font-size: 11px;
    font-weight: bold;
    vertical-align: middle;
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
    display: flex;
    flex-direction: column;
    font-size: 5px;
    margin-right: 10px;
    min-width: 50px;
}
.voteArrow {
    font-size: 20px;
    cursor: pointer;
    user-select: none;
    margin: -5px;
}
.textArea {
    display: flex;
    flex-direction: column;
    text-align: left;
}
</style>