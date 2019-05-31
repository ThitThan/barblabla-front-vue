<template>
  <div id="reservation" class='container'>

    <img class='logo' style='height: 64px; margin-bottom: 24px;' alt="logo" src="@/assets/refeel-logo.png">

    <div class='content card i-card'>
      <h4 style='margin-bottom: 24px; margin-top: 0px'>
        จองที่นั่ง
      </h4>

      <!-- customer -->
      <div class='customer-frame'>
        <div class="col s6">
          <p>
            ข้อมูลส่วนตัว
            <!-- ({{ reserveDate.format('D MMM') }}) -->
          </p>
          <p>
          </p>
        </div>

        <div class="input-field col">
          <i class="material-icons prefix">account_circle</i>
          <input v-model.trim="name" id="name" placeholder="ชื่อลูกค้า" type="text">
        </div>

        <div class="input-field col">
          <i class="material-icons prefix">phone_in_talk</i>
          <input v-model.trim="phone" id="phone" placeholder="เบอร์ติดต่อ" type='number'>
        </div>

      </div>

      <!-- RESERV -->
      <div style='margin-top: 24px'>
        <form class="col s12" @submit.prevent="makeReservationReq()">
          <a v-for='(day, index) in days' :key='index' @click='selectedDay = index'
            :class="'button dayButton ' + (index === selectedDay ? 'selected':'')"
            style='margin-bottom: 12px'>

            <div v-if="day === ''">
              {{ moment().add(index, 'days').format('D MMM') }}
            </div>
            <div v-else>
              {{ day }}
            </div>
          </a>

          <!-- หมุนๆ ตอนโหลด -->
          <div v-if='isLoading'>
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
          
          <div v-else>
            <!-- <div class='customer-frame'> -->
            <ul v-if='!reserveList || reserveList.length == 0'
              class='collection'>
              <li class='collection-item'>

                <p>เพิ่มการจอง</p>
                <!-- <label for="amount">จำนวน(คน)</label> -->
                <div class="input-field">
                  <i class="material-icons prefix">supervisor_account</i>
                  <input id="์amount" v-model.number="amount" type="number" min="1" max="99" placeholder="จำนวนคน">
                </div>
                <button class="btn btn-white waves-effect waves-purple deep-purple darken-2" 
                  style='margin-bottom: 12px; margin-left: auto; margin-right: auto;'
                  type="submit" name="action">
                  <i class="material-icons left">save</i>
                  บันทึก
                </button>    
              </li>
            </ul>
            <div v-else>
              <p>ที่นั่งของคุณ</p>
              <ul class='collection'>
                <li class='collection-item'
                  style='display: flex; justify-content: space-between;'
                  v-for='(r, index) in reserveList' :key='index'>

                  <!-- {{ r.get('Table') }} -->
                  <h6 style='margin-top: 4px; margin-bottom: 0;'>
                    โต๊ะ 
                    {{ r.get('Table').get('Zone').get('Name') + r.get('Table').get('TableNumber') }}
                    </h6>
                  <span id='' class='new m-badge deep-purple darken-2'>
                    {{ r.get('Table').get('Seat') }} คน
                  </span>
                </li>
              </ul>
            </div>
          </div>

        </form>

      </div>
    </div>

    <label>
      (
        {{ "id: " + facebookPSID }}
      )
    </label>
  </div>
</template>

<script>
import TableMap from '@/components/TableMap'

import Parse from 'parse'
import { async } from 'q';
import { makeRe } from 'minimatch';
var ReservationReq = Parse.Object.extend('ReservationReq')
var Reservation = Parse.Object.extend('Reservation')
var Customer = Parse.Object.extend('Customer')
var moment = require("moment");

