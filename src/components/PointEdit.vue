<style scoped lang="scss">
.pedit{
  border: 1px solid black;
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
               placeholder="your point name" :value="point.name">
      </div>
      <div class="one columns">
        <label for="PX">X:</label>
      </div>
      <div class="three columns">
        <input id="PX" class="u-full-width" type="number"
               placeholder="X value" :value="point.x"/>
      </div>
      <div class="one columns">
        <label for="PY">Y:</label>
      </div>
      <div class="three columns">
        <input id="PY" class="u-full-width" type="number"
               placeholder="Y value" :value="point.y"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Point from '@/components/Point';

export default defineComponent({
  name: 'PointEdit',
  props: {
    pName: { type: String, default: '' },
    px: { type: Number, default: 0 },
    py: { type: Number, default: 0 },
  },
  watch: {
    px: 'updateX',
  },
  data() {
    return {
      point: {} as Point,
    };
  },
  methods: {
    updateX(first:number, second:number) {
      console.log(`IN WATCH px ${first} => ${second}`);
      this.point.x = first;
    },
  },
  mounted() {
    console.log(`PointEdit mounted => pName:[${this.pName}](${this.px},${this.py})`);
    this.point = new Point(this.pName, this.px, this.py);
  },
});
</script>
