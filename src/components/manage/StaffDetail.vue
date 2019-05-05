<template>
  <div>
    <!-- หมุนๆ ตอนโหลด -->
    <div id='loading' v-if='isLoading'>
      <div v-show='isLoading'>
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-yellow-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class='content form flex flex-column flex-left' v-else>
      <h4 style='margin-bottom: 32px'>
        <!-- {{ title }} -->
        {{ user ? 'ข้อมูลสตาฟ':'เพิ่มสตาฟ' }}
      </h4>

      <!-- username -->
      <label for='username'>ชื่อผู้ใช้</label>
      <div class="input-field col">
        <i class="material-icons prefix">account_circle</i>
        <input v-model='username' id='username' placeholder='ชื่อผู้ใช้' type='text' />
      </div>

      <!-- change password -->
      <label for='newpassword'>
        {{ user === null ? 'กำหนดรหัสผ่าน':'กำหนดรหัสผ่านใหม่'}}
      </label>
      <div class="input-field col">
        <i class="material-icons prefix">lock</i>
        <input v-model='newpassword' id='newpassword' type='password' 
          placeholder='(ใส่รหัสผ่าน)'  />
      </div>

      <!-- isAdmin -->
      <div>
        <label>สิทธิ์ผู้ดูแลระบบ</label>
        <div class='input-field col'>
          <div class="switch">
            <label>
              <!-- <i class="material-icons prefix">lock_open</i> -->
              <input type="checkbox" v-model='isAdmin'>
              <span class="lever"></span>
              <!-- <i class="material-icons prefix">lock</i> -->
            </label>
          </div>
        </div>
      </div>

      <!-- warning -->
      <label class='red-text' v-if='isAdmin === false && user && user.get("isAdmin") === true'>
        {{ "\"" + username + "\"" }} จะไม่สามารถแก้ไขข้อมูลใดๆ ในระบบได้อีกต่อไป
      </label>

      <!-- save button -->
      <div style='margin-top: 48px;'>
        <!-- button -->
        <button :class="'waves-effect waves-light btn deep-purple darken-2 ' + (isSaving ? 'btn-disabled':'')"
          @click='saveUserData()'>
          <i class="material-icons left">save</i>
          บันทึก
        </button>
        <!-- <button :class="'waves-effect waves-light btn red darken-2 ' + (isSaving ? 'btn-disabled':'')" @click=''>
          <i class="material-icons left">save</i>
          ลบ
        </button> -->
      </div>

    </div>

    <!-- destroy button (hidden when the user is viewing their own account detail) -->
    <div v-show='user && !isCurrentUser'
      class='flex' style='padding-top: -20px; padding-right: 0px; justify-content: flex-end'>
      <button :class="'btn-floating btn-small waves-effect waves-light red darken-2' + (isDeleting ? 'btn-disabled':'')" align='left'
        @click='deleteUserData()'>
        <i class="material-icons left">delete</i>
        ลบผู้ใช้
      </button>
    </div>

  </div>

</template>

<script>
  import Parse from 'parse'
  import Modal from '@/components/Modal'

  export default {
    props: {
      value: {
        type: Parse.User,
      },
      // title: {
      //   type: String,
      //   default: () => 'ข้อมูลพนักงาน'
      // },
    },
    data() {
      return {
        isLoading: false,
        isSaving: false,
        isDeleting: false,

        user: null,
        username: '',
        newpassword: '',
        isAdmin: false,
        isCurrentUser: false,
      }
    },
    watch: {
      value(newU, oldU) {
        this.user = newU
      },

      user(newU, oldU) {
        console.log(oldU + ' -> ' + newU)
        if (newU !== null && newU !== undefined) {
          this.username = newU.getUsername()
          this.isAdmin = newU.get('isAdmin')
          this.isCurrentUser = (newU.id === Parse.User.current().id)
        } else {
          this.username = ''
          this.isAdmin = false
          this.isCurrentUser = false
        }
        this.newpassword = ''
      }
    },
    mounted() {
      var elems = document.querySelectorAll('select');
      var instances = M.FormSelect.init(elems, []);
    },
    methods: {
      deleteUserData() {
        this.user.destroy({
            useMasterKey: true
          })
          .then(
            (object) => {
              console.log('remove this user success')
              this.isDeleting = false // finished saving
              this.user = object
              this.$emit('destroy')
            },
            (error) => {
              console.error(error)
              this.isDeleting = false // finished saving
              // this.$emit('saved', user)
            }
          )
      },
      saveUserData() {
        this.isSaving = true // start saving

        let user = this.user

        if (user === null) {
          user = new Parse.User()
          // user.setPassword('12345')
        }

        user.set('username', this.username)
        user.set('isAdmin', this.isAdmin)
        if (this.newpassword.length > 0) {
          user.setPassword(this.newpassword)
        }

        // await user.save({ useMasterKey : true })
        user.save(null, {
            useMasterKey: true
          })
          .then(
            (object) => {
              console.log('success')
              this.isSaving = false // finished saving
            },
            (error) => {
              console.error(error)
              this.isSaving = false // finished saving
              // this.$emit('saved', user)
            }
          )

      },
    }
  }
</script>

<style scoped>
  #username {
    font-size: 19px;
  }

  .form {
    max-width: 400px;
    margin: auto;

  }

  label {
    margin-top: 8px;
  }
</style>