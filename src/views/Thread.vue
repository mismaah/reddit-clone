<template>
    <div>
        <p class="title">Thread title</p>
        <div class="box">
            <p>haiti is starting to like the idea of a revolution, especially the slaves, who free themselves by killing their masters. "why didn't we think of this before?" wait, who's in charge of france now? "me," said napoleon, trying to take over europe. luckily, they banished him to an island. but he came back! luckily, they banished him to another island. there goes latin america, becoming independent in the latin american wars of independence. britain just figured out how to turn steam into power, so now they can make many different types of machines and factories with machines in them so they can make a lot of products real fast. then they invent some trains. and conquer india and maybe put some trains there. "hey, china!" said britain. "buy stuff from us!" "nah, dude, we already got everything," says china. so britain tried to get them addicted to opium, which worked, actually. but then china made it illegal and dumped it all into the sea. so britain threw a hissy fit and made them open up five cities and give them an island. britain and russia are playing a game where they try to stop the other person from conquering afghanistan. also, the sultan of oman lives in zanzibar now: "that's just where he lives." india just had a revolution, and they would like to govern themselves now. "nope," said britain, governing them even harder than before. incoming telegram: HI I JUST SENT YOU A MESSAGE THRU A WIRE technology is about to go crazy!
            </p>
        </div>
        <input v-model="replyMsg" placeholder="Reply to thread">
        <button @click="reply">Submit</button>
        <!-- <hr class="divider"> -->
        <Comment v-for="comment in comments" :comment="comment" :key="comment.msg"></Comment>
    </div>
</template>

<script>
import Comment from '@/components/Comment.vue'
    export default {
        name: 'Thread',
        components: {
            Comment
        },
        data: () => ({
            replyMsg: null,
            comments: [
                {
                    user: "TestUser",
                    msg: "Yes",
                    children: [
                        {
                            user: "UserTest",
                            msg: "No",
                            children: [
                                {
                                    user: "AnotherTest",
                                    msg: "wedfbiskd",
                                    children: []
                                }
                            ]
                        },
                        {
                            user: "mm",
                            msg: "pp",
                            children: []
                        }
                    ]
                }
            ]
        }),
        methods: {
            reply () {
                this.comments.unshift({
                    user: "currentUser",
                    msg: this.replyMsg
                })
            }
        }
    }
</script>

<style>
.box {
    border-radius: 20px;
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 20px;
    text-align: left;
}
.title {
    font-size: large;
    font-weight: bold;
    text-align: left;
    margin-left: 20px;
    margin-bottom: 0px;
}
.divider {
    border-top: 1px solid #bbb;
    margin-left: 20px;
    margin-right: 20px;
    margin-bottom: 0px;
}
</style>