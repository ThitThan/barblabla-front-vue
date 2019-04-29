<template>
  <div>
    <nav class="nav-extended navbar-fixed nav-dark">
      <div class="nav-wrapper">
        <ul class="tabs tabs-transparent left" style='width: fit-content'>
          <li>
            <router-link to='/'>
              <img src='@/assets/refeel-logo.png' style='height: 48px'/>
            </router-link>
          </li>
          <li v-for='tab in tabs'
            v-bind:key='tab.name'
            class='tab'>
            <router-link :to='tab.path'>{{ tab.name }}</router-link>
          </li>
        </ul>
        <!-- <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a> -->
        <ul id="nav-mobile" class="right">
          <li>
            <a class="waves-effect waves-light btn deep-purple darken-2" @click="performLogout()">ล้อคเอาท์</a>
          </li>
          
          <!-- <button class="waves-effect waves-light btn deep-purple darken-2" type='submit' v-show='!isLoading' >ล้อคเอ้าท์</button> -->
        </ul>
      </div>
    </nav>

    <!-- <ul class="sidenav" id="mobile-demo">
      <li><a href="sass.html">Sass</a></li>
      <li><a href="badges.html">Components</a></li>
      <li><a href="collapsible.html">JavaScript</a></li>
    </ul> -->

  </div>
</template>

<script>
// COMPONENTS
import { Component, Vue } from 'vue-property-decorator';

// PARSE
import Parse from 'parse'
const Username = Parse.Object.extend("Username")

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
    // this.$refs['tabs'].tabs();
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