let generateMap = async function() {
  // fetch Tables
  let query = new Parse.Query('Tableja')
  query.ascending('Zone', 'OffsetY', 'OffsetX')   //List the table by Num
  let rawTables = await query.find()

  let tables = {}
  // for (var i = 0; i < rawTables.length; i++) {
  for (const i in rawTables) {
    // let t = rawTables[i]
    let t = rawTables[i]
    // console.log(t.id)

    // console.log(t.get('Zone') + ' ' + t.get('OffsetY') + ' ' + t.get('OffsetX'))
    let zone = t.get('Zone')
    if (zone) {
      if (tables.hasOwnProperty(zone.id) === false) {
        tables[zone.id] = []
      }
      tables[zone.id].push(t)
    }
    // tables[t.id] = t
  }
  console.log(tables)

  // fetch Zones
  query = new Parse.Query("TableZone")
  query.ascending('Name')
  let rawZone = await query.find()

  // make sure every zones have table set
  let zones = {}
  for (const i in rawZone) {
    let z = rawZone[i]
    if (tables.hasOwnProperty(z.id) === false) {
      tables[z.id] = []
      // console.log('added ' + z.id)
    }

    zones[z.id] = z
  }
  console.log(zones)

  let allZones = {}
  for (const i in zones) {
    // console.log(this.zone !== undefined)
    // console.log(this.zone.length)
    // console.log(this.map !== undefined)
    // console.log(this.map.length)
    // console.log('=-=-=-=-=-=-=-=-=')
    let zone = zones[i]
    console.log('yup')
    if (zone) {
      //
      // generate map
      //
      let z = zone

      let zoneWidth = z.get('Width')
      let zoneHeight = z.get('Height')

      // console.log(raw_zones[i])
      var arr = []

      for (var y = 0; y < zoneHeight; y++) {
        arr.push([])
        for (var x = 0; x < zoneWidth; x++) {
          // arr[y][x] = y + '_' + x
          if (tables)
            arr[y][x] = null
        }
      }

      //
      // put the tables in
      //
      for (const i in rawTables) {
        let t = rawTables[i];

        if (t && t.get('Zone') && t.get('Zone').id === zone.id) {
          let Zone = t.get('Zone')
          let OffsetY = t.get('OffsetY')
          let OffsetX = t.get('OffsetX')

          // console.log(Zone.get('Name') + ' ' + OffsetY + ' ' + OffsetX)
          arr[OffsetY][OffsetX] = t
        }
      }
      // console.log('=-=-=-=-=-=-=-=-=-')

      // // maps[z.id] = arr
      // // zone[z.id] = z
      // this.map = arr

      allZones[z.id] = arr
      // console.log(arr)
      
    }
  }
  // console.log(allZones)
  return allZones
}

const load_reservation = async function(date) {
  // reservations
  let reservation = {}
  const rQuery = new Parse.Query('Reservation')
  .lessThanOrEqualTo('date', date.endOf('day').toDate())
  .greaterThanOrEqualTo('date', date.startOf('day').toDate())
  let reservList = await rQuery.find(); // get the list of table

  for (var i = 0; i < reservList.length; i++) {
    // console.log(reservList[i])
    let reserv = reservList[i]
    await reserv.get('customer').fetch()  // get the customer info
    let tableId = reserv.get('Table').id

    reservation[tableId] = reserv
  }
  return reservation
}


