
<template>
  <div class="container">
    <!-- <h3>ลูกค้า</h3>  -->

    <center>
        <div>
           <!-- <label for='search'>ค้นหา</label> -->
      <div class="input-field col ">
        <i class="material-icons prefix ">search</i>
        <input style= " max-width: 50%" v-model='name' id='search' placeholder='ชื่อเล่น' type='text' />
        <button class="'waves-effect waves-light btn deep-purple darken-2 align top:20px '" style="margin-left: 20px;"
          @click='searchData()'>
          <i class="material-icons left">search</i>
          ค้นหา
        </button>
        </div>
      </div>
    </center>

    <!-- หมุนๆ ตอนโหลด -->
    <div style="margin-top: 24px" v-if="isLoading">
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

    <ul class="collection" style="margin-top: 24px" v-else>
      <!-- <li> -->
        <!-- หัวตาราง -->
        <li class="row valign-wrapper table-header">
          <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
          <div class="col s2">เลขโต๊ะ</div>
          <div class="col m4">รายชื่อลูกค้า</div>
          <div class="col s3">สถานะ</div>
          <div class="col s2">โซน</div>
          <!-- <div class="col s2"></div> -->
        </li>

        <!-- แต่ละแถว -->
        <li
          v-for="c in customers"
          v-bind:key="c.id"
        >
          <!-- {{ c }} -->

          <div class="collection-item row waves-effect waves-light">
               <!-- @click="displayDialog(t)"
               v-if="(displayAvailable === true && !reservation[t.id]) || (displayReserved === true && reservation[t.id])"> -->
               
            <div class="col s2">
              {{ tables[c.id].get('TableNumber') }}
            </div>

            <div class="col m4">
              <div v-if="reservation[c.id] && reservation[c.id].get('customer')">{{ reservation[c.id].get('customer').get('name') }}</div>
              <div v-else>-</div>
            </div>
            
            <div class="col s3">
              <div v-if="reservation[c.id]">จองแล้ว</div>
              <div v-else>ว่าง</div>  
            </div>

            <div class="col s2">
              {{ tables[c.id].get('Zone') ? tables[c.id].get('Zone').get('Name') : '-' }}
            </div>
            
          </div>

        </li>
      <!-- </li> -->
    </ul>
  </div>
</template>

<script>
// PARSE
import Parse from 'parse'
const Customer = Parse.Object.extend("Customer")
// var moment = require("moment");

export default {
  data() {
    return {
      // moment: moment,
      name: '...',
      isLoading: false,
      name:'',
      customers: [],
      reservation: {
        // 'cusID': 'reserve'
      },
      tables: {
        // 'cusID': 'table'
      },
      reserveDate: null,
    }
  },
  created() {
    this.name = "";
    // this.reserveDate = moment().now()
    this.loadData();
  },
  methods: {
    hello() {
      alert('Hello!')

    },
    async searchData(){
      //รอเขียน คำสั่งค้นหา
      const cQuery = new Parse.Query('Customer')
                          .equalTo("name", this.name);
  
      let cList = await cQuery.find(); // get the list of CUSTOMERS
      this.customers = cList

      this.reservation = {}
      for (var i = 0; i <cList.length; i++) {
        let cus = cList[i]

        const rQuery = new Parse.Query('Reservation')
                            .equalTo('customer', cus)
                            .descending('date')
        // let rList = await rQuery.find(); // get the list of table

        // console.log(rList)

        let reserv = await rQuery.first() // get the list of table

        let table = reserv.get('Table')
        await table.fetch()

        this.tables[cus.id] = table

        this.reservation[cus.id] = reserv
      }

      console.log(this.tables)
    }
    ,async loadData(){
        // table
       // reservations
      // let date =  this.moment().now()
      const cQuery = new Parse.Query('Customer')
      .equalTo("name", "kong");
      let cList = await cQuery.find(); // get the list of table
      
       for (var i = 0; i <cList.length; i++) {
        // console.log(reservList[i])
        let cus = cList[i]

          const rQuery = new Parse.Query('Reservation')
            // .lessThanOrEqualTo('date',date.endOf('day').toDate())
            // .greaterThanOrEqualTo('date',date.startOf('day').toDate())
            .equalTo('customer', cus)
          let rList = await rQuery.find(); // get the list of table

          console.log(rList)
        // this.reservation[cus] = reserv
      }
      // console.log(this.reservation)
      // const cQuery = new Parse.Query('Customer');
      // cQuery.equalTo('name', 'kong');
      // const rQuery = new Parse.Query('Reservation');
      // rQuery.matchesKeyInQuery("customer.objectId", "objectId", cQuery);
      // // results has the list of users with a hometown team with a winning record
      // const results = await rQuery.find();
      // console.log(results)



        this.isLoading = false; // hide the loading indicator
    }
  }

}
</script>
