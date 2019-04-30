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
  </div>
</template>

<script>
import NavBar from '@/components/NavBar'
import '../node_modules/materialize-css/dist/css/materialize.css'
import '../node_modules/materialize-css/dist/js/materialize.js'

export default {
  name: 'app',
  components: {
    NavBar
  },
  data() {
    return {
      currentNavPath: null,

      routesWithNoNav: [ 
        'login' 
      ],
    }
  },
  watch:{
    $route (to, from){
      this.currentNavPath = to.name.toString()

      // console.log(JSON.stringify(to))
      // console.log(this.routesWithNoNav)
      // console.log(this.routesWithNoNav[0] + ' ---> ' + (this.routesWithNoNav[0] === 'login'))
      // console.log(this.currentNavPath + ' ---> ' + (this.currentNavPath === 'login'))
      // console.log(!this.routesWithNoNav.includes(to.name))
    }
  },
  created() {

  }
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

  // background-color: #1A1B20;
  background-color: #231A2B;
  // background-color: #231A2C;
  min-height: 100vh;
}
h1, h2, h3, h4, h5, h6, label, input, div {
  font-family: 'Prompt', sans-serif !important;
}
input {
  color: #fff;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
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
</style>
