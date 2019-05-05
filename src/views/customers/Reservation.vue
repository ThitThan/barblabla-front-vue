<template>
  <div id="reservation" class='container'>

    <img class='logo' style='height: 64px; margin-bottom: 24px;' alt="logo" src="@/assets/refeel-logo.png">

    <div class='content card i-card'>
      <h4 style='margin-bottom: 12px; margin-top: 0px'>
        [ข้อมูลการจอง]
      </h4>
      <label>{{ facebookPSID }}</label>
      <div class="row">

        <form class="col s12" @submit.prevent="makeReservation()">
          <div class="row">
              <label for="name">ชื่อ(สามารถระบุชื่อเล่นได้)</label>
            <div class="input-field col s12">
              <input id="์name" v-model="name" type="text">
            </div>
          </div>
          <div class="row">
            <label for="amount">จำนวน(คน)</label>
            <div class="input-field col s12">
              <input id="์amount" v-model.number="amount" type="number" min="1" max="99">
            </div>
          </div>    
          <div class="row">
            <label for="tel">เบอร์โทร(ไม่ต้องเว้นวรรค)</label>
            <div class="input-field col s12">
              <input id="์tel" v-model="phone" type="tel" >
            </div>    
          </div>
          <button class="btn btn-white waves-effect waves-purple" type="submit" name="action">Submit
            <i class="material-icons right">send</i>
          </button>    
        </form>

      </div>
    </div>
  </div>
</template>

<script>
import Parse from 'parse'
var ReservationReq = Parse.Object.extend('ReservationReq')
var Customer = Parse.Object.extend('Customer')
export default {
  name: 'reservation',
  data(){
    return {
      amount: '',
      name:'',
      phone:'',

      facebookPSID: 'N/A',
    }
  },
  created() {
    this.setupFacebookAPI()
  },
  methods: {
    setupFacebookAPI() {
      (function(d, s, id){
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) {return;}
        js = d.createElement(s); js.id = id;
        js.src = "//connect.facebook.net/en_US/messenger.Extensions.js";
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'Messenger'));

      window.extAsyncInit = function() {
        // the Messenger Extensions JS SDK is done loading 
        console.log('messenger SDK loaded!!')

        // Context
        MessengerExtensions.getContext('2310738632317537', 
          function success(thread_context) {
            // success
            this.facebookPSID = thread_context['psid']
            console.log('facebook PSID gathered')
          }.bind(this),
          function error(err) {
            // error
            console.log('fail to get facebook PSID')
            this.facebookPSID = 'error ' + JSON.stringify(err)
          }.bind(this)
        );
      }.bind(this);
    },
    async makeReservation() {

      let amount= parseInt(this.amount)
      let name= this.name
      let phone= this.phone

      if (name.length <1) {
        alert('กรุณากรอกข้อมูลให้ครบ')
        return;
      }

      if (!amount || amount <1) {
        alert('กรุณาระบุจำนวนคน(หนึ่งคนขึ้นไป)')
        return;
      }
      
      if (phone.length <9) {
        alert('กรุณาระบุหมายเลขโทรศัพท์ให้ถูกต้อง')
        return;
      }
      var query = new Parse.Query(Customer)
      query.equalTo("phone", phone)
      var cus = await query.first()
      console.log(cus)
      
      if(cus===undefined){
        cus = new Customer()
      }
      cus.set('name', name)
      cus.set('phone', phone)
      cus.set('facebookPSID', this.facebookPSID)
      await cus.save()

      // actually submitting
      var req = new ReservationReq()
      req.set('amount', amount)
      req.set('customer', cus)
      await req.save()

      console.log('done!!')
      alert('ได้รับข้อมูลการจองแล้ว')
    },
  },
}
</script>

<style scoped>
#reservation {
  /* display: flex; */
  height: 100vh;
  width: 100vw;
  max-width: 100%;

  padding: 32px 24px;
  /* background: red; */
}
.i-card {
  max-width: 400px;
  margin: 0 auto;

  padding: 32px 24px;
}

</style>

