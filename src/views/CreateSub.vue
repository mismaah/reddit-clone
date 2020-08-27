<template>
    <div class="centered">
        <input placeholder="Enter sub name" v-model="subName" type="text">
        <button>Create sub</button>
    </div>
</template>

<script>
    export default {
        name: "CreateSub",
        data: () => ({
            subName: "",
        })
    }
</script>

<style scoped>
.centered {
    padding: 20px;
    display: flex;
    justify-content: center;
}
input {
    margin-right: 10px;
}
</style>