<template>
  <div class='nav-dark z-depth-1 valign-wrapper'>
    <!-- [DESKTOP] LOGO -->
    <router-link v-show='windowWidth > 540' to='/'>
      <img src='@/assets/refeel-logo.png' style='height: 36px'/>
    </router-link>

    <!-- [MOBILE] LOGO & LOGOUT -->
    <div v-show='windowWidth <= 540'
      id='app-bar'
      style='width: 100%; padding-top: 8px;'>
      <router-link to='/'>
        <img src='@/assets/refeel-logo.png' style='height: 36px'/>
      </router-link>

      <a class='waves-effect waves-light btn-small deep-purple darken-2 right' @click="performLogout()">ล้อคเอาท์</a>
    </div>
    
    <!-- TAB -->
    <ul ref='tabs' class="tabs tabs-transparent left" :style="'width: ' + (windowWidth > 540 ? 'fit-content':'100%')">

      <li v-for='tab in tabs'
        v-bind:key='tab.name'
        :class="'tab ' + ($route.path === tab.path ? 'active':'')">

        <router-link :to='tab.path'
          :class="$route.path === tab.path ? 'active':''">
          <!-- {{ $route.path + ' ' + tab.name }} -->
          {{ tab.name }}
        </router-link>

      </li>

    </ul>

    <!-- [DESKTOP] LOGOUT -->
    <a v-show='windowWidth > 540' 
      class='waves-effect waves-light btn-small deep-purple darken-2 right' 
      @click="performLogout()">
      ล้อคเอาท์
    </a>

  </div>

</template>

<script>
// COMPONENTS
import { Component, Vue } from 'vue-property-decorator';

// PARSE
import Parse from 'parse'
// const Username = Parse.Object.extend("Username")

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
          path : '/manage/tables',
          name : 'จัดการโต๊ะ',
        },
        {
          path : '/manage/staffs',
          name : 'จัดการสตาฟ',
       
        },
         {
          path : '/manage/customer',
          name : 'รายชื่อลูกค้า',
          
        },
        // {
        //   path : '/test',
        //   name : 'test',
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
    // console.log(this.user)
    if (this.user) {
      this.user.fetch();
    }
    
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
.nav-dark {
  background: #1F1623;
  /* background: #1B0F27; */
  padding: 0px 12px;

  min-height: 48px;

  display: flex;
  flex-wrap: wrap;

  z-index: 999;
}
#app-bar {
  display: flex;
  justify-content: space-between;
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
