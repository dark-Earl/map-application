<template>
  <div>
    <nav-bar></nav-bar>
    <!--<a-carousel autoplay :after-change="onChange" dot-position="left" dots="false" style="width:1200px;margin:20px auto -20px auto">-->
      <!--<div class="tr red"><a-icon type="sound" theme="filled" /> 待办通知：1XXXXXXXXXX</div>-->
      <!--<div class="tr red"><a-icon type="sound" theme="filled" /> 待办通知：2XXXXXXXXXX</div>-->
      <!--<div class="tr red"><a-icon type="sound" theme="filled" /> 待办通知：3XXXXXXXXXX</div>-->
    <!--</a-carousel>-->
    <div class="main" style="display: flex;">
      <main-left-tourist class="user-left" style='flex-shrink: 0;' v-if="role === 'Tourist'"></main-left-tourist>
      <main-left-member class="user-left" style='flex-shrink: 0;' v-else-if="role === 'Member'"></main-left-member>
      <main-left-expert class="user-left" style='flex-shrink: 0;' v-else-if="role === 'Expert'"></main-left-expert>
      <main-left-enterprise class="user-left" style='flex-shrink: 0;' v-else-if="role === 'Enterprise'"></main-left-enterprise>
      <main-left-bank class="user-left" style='flex-shrink: 0;' v-else-if="role === 'Bank'"></main-left-bank>
      <main-left-supervise class="user-left" style='flex-shrink: 0;' v-else-if="role === 'Supervise'"></main-left-supervise>
      <main-left class="user-left" style='flex-shrink: 0;' v-else></main-left>
      <app-main class="user-right"></app-main>
    </div>

    <foo-bar></foo-bar>
  </div>
</template>
<script>
import { NavBar, MainLeft, MainLeftTourist,MainLeftMember,MainLeftExpert, MainLeftEnterprise,MainLeftBank,
  MainLeftSupervise,AppMain, FooBar } from './components'
export default {
  name: 'TypicalLayout',
  components: {
    NavBar,
    MainLeft,
    MainLeftTourist,
    MainLeftMember,
    MainLeftExpert,
    MainLeftEnterprise,
    MainLeftBank,
    AppMain,
    FooBar,
    MainLeftSupervise
  },
  computed: {
    role: function () {
      return localStorage.getItem('role')
    }
  }
}
</script>
