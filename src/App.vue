<style lang="scss">
@import "css/normalize.css";
@import "css/skeleton.css";

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50;
  margin-top: 1rem;
  input{height: 2.5rem}
  label{float: none;}
}
</style>

<template>
  <div class="container">
    <h5>Parent Component values (in App):</h5>
    <div class="row">
      <div class="two columns">
        <label for="parentPointName">Name:</label>
      </div>
      <div class="two columns">
        <input id="parentPointName" type="text" class="u-full-width"
               placeholder="your point name" :value="parentPointName">
      </div>
      <div class="one columns">
        <label for="parentPointName">X:</label>
      </div>
      <div class="three columns">
        <input id="parentPX" class="u-full-width" type="number"
               placeholder="X value" :value="parentPX"/>
      </div>
      <div class="one columns">
        <label for="parentPointName">Y:</label>
      </div>
      <div class="three columns">
        <input id="parentPY" class="u-full-width" type="number"
               placeholder="Y value" :value="parentPY"/>
      </div>
    </div>
    <hr>
    <h5>PointEdit component</h5>
    <PointEdit :p-name="parentPointName" :px="parentPX" :py="parentPY"/>
  </div>
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
