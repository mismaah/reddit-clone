<template>
    <div>
        <p class="sub">r/main</p>
        <div class="divider"></div>
        <div class="header">
            <span class="voteArea">
                <i @click="upvote()" title="Upvote" class="material-icons voteArrow" :style="{color: upArrowColor}">keyboard_arrow_up</i>
                <p class="points">{{points}}</p>
                <i @click="downvote()" title="Downvote" class="material-icons voteArrow" :style="{color: downArrowColor}">keyboard_arrow_down</i>
            </span>
            <span class="textArea">
                <span class="title">{{title}}</span>
                <span class="user">{{user}}</span>
            </span>
        </div>
        <div class="box">
            <p>haiti is starting to like the idea of a revolution, especially the slaves, who free themselves by killing their masters. "why didn't we think of this before?" wait, who's in charge of france now? "me," said napoleon, trying to take over europe. luckily, they banished him to an island. but he came back! luckily, they banished him to another island. there goes latin america, becoming independent in the latin american wars of independence. britain just figured out how to turn steam into power, so now they can make many different types of machines and factories with machines in them so they can make a lot of products real fast. then they invent some trains. and conquer india and maybe put some trains there. "hey, china!" said britain. "buy stuff from us!" "nah, dude, we already got everything," says china. so britain tried to get them addicted to opium, which worked, actually. but then china made it illegal and dumped it all into the sea. so britain threw a hissy fit and made them open up five cities and give them an island. britain and russia are playing a game where they try to stop the other person from conquering afghanistan. also, the sultan of oman lives in zanzibar now: "that's just where he lives." india just had a revolution, and they would like to govern themselves now. "nope," said britain, governing them even harder than before. incoming telegram: HI I JUST SENT YOU A MESSAGE THRU A WIRE technology is about to go crazy!
            </p>
        </div>
        <textarea v-model="replyMsg" rows="3" placeholder="Reply to thread"></textarea>
        <br>
        <button @click="reply">Submit</button>
        <Comment v-for="comment in comments" :comment="comment" :key="comment.msg"></Comment>
    </div>
</template>

<script>
import {constants} from '@/constants.js'
import Comment from '@/components/Comment.vue'
export default {
    name: 'Thread',
    components: {
        Comment
    },
    data: () => ({
        title: "history of the world i guess",
        user: "currentUser",
        replyMsg: "",
        upvoted: false,
        downvoted: false,
        comments: [
            {
                user: "TestUser",
                msg: "Yes",
                points: 5,
                children: [
                    {
                        user: "UserTest",
                        msg: "No",
                        points: 1,
                        children: [
                            {
                                user: "AnotherTest",
                                msg: "wedfbiskd",
                                points: -1,
                                children: []
                            }
                        ]
                    },
                    {
                        user: "mm",
                        msg: "pp",
                        points: 0,
                        children: []
                    }
                ]
            }
        ]
    }),
    methods: {
        reply () {
            if (!this.replyMsg || this.replyMsg.trim() == "") return
            this.comments.unshift({
                user: "currentUser",
                msg: this.replyMsg.trim(),
                children: [],
                points: 0,
            })
            this.replyMsg = ""
        },
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
            var point = 2042
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
        }
    },
}
</script>

<style scoped>
.divider {
    border: 0.5px solid #000000;
    margin-bottom: 20px;
}
.sub {
    font-size: large;
    font-weight: bold;
    text-align: left;
    margin-bottom: 0px;
    margin-left: 50px;
}
.box {
    border-radius: 20px;
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
    text-align: left;
}
.title {
    text-align: left;
}
.user {
    font-size: 11px;
    font-weight: bold;
    vertical-align: middle;
}
.voteArea {
    display: flex;
    flex-direction: column;
    font-size: 5px;
    margin-right: 10px;
    min-width: 50px;
}
.points {
    font-size: 15px;
    vertical-align: middle;
    justify-self: center;
    margin: 0px;
}
.header {
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-left: 40px;
    margin-right: 40px;
    padding-bottom: 5px
}
.textArea {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}
.voteArrow {
    font-size: 20px;
    cursor: pointer;
    user-select: none;
    margin: -5px;
}
textarea {
  font-family: inherit;
  width: 80%;
}
</style>