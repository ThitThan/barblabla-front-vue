<template>
  <div class="home">
    <Modal v-model="showDialog">
      <h1>ปุ่มนี้ไว้ทำไรวะ</h1>
      
      <div v-if="curT">
        <!-- table -->
        <label>{{ curT }}</label>

        <hr>

        <!-- reservation -->
        <label v-if='curR'> 
          {{ curR }}
        </label>
      </div>
    </Modal>

    <br>
    <!-- display current date and time -->
    <p class="time shadow" style="margin-bottom:0px; margin-top:0px;" v-text="currentTime"></p>
    <span>{{ moment().locale('th').format('dddd Do MMMM YYYY')}}</span>
    <!-- <span class='time shadow' v-text="currentTime"></span> -->
    
    
    
    <br>
    <br>
    
    



    <!-- <span>{{ moment().format('dddd Do MMMM YYYY, ')}}{{moment().format('LTS')}}</span> -->
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <center>
     <vue-dropdown
      :config="config"
      @setSelectedOption="setNewSelectedOption($event);"
    ></vue-dropdown>
  </center>
  
       

    <ul class="collection" v-if="table.length > 0">
      <!-- งง ไอ้สัส นั่งทำความเข้าใจอยู่ได้ป่ะ get get ควยไร งง แม่ง ไปต่อกับ db ได้ไง เหี้ยแล้วกุต้องเช็คคอนดิชั่นไงเนี่ย หน่กหส่ฟหากสฟก -->

      <!-- หัวตาราง -->
      <li class="collection-item">
        <div class="row">
          <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
          <div class="col s2">เลขโต๊ะ</div>
          <div class="col s3">รายชื่อลูกค้า</div>
          <div class="col s3">สถานะ</div>
          <div class="col s2">โซนการนั่ง</div>
          <div class="col s2">-</div>
        </div>

        <!-- แต่ละแถว -->
        <div class="row waves-effect waves-light" 
        v-for="t in table" 
        v-bind:key="t.id"
        @click='displayDialog(t)'>
          <div v-if="(displayAvailable === true && !reservation[t.id]) || (displayReserved === true && reservation[t.id])">
          <div class="col s2">{{ t.get('TableNumber') }}</div>
          <div class="col s3">
            <div v-if="reservation[t.id]">
              
              {{ reservation[t.id].get('customer').get('name') }}
              
              </div>
            <div v-else>-</div>
          </div>
          <div class="col s3">
            <div v-if="reservation[t.id]">จองแล้ว</div>
            <div v-else>ว่าง</div>
            <!-- {{ reservation[t.id] }} -->
          </div>
          <div class="col s2">{{t.get('Zone')}}</div>
          <div class="col s2">-</div>
        </div>
        </div>
      </li>
    </ul>
  </div>
  
</template>


<style lang="scss">

// body, html {
//   width: 100%;
//   height: 100%;
// }


section.section {
  //display: flex;
  //flex-direction: column;
  //align-items: center;
  //padding-top: 140px;
  background: transparent;
}

h3.is-3, p.time {
  color: white;
}

h3.is-3:not(:last-child) {
  margin: 0;
  padding: 0;
}

.time {
  font-size: 3em;
}

// .shadow {
//   text-shadow: 0 0 15px rgba(255, 255, 255, 0.35);
// }
</style>



<script>
import Parse from "parse";
import vueDropdown from "@/components/vue-dropdown/vue-dropdown";

var Tableja = Parse.Object.extend("Tableja");
var Reservation = Parse.Object.extend("Reservation");
var moment = require('moment');

import Modal from "@/components/Modal";


export default {
  components: {
    vueDropdown,
    Modal
  },
  data() {
    return {
      
      moment:moment,
      isLoading: false,
      name: "dsdasd",
      table: [],
       message: 'Current Time:',
    currentTime: null,
      
      table: [],
      reservation: {
        // 'tableID': 'reserve'
      },
      
      // priao
      displayAvailable: true,
      displayReserved: true,
      config: {
        options: [
          {
            value: "แสดงทั้งหมด"
          },
          {
            value: "ว่าง"
          },
          {
            value: "จองแล้ว"
          }
        ],
        placeholder: "แสดงที่นั่งภายในร้าน",
        backgroundColor: "#48494d",
        textColor: "white",
        borderRadius: "1em",
        border: "1px solid gray",
        width: 300
      },

      //drive
      showDialog: false,
      curR: null,
      curT: null,
    };
  },
  created() {
    this.name = "5555";
    this.data_load();
    this.currentTime = moment().format('LTS');
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  
  },

  methods: {
    updateCurrentTime() {
      this.currentTime = moment().format('LTS');
    },
    setNewSelectedOption(selectedOption){
      this.config.placeholder = selectedOption.value;
      switch(selectedOption.value) {
        case 'แสดงทั้งหมด':
          console.log('1')
          this.displayAvailable = true
          this.displayReserved = true
        break;
        case 'ว่าง':
          this.displayAvailable = true
          this.displayReserved = false
          console.log('2')
        break;
        case 'จองแล้ว':
          console.log('3')
          this.displayAvailable = false
          this.displayReserved = true
        break;
      }
    },
    displayDialog(t) {
      console.log(t);
      this.showDialog = true;
      this.curT = t;
      this.curR = this.reservation[t.id];

    },
    hello() {
      alert("Hello!");
      
    },

    async data_load() {
      const query = new Parse.Query(Tableja);
      query.ascending("TableNumber");
      let tables = await query.find(); // get the list of table

      for (var i = 0; i < tables.length; i++) {
        let t = tables[i];
        // console.log(t);

        const query = new Parse.Query(Reservation);
        query.equalTo("Table", t);
        let r = await query.first();

        if (r !== null && r !== undefined) {
          let cus = r.get("customer");
          await cus.fetch();
          console.log(cus);

          this.reservation[t.id] = r;
        }
      }

      this.table = tables;
    }
    
  }
};
</script>
