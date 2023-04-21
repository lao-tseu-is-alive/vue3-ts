<template>
  <div class="dynamicForm">
    <form @submit.prevent>
      <div v-for="field in fields" :key="field.key">
        <div class="row">
          <div class="four columns u-full-width">
            <label :for="field.key">{{ field.label }} : </label>
          </div>
          <div class="eight columns">
            <input class="u-full-width" :type="field.type" :id="field.key" :name="field.key" v-model="form[field.key]"/>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="six columns u-full-width">
          <div>Messages</div>
        </div>
        <div class="six columns ">
          <button class="u-pull-right" type="submit" @click="saveFormData">SAVE</button>
        </div>
      </div>
    </form>
    <div class="row">
      <div class="twelve columns u-full-width">
        <textarea rows="20" class="u-full-width">{{getFormData}}</textarea>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, SetupContext} from 'vue';
import {basicSchemaTypes, fieldInfo,} from './FormSchema';

interface Field {
  key: string;
  label: string;
  type: string;
}


export default defineComponent({
  name: 'DynamicForm',
  props: {
    schema: {
      type: Object as () => Record<string, fieldInfo>,
      required: true,
    },
  },
  setup(props: { schema: Record<string, fieldInfo> }, ctx: SetupContext) {
    const form = ref({} as Record<string, unknown>);

    // ####### computed props
    const getFormData = computed((): string => {
      console.log(`IN COMPUTED getFormData form: (${form.value})`);
      return JSON.stringify(form.value, null, 2)
    })
    const fields = computed((): Field[] => {
      console.log(`IN COMPUTED fields `);
      const tempFields: Field[] = [];
      for (const [key, value] of Object.entries(props.schema)) {
        let currentFieldInfo: fieldInfo = value as fieldInfo
        const currentInputType = getInputType(currentFieldInfo);
        console.log(`key: ${key}, type:${currentFieldInfo.type},  currentInputType:${currentInputType}`)
        tempFields.push({
          key,
          label: (value as { title?: string }).title || key,
          type: currentInputType,
        });
      }
      return tempFields;
    }) // end of computed fields()

    // ####### methods
    const getInputType = (fieldInformation: fieldInfo) => {
      let inputType = fieldInformation.type;
      switch (inputType) {
        case basicSchemaTypes.boolean:
          return "checkbox";
        case basicSchemaTypes.integer:
        case basicSchemaTypes.number:
          return "number";
        case basicSchemaTypes.string:
          switch  (fieldInformation.type !== basicSchemaTypes.boolean ? fieldInformation.format :"") {
            case "email":
              return "email";
            case "date":
            case "datetime":
              return "date";
            case "time":
              return "time";
            default:
              return "text";
          }
      }
      return "text"
    }
    const saveFormData = (): void => {
      console.log('IN saveFormData');
      ctx.emit('saveFormData', Object.assign({},form.value));
    };
    return {form, getFormData, fields, saveFormData}
  } // end of setup
});
</script>

<style scoped lang="scss">
.dynamicForm {
  .symbol {
    font-size: 1.8rem;
    vertical-align: bottom;
  }

  border: 1px solid black;
  padding: 1.5rem;

  input {
    height: 2.8rem
  }

  @media (min-width: 550px) {
    label {
      text-align: right;
      vertical-align: middle;
    }
  }
}
</style>
