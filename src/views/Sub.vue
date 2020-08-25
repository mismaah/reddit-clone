<template>
    <div>
        <p class="title">r/main</p>
        <div class="divider">
        </div>
        <br>
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

<style>
.divider {
    border: 1px solid #000000;
    padding-left: 20px;
    padding-right: 20px;
    margin-bottom: 0px;
}
</style>