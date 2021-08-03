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
        <input id="PointName" type="text" class="u-full-width" @change="changedPoint"
               placeholder="your point name" v-model="point.name">
      </div>
      <div class="one columns">
        <label for="PX">X:</label>
      </div>
      <div class="three columns">
        <input id="PX" class="u-full-width" type="number" @change="changedPoint"
               placeholder="X value" v-model.number="point.x"/>
      </div>
      <div class="one columns">
        <label for="PY">Y:</label>
      </div>
      <div class="three columns">
        <input id="PY" class="u-full-width" type="number" @change="changedPoint"
               placeholder="Y value" v-model.number="point.y"/>
      </div>
    </div>
    <div class="row">
      <div class="three columns">
        <label>Move relative:</label>
      </div>
      <div class="one columns">
        <button id="resetxy" aria-keyshortcuts="x" @click="resetXY"
                class="button-primary u-pull-right">reset XY</button>
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
  defineComponent, onMounted, ref, reactive, watch, SetupContext, computed,
} from 'vue';
import Point from '@/components/Point';

export default defineComponent({
  name: 'PointEdit',
  props: {
    pName: { required: true, default: 'default' },
    px: { required: true, default: 0 },
    py: { required: true, default: 0 },
  },

  setup(props: { pName: string | undefined; px: number ; py: number ; }, ctx: SetupContext) {
    const point = reactive<Point>(new Point(props.pName, props.px, props.py));
    const deltaX = ref(1);
    const deltaY = ref(1);
    // ####### computed props
    // const getClonedPoint = computed(() => {
    //   console.log('IN COMPUTED getPoint()');
    //   return new Point(point.name, point.x, point.y);
    // });
    // ####### methods
    const changedPoint = ():void => {
      console.log('IN changedPoint');
      ctx.emit('changePoint', point.getPoint());
    };
    const moveRelX = ():void => {
      console.log(`IN moveRelX(${deltaX.value})`);
      point.moveRelative(deltaX.value, 0);
      console.log(`IN moveRelX(${deltaX.value})  => point.dump(): ${point.dump()}`);
      // point.x += 0; // not needed because of getClonedPoint computed property ? Nope...
      // only by having a ctx.emit in changed point, reactivity works or does not work ... amazing
      // don't believe me ? comment the next line calling changedPoint and the ctx.emit
      // and you get reactivity on moveRelY but not on moveRelX
      changedPoint();
    };
    const moveRelY = ():void => {
      console.log(`IN moveRelY(${deltaY.value})`);
      point.moveRelative(0, deltaY.value);
      console.log(`IN moveRelY(${deltaY.value})  => point.dump(): ${point.dump()}`);
      // point.y += 0;
      changedPoint();
    };
    const moveRelXY = ():void => {
      console.log(`IN moveRelXY(${deltaX.value}, ${deltaY.value})`);
      point.moveRelative(deltaX.value, deltaY.value);
      console.log(`IN moveRelXY(${deltaX.value}, ${deltaY.value})  => point.dump(): ${point.dump()}`);
      // point.x += 0;
      changedPoint();
    };
    const resetXY = ():void => {
      console.log('IN resetXY(0, 0)');
      point.move(0, 0).rename('');
      console.log(`IN resetXY(0, 0)  => point.dump(): ${point.dump()}`);
      // point.x += 0;
      changedPoint();
    };
    // ####### watch
    // watch for parent change on property px
    watch(() => props.px, (val, oldVal) => {
      console.log(`IN WATCH px now: ${val},  before: ${oldVal}`);
      if ((val !== undefined) && (val !== oldVal)) {
        point.x = +val;
      }
    });
    // watch for parent change on property py
    watch(() => props.py, (val, oldVal) => {
      console.log(`IN WATCH py now: ${val},  before: ${oldVal}`);
      if ((val !== undefined) && (val !== oldVal)) {
        point.y = +val;
      }
    });
    // watch for parent change on property pName
    watch(() => props.pName, (val, oldVal) => {
      // remove spaces from name
      const trimVal:string = String(`${val}`).trim();
      const trimOldVal:string = String(`${oldVal}`).trim();
      console.log(`IN WATCH pName now:'${val}', before:'${oldVal}'`);
      if ((val !== undefined) && (trimVal !== trimOldVal)) {
        point.name = trimVal;
      } else {
        console.log(`IN WATCH pName -> NOTHING TO DO ! (spaces ignored) val.trim():'${trimVal}',  before:'${trimOldVal}'`);
      }
    });
    // ####### hooks
    onMounted(() => {
      console.log(`PointEdit mounted => pName:[${props.pName}](${props.px},${props.py})`);
      console.log(`PointEdit mounted => ${point.dump()}`);
    });
    return {
      point,
      deltaX,
      deltaY,
      moveRelX,
      moveRelY,
      moveRelXY,
      resetXY,
      changedPoint,
    };
  },

});
</script>
