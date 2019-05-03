<template>
  <div class="container">
    <!-- current user dialog -->
    <!-- <Modal v-model='showDialog' @close='saveUserData(user, false)'> -->
    <Modal v-model='showDialog' @close='selectedUser = null'>
      <StaffDetail v-model='selectedUser' @save='closeDetailDialog($event)' @destroy='closeDetailDialog($event)'/>
    </Modal>

    <!-- titles -->
    <h2>สตาฟ</h2>
    <h6>{{ users.length }} คน</h6>
    <br>

    <!-- หมุนๆ ตอนโหลด -->
    <div id='loading' v-if='isLoading'>
      <div v-show='isLoading'>
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-yellow-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div id='content' v-else>
      <!-- ลิสสตาฟ -->
      <ul class='collection' v-if='users.length > 0'>

        <!-- แต่ละแถว -->
        <li class='collection-item waves-effect waves-light'
          v-for='u in users' 
          v-bind:key='u.id'
          @click='showViewDialog(u)'>

          <div class='i-item' align='left'>
            <!-- username -->
            <div id='username'>
              {{ u.get('username') }}

              <!-- you -->
              <span v-if='u.id === currentUser.id'>(คุณ)</span>

              <!-- admin / employee -->
              <div id='' class='right i-badge i-badge-pill i-badge-warning valign-wrapper' v-if="u.get('isAdmin')">
                <i class="material-icons i-icon">remove_red_eye</i>
                ผู้ดูแลระบบ
              </div>
              <span id='' class='right i-badge i-badge-pill i-badge-dark valign-wrapper' v-else>
                พนักงาน
              </span>

            </div>

            <!-- role -->
            <div id='role'>
            </div>
          </div>

        </li>
      </ul>

      <div v-else>
        ไม่มีสตาฟ กด + เพื่อเพิ่ม
      </div>

      <!-- ปุ่ม + -->
      <a class="btn-floating btn-large waves-effect waves-light deep-purple darken-2 i-fab"
        @click='showAddDialog()'>
        <i class="material-icons">add</i>
      </a>

    </div>
  </div>
</template>

<script>
import Parse from 'parse'
import Modal from '@/components/Modal'
import StaffDetail from '@/components/manage/StaffDetail';

export default {
  components: {
    Modal,
    StaffDetail,
  },
  data() {
    return {
      isLoading: false,

      users: [],
      currentUser: null,

      showDialog: false,
      selectedUser: null,
    }
  },
  watch: {
    showDialog(newVal, oldVal) {
      if (newVal === false) {
        console.log('close!!')
        this.selectedUser = undefined     // set to undefined to clear the form (null is for adding new user, an obj is for editing existing user)
        // this.selectedUser = null
      }
    },
  },
  created() {
    // load name from db
    this.loadUsers()
  },
  methods: {
    async loadUsers() {
      this.isLoading = true

      // Get all users
      const query = new Parse.Query(Parse.User)
      query.descending('isAdmin')   // show admin first, then regular staffs (true > false, so descending)
      let users = await query.find()

      // Get the current users
      let currentUser = Parse.User.current()

      this.currentUser = currentUser
      this.users = users
      this.isLoading = false
    },
    showAddDialog() {
      this.selectedUser = null
      this.showDialog = true
    },
    showViewDialog(user) {
      this.selectedUser = user
      this.showDialog = true
    },

    closeDetailDialog() {
      this.showDialog = false
      // this.selectedUser = null

      this.loadUsers()  // update the user list
    },
  }
}
</script>

<style scoped>
#username {
  font-size: 19px;
}
#role {
  /* font-size: 1px; */
}
</style>

