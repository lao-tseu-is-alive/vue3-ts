<style scoped lang="scss">
.pedit {
  .symbol {
    font-size: 1.8rem;
    vertical-align: bottom;
  }
  border: 1px solid black;
  padding: 1.5rem;

  input, button {
    //height: 2.5rem
  }

  @media (min-width: 400px) {
    label {
      text-align: right;
      vertical-align: middle;
    }
  }
  svg {
    $myblack:#222222;
    $myprimary: #2f94d3;
    border: 2px solid red;
    width: 100%;
    .black-line-thin {
      stroke: $myblack;
      stroke-width: 1px;
      fill:none;
    }
    .black-line-thick {
      stroke: $myblack;
      stroke-width: 3px;
      fill:none;
    }
    .black-fill {
      fill: $myblack;
    }
    .primary-line-thin {
      stroke: $myprimary;
      stroke-width: 1px;
      fill:none;
    }
    .primary-line-thick {
      stroke: $myprimary;
      stroke-width: 3px;
      fill:none;
    }
    .primary-fill {
      fill: $myprimary;
    }
  }

}
</style>

<template>
  <div class="pedit">
    <div class="row">
      <div class="six columns u-full-width">
        <p>{{ `props => pName:[${pName}]&nbsp;px,py:(${px},${py})` }}</p>
      </div>
      <div class="six columns">
        <p>name: {{getPointNameTruncaded}}, x:{{ point.x }}, y:{{ point.y }} -
          r:{{getDistanceFromOrigin.toFixed(4)}} ,
          <span class="symbol">𝜑</span>:{{getAngleinDegreeWithXAxis.toFixed(4)}} </p>
      </div>
    </div>
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
      <div class="two columns">
        <button id="resetxy" aria-keyshortcuts="x" @click="resetXY"
                class="button-primary ">reset XY
        </button>
      </div>
      <div class="two columns">
        <label class="u-pull-right">Move rel:</label>
      </div>
      <div class="one columns">
        <label for="DX">DX:</label>
      </div>
      <div class="two columns">
        <input id="DX" class="u-full-width" type="number"
               placeholder="X value" v-model.number="deltaX"/>
      </div>
      <div class="one columns">
        <button id="doDX" aria-keyshortcuts="x" @click="moveRelX"
                title="move point relative to current position"
                class="button-primary u-pull-right">move X
        </button>
      </div>
      <div class="one columns">
        <label for="DY">DY:</label>
      </div>
      <div class="two columns">
        <input id="DY" class="u-full-width" type="number"
               placeholder="Y value" v-model.number="deltaY"/>
      </div>
      <div class="one columns">
        <button id="doDY" aria-keyshortcuts="x" @click="moveRelY"
                title="move point relative to current position"
                class="button-primary u-pull-right">move Y
        </button>
      </div>
    </div>
    <div class="row">
      <div class="twelve columns u-full-width">
        <svg
          xmlns:svg="http://www.w3.org/2000/svg"
          xmlns="http://www.w3.org/2000/svg"
          :width="svgWidth"
          :height="svgHeight"
          id="svgpoint"
          :viewBox="svgViewBox">
          <line id="axex" class="black-line-thick"
                x1="50" :y1="svgCenterY" x2="450" :y2="svgCenterY"/>
          <path id="axexarrow" class="black-fill" d="M450 245 L450 255 L470 250 Z" />
          <template v-for="n in svgMaxScale" v-bind:key="n">
          <path id="axexoneunit" class="black-line-thin"
                :d="`M${svgCenterX + (n*svgScale)} 245 L${svgCenterX + (n*svgScale)} 255 `" />
          </template>
          <line id="axey" class="black-line-thick"
                :x1="svgCenterX" y1="50" :x2="svgCenterX" y2="450"/>
          <path id="axeyarrow" class="black-fill" d="M245 50 L255 50 L250 30 Z" />
          <circle class="black-line-thin" :cx="svgCenterX" :cy="svgCenterY" r="5" />
          <line id="pointr" class="primary-line-thick"
                :x1="svgCenterX" :y1="svgCenterY" :x2="svgPointX" :y2="svgPointY"/>
          <circle class="primary-line-thick" :cx="svgPointX" :cy="svgPointY" r="3" />
        </svg>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent, onMounted, ref, reactive, watch, SetupContext, computed,
} from 'vue';
import Point from '@/components/Point';

// eslint-disable-next-line no-restricted-properties
const maxUnit = (x:number):number => {
  const theNumber = Number(x).toFixed(0);
  return (10 ** (theNumber.length - 1)) * (Number(theNumber.charAt(0)) + 1);
};

