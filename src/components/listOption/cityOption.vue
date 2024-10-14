<template>
  <dl>
    <dt>{{labelName}}：</dt>
    <dd>
      <div><a :class="{'current':value == ''}" @click="select('', '全部')">全部</a></div>
      <div>
        <a v-for="option in options" :key="option.VALUE" @click="select(option.VALUE, option.NAME)" :class="{'current': value == option.VALUE}">{{option.NAME}}</a>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'cityOption',
  props: ['labelName', 'options', 'selected','value'],
  data: function () {
    return {
      // value: this.selected,
      o: {}
    }
  },
  methods: {
    select: function (v, n) {
      this.o = {
         value: v,
         name: n
      }
      this.value = v
      this.$emit('option', this.o)
    }
  }
}
</script>

<style scoped>

</style>
