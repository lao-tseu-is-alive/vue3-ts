<style scoped lang="scss">
.pedit{
  border: 1px solid black;
  padding: 1.5rem;
  input, button{
    //height: 2.5rem
  }
  label{float: none;}
}
</style>

<template>
  <div class="pedit">
    <h5>{{ `props => pName:[${pName}]&nbsp;px,py:(${px},${py})` }}</h5>
    <h5>{{point}}</h5>
    <div class="row">
      <div class="two columns">
        <label for="PointName">Name:</label>
      </div>
      <div class="two columns">
        <input id="PointName" type="text" class="u-full-width"
               placeholder="your point name" v-model="point.name">
      </div>
      <div class="one columns">
        <label for="PX">X:</label>
      </div>
      <div class="three columns">
        <input id="PX" class="u-full-width" type="number"
               placeholder="X value" v-model.number="point.x"/>
      </div>
      <div class="one columns">
        <label for="PY">Y:</label>
      </div>
      <div class="three columns">
        <input id="PY" class="u-full-width" type="number"
               placeholder="Y value" v-model.number="point.y"/>
      </div>
    </div>
    <div class="row">
      <div class="four columns">
        <label>Move relative:</label>
      </div>
      <div class="one columns">
        <label for="DX">DX:</label>
      </div>
      <div class="two columns">
        <input id="DX" class="u-full-width" type="number"
               placeholder="X value" v-model.number="deltaX"/>
      </div>
      <div class="one columns">
        <button id="dodx" aria-keyshortcuts="x" @click="moveRelX"
                class="button-primary u-pull-right">move X</button>
      </div>
      <div class="one columns">
        <label for="DY">DY:</label>
      </div>
      <div class="two columns">
        <input id="DY" class="u-full-width" type="number"
               placeholder="Y value" v-model.number="deltaY"/>
      </div>
      <div class="one columns">
        <button id="dody" aria-keyshortcuts="x" @click="moveRelY"
                class="button-primary u-pull-right">move Y</button>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, watch,
} from 'vue';
import Point from '@/components/Point';

export default defineComponent({
  name: 'PointEdit',
  props: {
    pName: { required: true, default: 'default' },
    px: { required: true, default: 0 },
    py: { required: true, default: 0 },
  },
  /* watch: {
    px(val: number, oldVal: number) {
      console.log(`IN WATCH px now: ${val},  before: ${oldVal}`);
      this.point.x = val;
    },
    py(val: number, oldVal: number) {
      console.log(`IN WATCH py now: ${val},  before: ${oldVal}`);
      this.point.y = val;
    },
    pName(val: string, oldVal: string) {
      console.log(`IN WATCH pName now: ${val},  before: ${oldVal}`);
      this.point.name = val;
    },
  }, */
  setup(props: { pName: string | undefined; px: number | undefined; py: number | undefined; }) {
    const point = ref(new Point(props.pName, props.px, props.py));
    const deltaX = ref(1);
    const deltaY = ref(1);
    // methods
    const moveRelX = ():void => {
      console.log(`IN moveRelX(${deltaX.value})`);
      point.value.moveRelative(deltaX.value, 0);
    };
    const moveRelY = ():void => {
      console.log(`IN moveRelY(${deltaY.value})`);
      point.value.moveRelative(0, deltaY.value);
      console.log(`IN moveRelY(${deltaY.value})  => this.point.dump(): ${point.value.dump()}`);
    };
    const moveRelXY = ():void => {
      console.log(`IN moveRelXY(${deltaX.value}, ${deltaY.value})`);
      point.value.moveRelative(deltaX.value, deltaY.value);
    };
    // watch
    watch(() => props.px, (val, oldVal) => {
      console.log(`IN WATCH px now: ${val},  before: ${oldVal}`);
      if (val !== undefined) {
        point.value.x = +val;
      }
    });
    // hooks
    onMounted(() => {
      console.log(`PointEdit mounted => pName:[${props.pName}](${props.px},${props.py})`);
      console.log(`PointEdit mounted => ${point.value.dump()}`);
    });
    return { point, deltaX, deltaY };
  },

});
</script>
