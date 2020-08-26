<template>
    <div>
        <p class="sub">r/{{subName}}</p>
        <div class="divider"></div>
        <Listing :listing="listing" :parentSub="subName">{{listing.title}}</Listing>
        <div class="box">
            <p>haiti is starting to like the idea of a revolution, especially the slaves, who free themselves by killing their masters. "why didn't we think of this before?" wait, who's in charge of france now? "me," said napoleon, trying to take over europe. luckily, they banished him to an island. but he came back! luckily, they banished him to another island. there goes latin america, becoming independent in the latin american wars of independence. britain just figured out how to turn steam into power, so now they can make many different types of machines and factories with machines in them so they can make a lot of products real fast. then they invent some trains. and conquer india and maybe put some trains there. "hey, china!" said britain. "buy stuff from us!" "nah, dude, we already got everything," says china. so britain tried to get them addicted to opium, which worked, actually. but then china made it illegal and dumped it all into the sea. so britain threw a hissy fit and made them open up five cities and give them an island. britain and russia are playing a game where they try to stop the other person from conquering afghanistan. also, the sultan of oman lives in zanzibar now: "that's just where he lives." india just had a revolution, and they would like to govern themselves now. "nope," said britain, governing them even harder than before. incoming telegram: HI I JUST SENT YOU A MESSAGE THRU A WIRE technology is about to go crazy!
            </p>
        </div>
        <div class="threadUtil">
            <p v-if="collapseAll" class="utilBtn" @click="collapseComments()" >expand all comments</p>
            <p v-else class="utilBtn" @click="collapseComments()" >collapse all comments</p>
        </div>
        <textarea v-model="replyMsg" rows="3" placeholder="Reply to thread"></textarea>
        <br>
        <button @click="reply">Submit</button>
        <Comment v-for="comment in comments" :comment="comment" :collapseAll="collapseAll" :key="comment.msg"></Comment>
    </div>
</template>

<script>
import {constants} from '@/constants.js'
import Comment from '@/components/Comment.vue'
import Listing from '@/components/Listing.vue'
export default {
    name: 'Thread',
    components: {
        Comment,
        Listing
    },
    data: () => ({
        subName: "something",
        replyMsg: "",
        upvoted: false,
        downvoted: false,
        collapseAll: false,
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
        },
        collapseComments () {
            this.collapseAll = !this.collapseAll
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
        },
        listing: function () {
            return {
                title: "history of the world i guess",
                user: "currentUser",
                points: this.points,
                sub: "something"
            }
        },
    },
}
</script>

<style scoped>
.sub {
    font-size: large;
    font-weight: bold;
    text-align: left;
    margin-top: 0px;
    margin-bottom: 0px;
    margin-left: 50px;
}
.box {
    border-radius: 20px;
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
    text-align: left;
}
.voteArea {
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
    align-items: flex-start;
}
.voteArrow {
    margin: -5px;
}
.threadUtil {
    display: flex;
    flex-direction: row;
    margin-bottom: 10px;
    margin-left: 20px;
}
.utilBtn {
    cursor: pointer;
    margin: 0px;
    font-size: 12px;
}
.utilBtn:hover {
    text-decoration: underline;
}
textarea {
  font-family: inherit;
  width: 80%;
}
</style>