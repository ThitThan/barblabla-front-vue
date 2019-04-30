<template>
  <div>
    <!-- dropdown -->
    <ul id="dropdown1" class="dropdown-content">
      <li><a href="#!">one</a></li>
      <li><a href="#!">two</a></li>
      <li class="divider"></li>
      <li><a href="#!">three</a></li>
    </ul>

    <div class='nav-dark'>
      <router-link to='/'>
        <img src='@/assets/refeel-logo.png' style='height: 48px'/>
      </router-link>

      <ul ref='tabs' class="tabs tabs-transparent left" :style="'width: ' + (windowWidth > 540 ? 'fit-content':'100%')">

        <li v-for='tab in tabs'
          v-bind:key='tab.name'
          class='tab'>
          <router-link :to='tab.path'>{{ tab.name }}</router-link>
        </li>

        <li><a class="dropdown-trigger" href="#!" data-target="dropdown1">Dropdown<i class="material-icons right">arrow_drop_down</i></a></li>

      </ul>
      <!-- <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a> -->
      <ul id="nav-mobile" class="right">
        <li>
          <!-- <a class="waves-effect waves-light btn deep-purple darken-2" @click="performLogout()">ล้อคเอาท์</a> -->
          <a class="waves-effect waves-light btn deep-purple darken-2" @click="performLogout()">ล้อคเอาท์</a>
        </li>
      </ul>
    </div>

  </div>
</template>

<script>
// COMPONENTS
import { Component, Vue } from 'vue-property-decorator';

// PARSE
import Parse from 'parse'
const Username = Parse.Object.extend("Username")

// Materialize
import '../../node_modules/materialize-css/dist/js/materialize.js'

export default ({
  name: 'navbar',
  components: {
    // StoreName
  },
  data() {
    return {
      // store: '&nbsp;',
      // name: '&nbsp;',
      merchant: null,
      brandColor: '#ababab',

      tabs: [
        {
          path : '/',
          name : 'หน้าหลัก',
        },
        {
          path : '/about',
          name : 'เกี่ยวกับ',
        },
        // {
        //   path : '/history',
        //   name : 'ประวัติ',
        // },
      ],

      windowWidth: 0,
    }
  },
  props: {
    currentNavPath: {
      type: String,
      default: null,
    }
  },
  methods: {
    // navigateTo(link) {
    //  
    //  this.$router.push({ path: link, params: { }})
    // 
    //},
    performLogout() {
      Parse.User.logOut().then(() => {
        this.$router.push({ path: '/login' })
      })
    },

    handleResize() {
      this.windowWidth = window.innerWidth;
      // this.window.height = window.innerHeight;
    }
  },
  beforeCreate() {
    this.user = Parse.User.current();
    
    // Check if the user had logged in
    if (!this.user) {
      this.$router.push({ path: '/login' })
      console.log('Not logged in')
    }

    // watch window size
    window.removeEventListener('resize', this.handleResize)
  },
  created() {
    if (this.user) {
      // grab some data
    }

    // watch window size
    window.addEventListener('resize', this.handleResize)
    this.handleResize()
  },
  mounted() {
    // init tabs
    // console.log(JSON.stringify(this.$refs['tabs']))
    // this.$refs['tabs'].tabs()

    var instance = M.Tabs.init(this.$refs['tabs'], []);
  },
})
// export default class Home extends Vue {}
</script>

<style>
#title {
  font-size: 21px;
}
#home {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  background: #f9f9f9;
  /* padding-top: 96px; */
  /* padding-bottom: 96px; */
}
.nav-dark {
  /* background: #ffffff; */
  background: #1F1623;
  padding-top: 8px;
  padding-bottom: 8px;
}

.dz-tabnav {
  padding: 0;
}
.dz-tabnav-item {
  padding: 4px 4px !important;
  font-size: 14px !important;
}
/* .dz-tabnav-item {
  font-size: 16px !important;
} */
@media screen and (min-width: 664px) {
  .dz-tabnav-item {
    padding: 4px 10px !important;

    font-size: 15px !important;
  }
}

.uk-subnav-pill .uk-active a {
  background-color: #FFF59D;
  color: #000000bb;
}
.uk-subnav-pill a {
  letter-spacing: 0.9px;
}

.dz-bottom-border {
  border-bottom: 2px solid #ebebeb;
}
</style>
