<template>
  <div id="app" class='selectDisable'>
    <!-- <hello /> -->
    <home />
  </div>
</template>

<script>
import Hello from './components/Hello.vue'
import Home from './components/Home.vue'

export default {
  name: 'app',
  components: {
    Hello, Home
  }
}
</script>

<style lang="scss">
  * {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }

  html, body {
    margin: 0;
    padding: 0;
    overflow-x: hidden;
    background-color:white;
  }

  .selectDisable {
    -webkit-user-select: none;
    -khtml-user-select: none;
    -moz-user-select: none;
    -o-user-select: none;
    user-select: none;
}

.selectEnable { 
    -webkit-user-select: text;
    -khtml-user-select: text;
    -moz-user-select: text;
    -o-user-select: text;
    user-select: text;
}
</style>

