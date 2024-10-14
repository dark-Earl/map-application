<template>
  <div>
    <a-form-model-item v-bind:disabled="view" :ref="field" :label="label" :prop="field" :label-col="{ span: labelCol }"
                       :wrapper-col="{ span: wrapperCol }">
      <a-tooltip :trigger="['focus']" placement="topLeft" overlay-class-name="numeric-input">
        <template v-if="unit === '股'"></template>
        <span v-else-if="unit === '万元'" slot="title" class="numeric-input-title">
              {{convertNumberToChinesePrice(value*10000,'元')}}
        </span>
        <span v-else-if="value" slot="title" class="numeric-input-title">
              {{convertNumberToChinesePrice(value,unit)}}
        </span>
        <template v-else slot="title">
          {{emptyTips}}
        </template>
        <input v-bind:value="formatValue"
               v-on:input="updatevalue($event.target.value)"
               v-on:blur="onBlur"
               v-on:focus="selectAll"
               v-bind:disabled="view" class="ant-input"/>
      </a-tooltip>
    </a-form-model-item>
  </div>
</template>

<script>
import accounting from "accounting"
import {convertNumberToChinesePrice} from '@/utils/baseUtils'
export default {
  name: 'CurrencyInput',
  props: {
    field :'',
    label : '',
    emptyTips: '',
    labelCol: {
      type: [String, Number],
      default: 9
    },
    wrapperCol: {
      type: [String, Number],
      default: 15
    },
    unit: {
      type: String,
      default: '元'
    },
    value: {
      type: [String, Number],
      default: 0,
      desc: "数值",
    },
    symbol: {
      type: String,
      default: "",
      desc: "货币标识符",
    },
    decimal: {
      type: Number,
      default: 2,
      desc: "小数位",
    },
    view: {
      type: Boolean,
      default: false,
      desc: "是否禁止",
    },
  },
  data() {
    return {
      focused: false,
    };
  },
  computed: {
    formatValue() {
      if (this.focused) {
        //return this.value ? accounting.unformat(this.value) : "";
        return this.value;
      } else {
        if (this.value === 0) {
          return accounting.formatMoney(this.value, this.symbol, this.decimal);
        } else if (
          this.value === "" ||
          this.value === null ||
          this.value === undefined
        ) {
          return "";
        } else {
          return accounting.formatMoney(this.value, this.symbol, this.decimal);
        }
      }
    },
  },
  watch: {
    value(val) {if (this.validateEvent) {
      this.dispatch("ElFormItem", "el.form.change", [val]);
    }
    },
  },
  methods: {
    convertNumberToChinesePrice,

    updatevalue(value) {
      //var formatvalue = !!value ? accounting.unformat(value) : "";
      let maxLength = 14
      let maxSmallLength = this.decimal
      if (value.indexOf('.') === -1) {
        value = Number(String(value).substring(0, maxLength))
      } else {
        let parts = value.split('.')
        parts[0] = parts[0].substring(0, maxLength)
        parts[1] = parts[1].substring(0, maxSmallLength)
        value = Number(parts[0] + '.' + parts[1])
      }

      this.$emit("input", value)
    },
    onBlur() {
      this.focused = false;
      this.$emit("blur");
      this.dispatch("ElFormItem", "el.form.blur", [this.value]);
    },
    selectAll(event) {
      this.focused = true;
      setTimeout(() => {
        event.target.select();
      }, 0);
    },

    dispatch(componentName, eventName, params) {
      var parent = this.$parent || this.$root;
      var name = parent.$options.componentName;

      while (parent && (!name || name !== componentName)) {
        parent = parent.$parent;

        if (parent) {
          name = parent.$options.componentName;
        }
      }
      if (parent) {
        parent.$emit.apply(parent, [eventName].concat(params));
      }
    },
  },
};
</script>
