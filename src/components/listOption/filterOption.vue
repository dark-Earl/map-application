<template>
  <dl>
    <dt>{{labelName}}：</dt>
    <dd>
      <div><a :class="{'current':value == ''}" @click="select('', '全部')">全部</a></div>
      <div>
        <template v-if="special">
          <a v-for="option in options" :key="option.VALUE" @click="selectBK(option)" :class="{'current': value == option.VALUE}">{{option.NAME}}</a>
        </template>
        <template v-else>
          <a v-for="option in options" :key="option.VALUE" @click="select(option.VALUE, option.NAME)" :class="{'current': value == option.VALUE}">{{option.NAME}}</a>
        </template>
      </div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'filterOption',
  props: ['labelName', 'options', 'selected','special'],
  data: function () {
    return {
      value: this.selected,
      o: {},
      p: {}
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
    },
    selectBK: function (v) {
      this.p = v
      this.value = v.VALUE
      this.$emit('option', this.p)
    },
  }
}
</script>

<style scoped>

</style>
