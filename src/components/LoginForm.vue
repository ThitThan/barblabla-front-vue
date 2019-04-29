<template>
  <!-- eslint-disable -->
  <form v-on:submit.prevent='performLogin'>
    <div id='login-form' class='dz-fixed-width z-depth-2'>
      
      <!-- header (logo + title + subtitle) -->
      <div class=''>
        <!-- <img class='logo uk-margin-remove-bottom' 
              alt="DIZCARD logo" src="@/assets/logo-small.png"> -->
        <h4>
          Barblabla
        </h4>
        <div class='' style='font-size: 15px'>
          {{ /*welcome, please login*/ }}
          กรุณาเข้าสู่ระบบ <br/> เพื่อเข้าไปจัดการบาร์ของคุณ
        </div>
      </div>

      <!-- phone number -->
      <div class=''>
        <!-- <input class='' type='tel' v-on:input='onPhoneChanged($event.target.value)' placeholder='เบอร์มือถือ'/> -->
        <input class='' v-model='user' placeholder='ชื่อผู้ใช้'/>
      </div>
      
      
      <!-- password -->
      <div class=''>
        <input class='uk-input' type='password' v-model='pwd' placeholder='รหัสผ่าน'/>
      </div>

      <!-- login button container -->
      <div class=''>
        <button class="waves-effect waves-light btn deep-purple darken-2" type='submit' v-show='!isLoading' >เข้าสู่ระบบ</button>

        <div v-show='isLoading'>
          <div class="spinner-layer spinner-green">
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
  </form>
</template>

<script>
// PARSE
import Parse from 'parse'
const Username = Parse.Object.extend("Username");

export default {
  name: 'login-form',
  data() {
    return {
      user: '',
      pwd: '',
      isLoading: false
    }
  },
  methods: {
    // onPhoneChanged(phone) {
    //   if (phone.charAt(0) === '0')
    //     phone = phone.substring(1, phone.length);
    //   this.phone = phone;
    // },
    async performLogin() {
      this.isLoading = true

      // Grab the data
      let username = this.user.toString()
      let password = this.pwd.toString()
      // console.log(typeof user)
      // console.log(user)

      var isError = false;
      try {
        const user = await Parse.User.logIn(username, password)

        this.$router.push('/')
      } 
      catch (error) {
        var msg;
        switch (error.code) {
          case 100:
            msg = 'ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้ กรุณาตรวจสอบการเชื่อมต่ออินเทอร์เน็ตของคุณ'
            break
          case 101:
            msg = 'ชื่อผู้ใช้/รหัสผ่านไม่ถูกต้อง'
            break
          default:
            // msg = 'เกิดข้อผิดพลาด โปรดลองอีกครั้งในภายหลัง \n(รหัสข้อผิดหลาด: ' + error.code + ')'
            msg = error.message
        }
        alert(
          // 'Error (' + error.code + ')' + '\n' +
          // error.message
          msg
        )

        isError = true
      }

      this.isLoading = false
    },
  },
}
</script>

<style bounded>
/* body {
  font-family: 'Mitr', sans-serif;
} */
form {
  margin: auto;
}
#login-form {
  border-radius: 4px;
  /* background-color: #2C2332; */
  background-color: #24202F;

  /* background-color: #ffffff10; */
  padding: 36px 24px;
}
.logo {
  /* width: 84px;  */
  height: 84px;
  margin-bottom: 0px;
  background-size: cover;
  background-repeat: no-repeat;
  background-position: 50% 50%;
}
.dz-fixed-width {
  max-width: 360px;
  margin: auto;
  /* margin-top: auto;
  margin-bottom: auto; */
}
</style>