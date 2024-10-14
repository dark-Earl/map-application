<template>
<div>
  <baner-box></baner-box>
  <div class="main">
    <map-box></map-box>
    <enter-box></enter-box>
    <news-box></news-box>
    <company-box></company-box>
    <pre-box></pre-box>
    <adv-box></adv-box>
   </div>
   <!--<fixed-side></fixed-side>-->
</div>
</template>
<script>
import banerBox from '@/pages/home/components/BanerBox'
import mapBox from '@/pages/home/components/MapBox'
import enterBox from '@/pages/home/components/EnterBox'
import newsBox from '@/pages/home/components/NewsBox'
import companyBox from '@/pages/home/components/CompanyBox'
import preBox from '@/pages/home/components/PreBox'
import advBox from '@/pages/home/components/AdvBox'
import fixedSide from '@/pages/home/components/FixedSide'
export default {
  data () {
    return {
      navStat: 'index',
      checked1: false,
      checked2: false,
      checked3: false,
    }
  },
  components: {
    banerBox,
    fixedSide,
    enterBox,
    mapBox,
    newsBox,
    companyBox,
    preBox,
    advBox
  },
  created () {
  },
  methods: {
       handleChange(checked) {
      console.log(checked);
    },
  }
}
</script>
