<template>
    <div>
        <span class="header">
            <p class="title">r/{{subName}}</p>
        </span>
        <div class="divider"></div>
        <div class="centered">
            <input placeholder="Enter thread title" v-model="threadTitle" type="text">
            <textarea v-model="threadBody" rows="3" placeholder="Enter thread body"></textarea>
        </div>
        <button>Create thread</button>
    </div>
</template>

<script>
    export default {
        name: "CreateSub",
        data: () => ({
            subName: "something",
            threadTitle: "",
            threadBody: "",
        })
    }
</script>

<style scoped>
.header {
    display: flex;
    justify-content: space-between;
}
.title {
    font-size: large;
    font-weight: bold;
    margin-bottom: 0px;
    margin-left: 50px;
}
.centered {
    display: flex;
    flex-direction: column;
    margin: auto;
    width: 60%;
}
textarea, input {
  font-family: inherit;
  font-size: 15px;
  margin-bottom: 10px;
}
</style>