export default {
  name: 'reservation',
  components: {
    TableMap
  },
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
      cus: null,
      amount: '',
      name:'',
      phone:'',
      // date : null,
      date: null,
      day1: null,
      day2: null,
      day3: null,
      //fb
      // facebookPSID: 'N/A',
      facebookPSID: undefined,

      reserveList: [],
    }
  },
   watch: {
    selectedDay(newD) {
      this.reserveDate = moment().add(newD, 'days').endOf('day')
      // console.log(this.reserveDate)
      this.loadReserve()
    }
  },
  created() {
    this.loadCus()
  },
  mounted() {
    // generateMap()
    // // var elems = document.querySelectorAll('select');
    // // var instances = M.FormSelect.init(elems, []);
    // //  // this.data_load();
    
    
    this.setupFacebookAPI()
    // this.facebookPSID = '2472335649468044'
    this.setDate()
    // this.loadCus().then(() => {
    //   this.selectedDay = 0;
    //   // this.loadReserve() is automatically called
    // })
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
          async function success(thread_context) {
            // success
            this.facebookPSID = thread_context['psid']
            console.log('facebook PSID gathered')

           await this.loadCus() 
           this.selectedDay = 0; //  await this.loadReserve()
          }.bind(this),
          function error(err) {
            // error
            console.log('fail to get facebook PSID')
            this.facebookPSID = 'error ' + JSON.stringify(err)
          }.bind(this)
        );
      }.bind(this);
    },
    async loadCus(){
      if (this.facebookPSID) {
        // console.log(date)
        const cQuery = new Parse.Query('Customer')
              .equalTo("facebookPSID", this.facebookPSID)
    
        let cus = await cQuery.first(); // get the list of CUSTOMERS
        
        this.name = cus.get('name')
        this.phone = cus.get('phone')

        this.cus = cus
      }
    },
    async loadReserve(){
      this.isLoading = true
      
      let date = this.reserveDate
      let cus = this.cus
      // console.log(date)
      if(cus && date){
          const rQuery = new Parse.Query('Reservation')
                .equalTo("customer", cus)
                .lessThanOrEqualTo('date', date.endOf('day').toDate())
                .greaterThanOrEqualTo('date', date.startOf('day').toDate())
          let reserveList = await rQuery.find(); // check
          // console.log(reserveList)

          // fetch all tables
          for (var i = 0; i < reserveList.length; i++) {
            let t = reserveList[i].get('Table')
            if (t) {
              await t.fetch()
              await t.get('Zone').fetch()
            }
          }

          this.reserveList = reserveList
          // if(reserve.length == 0){
          //   this.name = null
          //   this.phone = null
          // }
          // else
          //   this.name = cus.get('name')
          //   this.phone = cus.get('phone')
          //   console.log(this.phone)
      }

      this.isLoading = false
    },
    async makeReservationReq() {
      this.isLoading = true

      let amount= parseInt(this.amount)
      let name= this.name
      let phone= this.phone
      let date = this.reserveDate.toDate()

      // console.log(date)
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
      
      var query = new Parse.Query('Customer')
      query.equalTo("phone", phone)
      var cus = await query.first()
      // console.log(cus)
      
      if(cus===undefined){
        cus = new Customer()
      }
      cus.set('name', name)
      cus.set('phone', phone)
      cus.set('facebookPSID', this.facebookPSID)
      await cus.save()
      this.cus = cus

      // actually submitting
      var req = new ReservationReq()
      req.set('amount', amount)
      req.set('customer', cus)
      req.set('date',date)
      await req.save()

      await this.makeReservation(req)
      console.log('done!!')
      // alert('ได้รับข้อมูลการจองแล้ว')

      this.isLoading = false
    },

    async makeReservation(req) {
      let zoneMaps = await generateMap()
      console.log(zoneMaps)

      let date = this.reserveDate
      let reserves = await load_reservation(date)
      console.log(reserves)

      let remaining = req.get('amount')
      let continueLoop = (r) => (r > 0)
      for (const id in zoneMaps) {
        let map = zoneMaps[id]

        for (const y in map) {
          for (const x in map[y]) {
            let t = map[y][x]
            if (t && !reserves.hasOwnProperty(t.id)) {
              console.log("available!!")

              if (continueLoop(remaining)) {
                let newR = new Reservation()
                newR.set('customer', this.cus)
                newR.set('Table', t)
                newR.set('date', date.toDate())
                console.log(newR)
                await newR.save()

                // try {
                // }
                // catch (e) {
                //   console.log(e)
                // }

                remaining -= t.get('Seat')
                console.log(remaining)
              }
            }
          }
        }
      }

      this.amount = 0
      this.loadReserve()
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

  padding: 32px 16px;
  /* background: red; */
}
.i-card {
  max-width: 400px;
  margin: 0 auto;

  padding: 32px 24px;
}
.customer-frame {
  background-color: #ffffff09;
  padding: 12px 5%;
  border-radius: 12px;
}
@media only screen and (max-width: 640px) { 
  .i-card {
    padding: 24px 12px;
  }
  .customer-frame {
    background-color: #ffffff09;
    padding: 8px 5%;
    border-radius: 12px;
  }
}

.m-badge {
  min-width: 3rem;
  padding: 0 6px;
  margin-left: 14px;
  text-align: center;
  font-size: 1rem;
  line-height: 22px;
  height: 22px;
  color: #757575;
  float: right;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
}
.m-badge.new {
    font-weight: 300;
    font-size: 0.8rem;
    color: #fff;
    background-color: #26a69a;
    border-radius: 2px;
}
</style>

