<template>
  <dl>
    <dt>{{labelName}}：</dt>
    <dd>
      <div><a :class="{'current':value.length === 0 }" @click="select('', '全部')">全部</a></div>
      <div><a v-for="option in options" :key="option.VALUE" @click="select(option.VALUE, option.NAME)" :class="{'current': value.includes(option.VALUE)}">{{option.NAME}}</a></div>
    </dd>
  </dl>
</template>

<script>
export default {
  name: 'filtersOption',
  props: ['labelName', 'options', 'selected'],
  data: function () {
    return {
      value: this.selected,
      o: [{}]
    }
  },
  methods: {
    select: function (v, n) {
      //判断是否存在数据中 存在就是删除操作
      if(n === '全部'){
        this.value = []
        this.o = [{}]
      } else if (v !== '' && this.value.includes(v)){
        this.value = this.value.filter(t => t !== v)
        this.o = this.o.filter(t => t.value !== v)
      } else if(v !== ''){
        this.o.push({
          value: v,
          name: n
        })
        this.value.push(v)
      }
      console.log(this.value)
      this.$emit('option', this.o)
    }
  }
}
</script>

<style scoped>

</style>