export default defineComponent({
  name: 'PointEdit',
  props: {
    pName: {
      required: true,
      default: 'default',
    },
    px: {
      required: true,
      default: 0,
    },
    py: {
      required: true,
      default: 0,
    },
  },

  setup(props: { pName: string | undefined; px: number; py: number; }, ctx: SetupContext) {
    const point = reactive<Point>(new Point(props.pName, props.px, props.py));
    const deltaX = ref(1);
    const deltaY = ref(1);
    // SVG DATA
    const svgWidth = ref(500);
    const svgHeight = ref(500);
    // ####### computed props
    const getDistanceFromOrigin = computed(():number => {
      console.log(`IN COMPUTED getDistanceFromOrigin : (${point.x},${point.y})`);
      return point.getDistanceFromOrigin();
    });
    const getAngleinDegreeWithXAxis = computed(():number => {
      console.log(`IN COMPUTED getAngleinDegreeWithXAxis : (${point.x},${point.y})`);
      return point.getAngleDeg();
    });
    const getPointNameTruncaded = computed(():string => {
      console.log('IN COMPUTED getPointNameTruncaded()');
      const baseName = '';
      if ((typeof point === 'undefined') || (point.name === null)) {
        return baseName;
      }
      return `${baseName}${point.name}`;
    });
    const svgCenterX = computed(():number => {
      console.log(`IN COMPUTED getCenterX wxh: (${svgWidth.value}x${svgHeight.value})`);
      return Math.round(svgWidth.value / 2);
    });
    const svgCenterY = computed(():number => {
      console.log(`IN COMPUTED getCenterY wxh: (${svgWidth.value}x${svgHeight.value})`);
      return Math.round(svgHeight.value / 2);
    });
    const svgViewBox = computed(():string => {
      console.log(`IN COMPUTED svgViewBox wxh: (${svgWidth.value}x${svgHeight.value})`);
      return `0 0 ${svgWidth.value} ${svgHeight.value}`;
    });
    const svgMaxScale = computed(():number => {
      console.log(`IN COMPUTED svgMaxScale x,y: (${point.x}, ${point.y})`);
      const maxVal = point.x > point.y ? point.x : point.y;
      const maxScale = maxUnit(maxVal);
      console.log(`IN COMPUTED svgMaxScale maxVal:${maxVal}, maxScale:${maxScale}`);
      return maxScale;
    });
    const svgScale = computed(():number => {
      console.log(`IN COMPUTED svgScale x,y: (${point.x}, ${point.y})`);
      const maxVal = point.x > point.y ? point.x : point.y;
      const maxScale = maxUnit(maxVal);
      const scale = ((svgWidth.value / 2) / maxScale);
      console.log(`IN COMPUTED svgScale maxVal:${maxVal}, maxScale:${maxScale} scale:${scale}`);
      return scale;
    });
    const svgPointX = computed(():number => {
      console.log(`IN COMPUTED svgPointX x,y: (${point.x}, ${point.y})`);
      return Math.round(svgWidth.value / 2) + (svgScale.value * point.x);
    });
    const svgPointY = computed(():number => {
      console.log(`IN COMPUTED svgPointY x,y: (${point.x}, ${point.y})`);
      return Math.round(svgHeight.value / 2) - (svgScale.value * point.y);
    });
    // ####### methods
    const changedPoint = (): void => {
      console.log('IN changedPoint');
      ctx.emit('changePoint', point.getPoint());
    };
    const moveRelX = (): void => {
      console.log(`IN moveRelX(${deltaX.value})`);
      point.moveRelative(deltaX.value, 0);
      console.log(`IN moveRelX(${deltaX.value})  => point.dump(): ${point.dump()}`);
      // point.x += 0; // not needed because of getClonedPoint computed property ? Nope...
      // only by having a ctx.emit in changed point, reactivity works or does not work ... amazing
      // don't believe me ? comment the next line calling changedPoint and the ctx.emit
      // and you get reactivity on moveRelY but not on moveRelX
      changedPoint();
    };
    const moveRelY = (): void => {
      console.log(`IN moveRelY(${deltaY.value})`);
      point.moveRelative(0, deltaY.value);
      console.log(`IN moveRelY(${deltaY.value})  => point.dump(): ${point.dump()}`);
      // point.y += 0;
      changedPoint();
    };
    const moveRelXY = (): void => {
      console.log(`IN moveRelXY(${deltaX.value}, ${deltaY.value})`);
      point.moveRelative(deltaX.value, deltaY.value);
      console.log(`IN moveRelXY(${deltaX.value}, ${deltaY.value})  => point.dump(): ${point.dump()}`);
      // point.x += 0;
      changedPoint();
    };
    const resetXY = (): void => {
      console.log('IN resetXY(0, 0)');
      point.move(0, 0)
        .rename('');
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
      const trimVal: string = String(`${val}`)
        .trim();
      const trimOldVal: string = String(`${oldVal}`)
        .trim();
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
      getDistanceFromOrigin,
      getAngleinDegreeWithXAxis,
      getPointNameTruncaded,
      svgWidth,
      svgHeight,
      svgCenterX,
      svgCenterY,
      svgViewBox,
      svgScale,
      svgMaxScale,
      svgPointX,
      svgPointY,
      moveRelX,
      moveRelY,
      moveRelXY,
      resetXY,
      changedPoint,
    };
  },

});
</script>
