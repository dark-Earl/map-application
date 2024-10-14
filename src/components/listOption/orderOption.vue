<template>
  <a
    :class="{ up: value === up, down: value === down }"
    @click="sortSwitch()"
  >{{labelName}}
    <span class="asort-bar-sorter">
      <div class="sort-bar-sorter-inner">
        <a-icon type="caret-up" />
        <a-icon type="caret-down" />
      </div>
    </span>
  </a>
</template>

<script>
export default {
  name: 'orderOption',
  props: ['labelName', 'up', 'down', 'value'],
  data: function () {
    return {
      fvalue: ''
    }
  },
  created() {
  },
  methods: {
    sortSwitch: function () {
      if (this.value !== this.up) {
        this.fvalue = this.up
      } else if (this.value !== this.down) {
        this.fvalue = this.down
      }
      this.$emit('changeSort', this.fvalue)
    }
  }
}
</script>

<style scoped>

</style>
