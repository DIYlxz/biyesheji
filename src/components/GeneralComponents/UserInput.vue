<template>
    <div id="userInput">
        <input class="ut_input" placeholder="user" type="text" v-model="userName">
        <input class="ut_input" placeholder="password" type="password" v-model="password">
    </div>
</template>

<script>
export default {
    name: "UserInput",
    data() {
        return {
            userName: "",
            password: "",
        }
    },
    emits: [""],
}
</script>

<style lang="scss" scoped>
#userInput {
    .ut_input {
        display: block;
        width: 15rem;
        height: 2rem;
        line-height: 2rem;
        border: 0.01rem solid #000;
        border-radius: 0.5rem;
        padding: 0 1rem;
        margin-top: 1.5rem;
    }
}

input {
    border: none;
    outline: none;
}
</style>