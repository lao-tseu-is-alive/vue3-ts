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
    <div class="row">
      <div class="twelve columns u-full-width">
        <button @click="displayPointEditComponent=!displayPointEditComponent">
          {{ displayPointEditComponent ? "Hide" : "Show" }} PointEdit component
        </button>
      </div>
    </div>
    <div class="row">
      <div class="twelve columns u-full-width">
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
      </div>
    </div>
    <div class="row">
      <div class="twelve columns u-full-width">
        <dynamic-form :schema="mySchema"></dynamic-form>
      </div>
    </div>

  </div>
</template>

<script lang="ts">
import {defineComponent, ref} from 'vue';
import {iPoint} from './components/Point';
import {fieldInfo} from './components/FormSchema';
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
      name: {title: 'Nom', type: 'string', minLength: 2, maxLength: 100},
      isWorking: {title: 'Est Actif', type: 'boolean'},
      salary: {title: 'Salaire', type: 'integer', format: 'int32', minimum: 0},
      email: {title: 'Email', type: 'string', format: 'email'},
      birthDate: {title: 'Date de naissance', type: 'string', format: 'date'},
    } as Record<string, fieldInfo>);

    return {
      displayPointEditComponent, parentPointName, parentPX, parentPY, handleChangedPoint, mySchema,
    };
  },
});
</script>
