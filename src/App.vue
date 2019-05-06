<template>
  <div id="app">
    <!-- <div id="nav" v-if='!routesWithNoNav.includes($route.name)'>
      <h1>{{ $route.name }}</h1>
      <h3>{{ currentNavPath }}</h3>
      <h5>{{ !routesWithNoNav.includes($route.name) }}</h5>
      <router-link to="/">XXX</router-link> |
      <router-link to="/about">About</router-link>
    </div>
    <div v-else>
      Login
    </div> -->

    <NavBar class='i-nav sticky' v-if='$route.name && !routesWithNoNav.includes($route.name)' :currentNavPath="currentNavPath"/>
    <transition name='slide-fade' mode='out-in'>
      <router-view ref='router'/>  <!-- ห้ามลบ!! เอาไว้โหลดหน้าอื่นๆ มาแสดง -->
    </transition>

    <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Prompt" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Overpass+Mono" rel="stylesheet">

  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import '../node_modules/materialize-css/dist/css/materialize.css'
import '../node_modules/materialize-css/dist/js/materialize.js'

import Parse from 'parse'

export default {
  name: 'app',
  components: {
    NavBar
  },
  data() {
    return {
      currentNavPath: null,

      routesWithNoNav: [ 
        'login',
        'customers-reservation',
        'staff-home',
      ],

      staffRoutes: [
        'staff-home',
      ],

      publicRoutes: [
        'login',
        'customers-reservation',
      ],
    }
  },
  watch:{
    $route (to, from){
      this.currentNavPath = to.name.toString()

      this.checkUserPermission()
    }
  },
  created() {
    this.checkUserPermission()
  },
  methods: {
    async checkUserPermission() {
      if (this.currentNavPath) {
        let user = Parse.User.current()
        // console.log(user)
        
        // check login
        console.log(this.currentNavPath)
        if (user === null && !this.publicRoutes.includes(this.currentNavPath)) {
            this.$router.push('/login')
        }
        else if (!this.publicRoutes.includes(this.currentNavPath)) {
          await user.fetch()
          let isAdmin = user.get('isAdmin')
          // console.log(isAdmin)
          // check admin
          if (isAdmin !== true && !this.staffRoutes.includes(this.currentNavPath)) {
            this.$router.push('/staff/home')
          }
        }
      }
    }
  },
}
</script>

<style lang='scss'>
#app {
  // font-family: 'Avenir', Helvetica, Arial, sans-serif;
  font-family: 'Prompt', sans-serif !important;
  // font-family: 'K2D', sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff80;

  min-height: 100vh;
}
html {
  // background-color: #1A1B20;
  background-color: #231A2B;
  // background-color: #231A2C;
}
h1, h2, h3, h4, h5, h6, label, input, div, button {
  font-family: 'Prompt', sans-serif !important;
}
input {
  color: #fff;
}
input::placeholder {
  color: #ffffff4d;
}
label {
  font-size: 0.9rem;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
  margin-top: 60px;

}

#nav a.router-link-exact-active {
  color: #42b983;
}


// transitions
.fade-enter-active, .fade-leave-active {
  transition: opacity .2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}
.slide-fade-enter-active {
  transition: all .25s ease-out;
}
.slide-fade-leave-active {
  transition: all .025s ease-out;
  // transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active below version 2.1.8 */ {
  transform: translateY(10px);
  opacity: 0;
}


// Nav-sticky
.sticky {
  position: sticky;
  top: 0;
  left: 0;
}
.i-nav {
  width: 100vw;
  max-width: 100%;
}

//
// Dark Theme overrides
//
.tabs.tabs-transparent .indicator {
  background-color: #fff;
}
.collection {
  border: 1px solid #e0e0e020;
}
.collection .collection-item {
  // background: #1B0F27;
  background: #ffffff0a;
  border-bottom: 1px solid #e0e0e020;
}
.btn-flat {
  color: #ffffff80;
}
.modal {
  background-color: #1A1B20;
  // overflow: hidden;
  -ms-overflow-style: none;  // IE 10+
  scrollbar-width: none;  // Firefox
  // background-color: #231A2B;
  // background-color: #231A2C;
}
.modal::-webkit-scrollbar { 
    display: none;  // Safari and Chrome
}
.card {
  background-color: #24202F;
  border-radius: 12px;
}

// .input:not(.browser-default):focus {
//   border-bottom-color: #ffc107;
// }

//
// Bootstrap badge
//
.i-badge {
  display: inline-flex;
  padding: .25em .4em;
  font-size: 75%;
  font-weight: 700;
  line-height: 1;
  text-align: center;
  white-space: nowrap;
  vertical-align: baseline;
  border-radius: .25rem;
  transition: color .15s ease-in-out,background-color .15s ease-in-out,border-color .15s ease-in-out,box-shadow .15s ease-in-out;
}
.i-badge-pill {
  padding-right: .6em;
  padding-left: .6em;
  border-radius: 10rem;
}
.i-badge-warning {
  color: #212529;
  background-color: #ffc107;
}
.i-badge-dark {
  color: #fff;
  // background-color: #85797933;
  background-color: #ffffff20;
}


// 
// Button
// 
i.left {
  margin-right: 8px;
}

//
// FAB
//
.i-item {
  padding: 4px 0;
}
.i-icon {
  font-size: 15px!important;
  margin-right: 4px;
}
.i-fab {
  margin: 24px 0;
}

// 
// Wave effects override
// 
.collection .waves-effect {
  display: inherit;
}

// 
// Flex
// 
.flex {
  display: flex!important;
}
.flex-column {
  flex-direction: column;
}
.flex-left {
  align-items: flex-start;
}

//
// Modal
// 
.modal .modal-content {
  padding: 32px 24px;

  // max-width: 400px;
  // margin: auto;
}
.modal {
  max-width: 540px;
  // max-height: 80%;

  top: 5% !important;
  max-height: 90%;
}
@media only screen and (max-width: 640px) {
  .modal {
    width: 90%;
  }
}
</style>
