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

  hr {
    margin-top: 1rem;
    margin-bottom: 1rem;
  }
}
</style>

<template>
  <div class="container">
    <button @click="displayPointEditComponent=!displayPointEditComponent">Show PointEdit component</button>
    <div v-show="displayPointEditComponent">
      <h5>Parent Component values (in App):</h5>
      <div class="row">
        <div class="two columns">
          <label for="parentPointName">Name:</label>
        </div>
        <div class="two columns">
          <input id="parentPointName" type="text" class="u-full-width"
                 placeholder="your point name" v-model="parentPointName">
        </div>
        <div class="one columns">
          <label for="parentPointName">X:</label>
        </div>
        <div class="three columns">
          <input id="parentPX" class="u-full-width" type="number"
                 placeholder="X value" v-model.number="parentPX"/>
        </div>
        <div class="one columns">
          <label for="parentPointName">Y:</label>
        </div>
        <div class="three columns">
          <input id="parentPY" class="u-full-width" type="number"
                 placeholder="Y value" v-model.number="parentPY"/>
        </div>
      </div>
      <hr>
      <h5>PointEdit component</h5>
      <PointEdit
          :p-name="parentPointName" :px="parentPX" :py="parentPY"
          @changePoint="handleChangedPoint"
      />
    </div>
    <dynamic-form :schema="mySchema"></dynamic-form>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {iPoint} from './components/Point';
import PointEdit from './components/PointEdit.vue';
import DynamicForm from "./components/DynamicForm.vue";

export default defineComponent({
  name: 'App',
  components: {
    DynamicForm,
    PointEdit,
  },
  setup() {
    const displayPointEditComponent = ref(false);
    const parentPointName = ref('PTest01');
    const parentPX = ref(65);
    const parentPY = ref(30);
    const handleChangedPoint = (val: iPoint) => {
      console.log('## IN APP handleChangedPoint val:', val);
      if (val.name != null) {
        parentPointName.value = val.name;
      }
      parentPX.value = val.x;
      parentPY.value = val.y;
    };

    const mySchema = ref({
      type: 'object',
      properties: {
        name: {type: 'string', title: 'Nom'},
        isWorking: {type: 'boolean', title: 'Est Actif'},
        age: {type: 'number', title: 'Age'},
        email: {type: 'string', title: 'Email'},
      },
    });

    return {
      displayPointEditComponent, parentPointName, parentPX, parentPY, handleChangedPoint, mySchema,
    };
  },
});
</script>
