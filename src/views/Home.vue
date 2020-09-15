<template>
  <div class="home container">
    <Modal v-model="showDialog">
      <ReserveDetail v-model="curR" :curT="curT" :reserveDate='reserveDate' @save="hideDialog"/>
    </Modal>

    <div style="margin: 24px 0;">
      <!-- display current date and time -->
      <p class="time shadow" style="margin-bottom:0px; margin-top:0px;" v-text="currentTime"></p>
      <span style="font-size: 15px;">{{ moment().format('dddd Do MMMM YYYY')}}</span>
      <!-- <span class='time shadow' v-text="currentTime"></span> -->
    </div>

    <div>
      <!-- dropdown -->
      <div style="margin: 24px 0px; height: 35px;">
        <div class="container"
          style="z-index: 9; position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px; max-width: 100%;
          text-align: left;">

          <a v-for='(day, index) in days' :key='index' @click='selectedDay = index'
            :class="'button dayButton ' + (index === selectedDay ? 'selected':'')">

            <div v-if="day === ''">
              {{ moment().add(index, 'days').format('D MMM') }}
            </div>
            <div v-else>
              {{ day }}
            </div>
            
          </a>
          <!-- {{ reserveDate }} -->
          <vue-dropdown style="display: inline-block; margin-top: 4px; margin-left: 2px; right: 0px; float:right;" :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
        </div>
      </div>
    </div>

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
          v-for="t in table"
          v-bind:key="t.id"
        >

          <div class="collection-item row waves-effect waves-light"
               @click="displayDialog(t)"
               v-if="(displayAvailable === true && !reservation[t.id]) || (displayReserved === true && reservation[t.id])">
               
            <div class="col s2">{{ t.get('TableNumber') }}</div>
            <div class="col m4">
              <div v-if="reservation[t.id] && reservation[t.id].get('customer')">{{ reservation[t.id].get('customer').get('name') }}</div>
              <div v-else>-</div>
            </div>
            <div class="col s3">
              <div class="i-badge i-badge-pill i-badge-warning" v-if="reservation[t.id]">จองแล้ว</div>
              <div class="i-badge i-badge-pill i-badge-green" v-else>ว่าง</div>
              <!-- {{ reservation[t.id] }} -->
            </div>
            <div class="col s2">{{ t.get('Zone') ? t.get('Zone').get('Name') : '-' }}</div>
            <!-- <div class="col s2">-</div> -->
          </div>

        </li>
      <!-- </li> -->
    </ul>
  </div>
</template>

<!--style button-->
<style>
.button {
  background-color: #48494d;
  border: none;
  color: white;
  padding: 7px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 14px;
  margin: 4px 4px;
  cursor: pointer;
}
.button:hover {
  background-color: #382741;
  color: white;
}
.button:active {
  background-color: #382741;
  color: white;
}
.selected {
  background-color: #382741;
}
/* .button:visited{
  background-color: #382741;
} */

.dayButton {
  border-radius: 4px;
  vertical-align: top;
}
</style>

<!--style clock-->
<style lang="scss">
body,
html {
  width: 100%;
  height: 100%;
}

section.section {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 140px;
  background: transparent;
}

h3.is-3,
p.time {
  color: white;
  font-family: "Overpass Mono", monospace;
  font-size: 50px;
}

h3.is-3:not(:last-child) {
  margin: 0;
  padding: 0;
}

.time {
  font-size: 3em;
}

.table-header {
  height: 32px;
  margin-bottom: 0;
}
.table-row {
  padding: 16px 16px;
}
</style>



<script>
import Parse from "parse";
import vueDropdown from "@/components/vue-dropdown/vue-dropdown";

var Tableja = Parse.Object.extend("Tableja");
var Reservation = Parse.Object.extend("Reservation");
var moment = require("moment");

import Modal from "@/components/Modal";
import ReserveDetail from "@/components/manage/ReserveDetail";

