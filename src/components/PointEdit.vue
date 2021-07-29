<style scoped lang="scss">
.pedit{
  border: 1px solid black;
}
</style>

<template>
  <div class="pedit">
    <h5>{{ `PointEdit props => pName:[${pName}]&nbsp;px,py:(${px},${py})` }}</h5>
    <h5>{{point}}</h5>
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
  data() {
    return {
      point: {} as Point,
    };
  },
  mounted() {
    console.log(`PointEdit mounted => pName:[${this.pName}](${this.px},${this.py})`);
    this.point = new Point(this.pName, this.px, this.py);
  },
});
</script>
