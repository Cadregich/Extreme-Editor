<template>
  <ExtremeEditor/>
</template>

<script>
import ExtremeEditor from './components/ExremeEditor.vue'

export default {
  name: 'App',
  components: {
    ExtremeEditor
  }
}
</script>

<style>
#app {
  background-color: #303030;
  margin: 0 !important;
  padding: 0;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

body {
  margin: 0;
  padding: 0;
  background-color: #303030;
}
</style>
