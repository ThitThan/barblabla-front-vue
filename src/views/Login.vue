<template>
  <div id="login">
    <!-- <OtpSender /> -->
    <LoginForm/>
  </div>
</template>

<script>
// COMPONENTS
// import login from './components/login.vue'
// import OtpSender from '@/components/OtpSender.vue'
import LoginForm from '@/components/LoginForm.vue'

// PARSE
import Parse from 'parse'

export default {
  name: 'login',
  components: {
    // login,
    LoginForm
  },
  created () {
    // Check if the user had already logged in
    Parse.User.currentAsync().then((user) => {
      if (user) {
        this.$router.push({ path: '/' })
      }
    })
  }
}
</script>

<style>
#login {
  /* height: 20%; */
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* background: #24202F; */
  /* padding-top: 96px; */
  /* padding-bottom: 96px; */

  flex: 0;
  flex-direction: column;
  justify-items: center;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  max-height: 100%;

  display: flex;
}
</style>
