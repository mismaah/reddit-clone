<template>
    <div>
        <p class="title">r/</p>
        <div class="divider"></div>
        <Listing v-for="listing in listings" :listing="listing" parentSub="home" :key="listing.title"></Listing>
    </div>
</template>

<script>
import Listing from '@/components/Listing.vue'
export default {
    name: 'Sub',
    components: {
        Listing
    },
    data: () => ({
        listings: [
            {
                title: "*Schniff*",
                user: "RNAi",
                points: 65,
                sub: "slatt"
            },
            {
                title: "Healthcare plz",
                user: "hexflagonbear",
                points: 77,
                sub: "cth"
            },
            {
                title: "history of the world i guess",
                user: "currentUser",
                points: 2042,
                sub: "something"
            },
            {
                title: "Bruh did capitalism just fuckin DIE?",
                user: "TestUser",
                points: 20,
                sub: "cth"
            },
            {
                title: "October Surprise will be a nationwide Covid shutdown",
                user: "UserTest",
                points: 57,
                sub: "something"
            },
            {
                title: "Medium-rare sirloin with baked french fries.",
                user: "mk_bla",
                points: 3978,
                sub: "something"
            },
            {
                title: "me_irl",
                user: "okisleep",
                points: 2185,
                sub: "something"
            },
        ]
    })
}
</script>

<style scoped>
.title {
    font-size: large;
    font-weight: bold;
    margin-bottom: 0px;
    margin-left: 50px;
}
</style>