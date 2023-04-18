<template>
 <div class="dynamicForm">
  <form @submit.prevent>
    <div v-for="field in fields" :key="field.key">
      <div class="row">
        <div class="four columns u-full-width">
          <label :for="field.key">{{ field.label }}</label>
        </div>
        <div class="eight columns">
          <input class="u-full-width" :type="field.type" :id="field.key" :name="field.key" v-model="form[field.key]" />
        </div>
      </div>
    </div>
    <div class="row">
      <div class="six columns u-full-width">
        <div>Messages</div>
      </div>
      <div class="six columns ">
        <button class="u-pull-right" type="submit">SAVE</button>
      </div>
    </div>
  </form>
   <div class="row">
     <div class="twelve columns u-full-width">
       <textarea rows="20" class="u-full-width" >{{getFormData}}</textarea>
     </div>
   </div>
</div>
</template>

<script lang="ts">
import {computed, defineComponent, ref, SetupContext} from 'vue';

interface Field {
  key: string;
  label: string;
  type: string;
}

export default defineComponent({
  name: 'DynamicForm',
  props: {
    schema: {
      type: Object as () => Record<string, unknown>,
      required: true,
    },
  },
  setup(props: {schema: Record<string, unknown>}, ctx: SetupContext){
    const form =ref({} as Record<string, unknown> );

    const getFormData = computed(():string=>{return  JSON.stringify(form.value, null, 2)})
    const fields = computed(():Field[] => {
       const tempFields: Field[] = [];
      for (const [key, value] of Object.entries(props.schema.properties)) {
        tempFields.push({
          key,
          label: (value as { title?: string }).title || key,
          type: (value as { type?: string }).type || 'text',
        });
      }
      return tempFields;
    })
    return {form, getFormData, fields}
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

  input, button {
    //height: 2.5rem
  }

  @media (min-width: 400px) {
    label {
      text-align: right;
      vertical-align: middle;
    }
  }
}
</style>
