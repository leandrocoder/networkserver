<template>
  <div id="app">
    <hello />
  </div>
</template>

<script>
import Hello from './components/Hello.vue'

export default {
  name: 'app',
  components: {
    Hello
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
    background-color:black;
  }
</style>

