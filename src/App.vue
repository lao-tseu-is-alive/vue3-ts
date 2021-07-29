<template>
  <h4>Parent Component values (in App):</h4>
  <ul><li>parentPointName: {{parentPointName}}</li></ul>
  <ul><li>parentPX & PY: {{parentPX}}, {{parentPY}}</li></ul>
  <hr>
  <h4>PointEdit component</h4>
  <PointEdit :p-name="parentPointName" :px="parentPX" :py="parentPY"/>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import PointEdit from './components/PointEdit.vue';

export default defineComponent({
  name: 'App',
  components: {
    PointEdit,
  },
  data() {
    return {
      parentPointName: 'PTest01',
      parentPX: 1,
      parentPY: 2,
    };
  },
});
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 1rem;
}
</style>
