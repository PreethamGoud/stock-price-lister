<template>
  <div id="app">
    <FilterData />
    <list />
  </div>
</template>

<script>
import list from './components/list.vue'
import FilterData from './components/FilterData'

export default {
  name: 'app',
  components: {
    list,
    FilterData
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
  margin-top: 60px;
}
</style>
