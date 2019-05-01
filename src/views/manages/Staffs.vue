<template>
  <div class="about container">
    <h2>สตาฟ</h2>
    <h6>{{ users.length }} คน</h6>
    <br>

    <!-- หมุนๆ ตอนโหลด -->
    <div id='loading' v-if='isLoading'>
      Loading..
    </div>

    <div id='content' v-else>
      <!-- ลิสสตาฟ -->
      <ul class='collection' v-if='users.length > 0'>

        <!-- แต่ละแถว -->
        <li class='collection-item'
          v-for='u in users' 
          v-bind:key='u.id'>

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
      <a class="btn-floating btn-large waves-effect waves-light deep-purple darken-2 i-fab">
        <i class="material-icons">add</i>
      </a>

    </div>

  </div>
</template>

<script>
import Parse from 'parse'

export default {
  data() {
    return {
      isLoading: false,

      // users: [
      //   'Into the Spider-Verse',
      //   'The Last Jedi',
      //   'End Game',
      // ],
      users: [],
      currentUser: null,
    }
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
      let users = await query.find()

      // Get the current users
      let currentUser = Parse.User.current()

      this.currentUser = currentUser
      this.users = users
      this.isLoading = false
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

