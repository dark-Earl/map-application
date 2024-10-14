<template>
    <div>
      <map-annotation-test :visible="visible"></map-annotation-test>
    </div>
</template>

<script>
import mapAnnotationTest from '@/pages/mapModule/views/mapAnnoTest'

export default {
  name: "mapAnno",
  components: {
    mapAnnotationTest
  },
  data(){
    return {
      visible: true
    }
  },
  methods: {
    boot(){
      this.visible = !this.visible
    }
  }
}
</script>

<style scoped>

</style>
