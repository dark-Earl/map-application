<template>
  <div>
    <nav-bar></nav-bar>
    <app-main></app-main>
    <foo-bar></foo-bar>
  </div>
</template>
<script>
import { NavBar, AppMain, FooBar } from './components'
export default {
  name: 'BlankLayout',
  components: {
    NavBar,
    AppMain,
    FooBar
  }
}
</script>
