<template>
 <div class="sign-bg">
    <login-nav-bar></login-nav-bar>
    <app-main></app-main>
    <login-foo-bar></login-foo-bar>
  </div>
</template>
<script>
import { LoginNavBar, AppMain, LoginFooBar } from './components'
export default {
  name: 'LoginLayout',
  components: {
    LoginNavBar,
    AppMain,
    LoginFooBar
  }
}
</script>
