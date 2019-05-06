
<template>
  <div class="about container">
    <a class='waves-effect waves-light btn-small deep-purple darken-2' 
      @click="performLogout()">
      ล้อคเอาท์
    </a>

    <h3>This is the test page</h3>

    <input placeholder="ชื่อ" v-model='name'>

    <div>{{ name }}</div>
  </div>
</template>

<script>
import Parse from 'parse'
export default {
  data() {
    return {
      name: '...'
    }
  },
  created() {
    this.name = '5555'
  },
  methods: {
    performLogout() {
      Parse.User.logOut().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    hello() {
      alert('Hello!')
    }
  }
}
</script>
