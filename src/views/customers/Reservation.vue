<template>
  <div id="reservation" class='container'>

    <img class='logo' style='height: 64px; margin-bottom: 24px;' alt="logo" src="@/assets/refeel-logo.png">

    <div class='content card i-card'>
      <h4 style='margin-bottom: 12px; margin-top: 0px'>
        [ข้อมูลการจอง]
      </h4>

     <a v-for='(day, index) in days' :key='index' @click='selectedDay = index'
            :class="'button dayButton ' + (index === selectedDay ? 'selected':'')">

            <div v-if="day === ''">
              {{ moment().add(index, 'days').format('D MMM') }}
            </div>
            <div v-else>
              {{ day }}
            </div>
            
          </a>

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
              <!-- <div class="input-field col s12">
                <select v-model="date">
                  <option value="" disabled selected>เลือกวันที่ต้องการจอง</option>
                  <option :value="day1">{{moment().format('dddd Do MMMM YYYY')}}</option>
                  <option :value="day2">{{moment().add(1,'day').format('dddd Do MMMM YYYY')}}</option>
                  <option :value="day3">{{moment().add(2,'day').format('dddd Do MMMM YYYY')}}</option>
                </select>
              <label for="date">วันที่ ({{ moment().format('dddd Do MMMM YYYY')}})</label>
              </div> -->
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
var moment = require("moment");
export default {
  name: 'reservation',
  data(){
    return {
      // date
      days: [
        'วันนี้',
        '',
        '',
      ],
      selectedDay: -1,
      reserveDate: null,
      //
      moment: moment,
      isLoading: false,
      message: "Current Time:",
      currentTime: null,
      showColon: true,

      amount: '',
      name:'',
      phone:'',
      //date
      date: null,
      day1: null,
      day2: null,
      day3: null,
      //fb
      facebookPSID: 'N/A',
      

    }
  },
  created() {
    this.setupFacebookAPI()
    this.setDate()    
  },
  mounted() {
    var elems = document.querySelectorAll('select');
    var instances = M.FormSelect.init(elems, []);
    
  },
  methods: {
    setDate(){
      this.day1 = moment().toDate()  
      this.day2 = moment().day(2).toDate()  
      this.day3 = moment().day(3).toDate()  
    },


    
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
      let date = this.date
      // alert(date)
      // alert(typeof date)
      
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

      if (!date) {
        alert('กรุณาเลือกวันที่')
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
      req.set('date',date)
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

