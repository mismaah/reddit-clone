<template>
    <div>
        <p class="title">r/main</p>
        <div class="divider"></div>
        <Listing v-for="listing in listings" :listing="listing" :key="listing.title"></Listing>
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
                title: "history of the world i guess",
                user: "currentUser",
                points: 2042,
            },
            {
                title: "Bruh did capitalism just fuckin DIE?",
                user: "TestUser",
                points: 20,
            },
            {
                title: "October Surprise will be a nationwide Covid shutdown",
                user: "UserTest",
                points: 57,
            },
            {
                title: "Medium-rare sirloin with baked french fries.",
                user: "mk_bla",
                points: 3978,
            },
            {
                title: "me_irl",
                user: "okisleep",
                points: 2185,
            },
        ]
    })
}
</script>

<style scoped>
.divider {
    border: 0.5px solid #000000;
    margin-bottom: 20px;
}
.title {
    font-size: large;
    font-weight: bold;
    text-align: left;
    margin-bottom: 0px;
    margin-left: 50px;
}
</style>