<template>
  <div id="app">
    <list />
  </div>
</template>

<script>
import list from './components/list.vue'

export default {
  name: 'app',
  components: {
    list,
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>
