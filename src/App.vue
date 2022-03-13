<template>
  <div id="app">
    <router-view></router-view>
    <change-skin></change-skin>
    <idea-req></idea-req>
  </div>
</template>

<script>
import ChangeSkin from './components/AppSet/ChangeSkin.vue'
import IdeaReq from "./components/AppSet/IdeaReq.vue"

export default {
  name: "App",
  components: {
    ChangeSkin,
    IdeaReq,
  },
}
</script>

<style lang="scss">
* {
  padding: 0;
  margin: 0;
}
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #000;
  height: 100%;
  overflow: hidden;
  position: relative;
}

:root {
  width: 100%;
  height: 100%;
}

body {
  height: 100%;
}
</style>