export default {
  components: {
    vueDropdown,
    Modal,
    ReserveDetail
    //mdbBtn
  },
  data() {
    return {
      moment: moment,
      isLoading: false,
      // name: "dsdasd",
      message: "Current Time:",
      currentTime: null,
      showColon: true,

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
        width: 180,
      },

      //drive
      showDialog: false,
      curR: null,
      curT: null,

      // date
      days: [
        'วันนี้',
        '',
        '',
      ],
      selectedDay: -1,
      reserveDate: null,
    };
  },
  watch: {
    selectedDay(newD) {
      this.reserveDate = moment().add(newD, 'days').endOf('day')
      this.data_load()
    }
  },
  created() {
    // this.currentTime = moment().format("LTS");
    let timeFormat = this.getTimeFormat();
    this.currentTime = moment().format(timeFormat);
    setInterval(() => this.updateCurrentTime(), 1 * 1000);
  },

  mounted() {
    this.name = "5555";
    // this.data_load();
    this.selectedDay = 0;     // this line also calls data_load()
  },

  showDialog(newVal, oldVal) {
    if (newVal === false) {
      console.log('close!!')
      this.curT = undefined     // set to undefined to clear the form 
      this.curR = undefined     // set to undefined to clear the form
      // this.selectedUser = null
    }
  },

  methods: {
    getTimeFormat() {
      return this.showColon ? "HH:mm" : "HH mm";
    },
    updateCurrentTime() {
      // this.currentTime = moment().format("LTS");
      this.showColon = !this.showColon;
      let timeFormat = this.getTimeFormat();
      this.currentTime = moment().format(timeFormat);
    },
    setNewSelectedOption(selectedOption) {
      this.config.placeholder = selectedOption.value;
      switch (selectedOption.value) {
        case "แสดงทั้งหมด":
          console.log("1");
          this.displayAvailable = true;
          this.displayReserved = true;
          break;
        case "ว่าง":
          this.displayAvailable = true;
          this.displayReserved = false;
          console.log("2");
          break;
        case "จองแล้ว":
          console.log("3");
          this.displayAvailable = false;
          this.displayReserved = true;
          break;
      }
    },
    displayDialog(t) {
      console.log(t);
      this.showDialog = true;
      this.curT = t;

      let reserv = this.reservation[t.id];
      if (!reserv) {
        reserv = new Reservation()
      }
      this.curR = reserv
    },
    hideDialog() {
      this.showDialog = false;

      this.data_load();
    },
    hello() {
      alert("Hello!");
    },

    async data_load() {
      this.reservation = {}
      this.isLoading = true; // show the loading indicator

      // table
      const query = new Parse.Query(Tableja);
      query.ascending("TableNumber");
      let tables = await query.find(); // get the list of table

      // reservations
      let date = this.reserveDate
      const rQuery = new Parse.Query(Reservation)
      .lessThanOrEqualTo('date', date.endOf('day').toDate())
      .greaterThanOrEqualTo('date', date.startOf('day').toDate())
      let reservList = await rQuery.find(); // get the list of table

      for (var i = 0; i < reservList.length; i++) {
        // console.log(reservList[i])
        let reserv = reservList[i]
        await reserv.get('customer').fetch()  // get the customer info
        let tableId = reserv.get('Table').id

        this.reservation[tableId] = reserv
      }
      console.log(this.reservation)

      // for (var i = 0; i < tables.length; i++) {
      //   let t = tables[i];
      //   // console.log(t);
      //   let reservList = t.relation("Reservations");
      //   // console.log(reservList)
      //   // let date = moment().day(this.selectedDay + 1)
      //   let date = this.reserveDate
      //   let r = await reservList
      //     .query()
      //     .lessThanOrEqualTo('date', date.endOf('day').toDate())
      //     .greaterThanOrEqualTo('date', date.startOf('day').toDate())
      //     .select("customer")
      //     .first();
      //   if (r) {
      //     this.reservation[t.id] = r;
      //     await r.get("customer").fetch();
      //     console.log(r);
      //   }

      //   // const query = new Parse.Query(Reservation);
      //   // query.equalTo("Table", t);
      //   // let r = await query.first();

      //   // if (r !== null && r !== undefined) {
      //   //   let cus = r.get("customer");
      //   //   await cus.fetch();
      //   //   console.log(cus);

      //   //   this.reservation[t.id] = r;
      //   // }
      // }

      this.table = tables;
      this.isLoading = false; // hide the loading indicator
    }
  }
};
</script>
