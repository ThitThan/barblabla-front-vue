<template>
  <div id="app">
    <img src="./assets/logo.png">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
<<<<<<< HEAD
  margin-top: 60px;
=======
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
  // background-color: #231A2B;
  // background-color: #231A2C;
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
  display: flex;
}
.flex-column {
  flex-direction: column;
}
.flex-left {
  align-items: left;
}

//
// Modal
// 
.modal .modal-content {
  padding: 32px 24px;

  // max-width: 400px;
  // margin: auto;
>>>>>>> parent of 0a4321b... improve "Modal" UX for mobile
}
</style>
