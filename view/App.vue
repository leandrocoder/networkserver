<template>
  <div id="app" class='selectDisable'>
    <router-view></router-view>
  </div>
</template>

<script>

import Home from './components/Home.vue'

export default {
	name: 'app',
	components: {
		Home
	}
}
</script>

<style lang="scss">
  * {
    font-family:'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
    font-size: 16px;
  }

  p {
    font-size: 16px;
  }

  h1, h2, h3 {
    font-size: 24px;
    margin: 0;
    padding: 0;
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

