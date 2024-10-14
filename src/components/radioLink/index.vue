<template>
    <a v-text="text" :class="{'current':checked1}" @click="checkEvent(checked1)"></a>
</template>
<script>
export default {
  name: 'radioLink',
  props: ['text', 'val', 'filter'],
  data: function () {
    return {
    }
  },
  model: {
    prop: 'filter',
    event: 'change-filter'
  },
  methods: {
    checkEvent: function (e) {
      let _this = this
      if (_this.checked1) { // 选中->不选中
        this.$emit('change-filter', '')
      } else { // 不选中 ->选中
        this.$emit('change-filter', _this.val)
      }
    }
  },
  computed: {
    checked1: {
      get () {
        return this.filter === this.val
      }
    }
  }

}
</script>
