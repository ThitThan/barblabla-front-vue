<template>
  <div class="home container">
    <Modal v-model="showDialog">
      <ReserveDetail v-model="curR" :curT="curT" :reserveDate='reserveDate' @save="hideDialog"/>
    </Modal>

    <div style="margin: 24px 0;">
      <!-- display current date and time -->
      <p class="time shadow" style="margin-bottom:0px; margin-top:0px;" v-text="currentTime"></p>
      <span style="font-size: 15px;">{{ moment().format('(dddd) Do MMM YYYY')}}</span>
      <!-- <span class='time shadow' v-text="currentTime"></span> -->
    </div>

    <!-- dropdown -->
    <div>
      <div style="margin: 24px 0px; height: 48px; text-align: center;">
        <div class="container"
          style="z-index: 9; position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px; max-width: 100%;
          text-align: center;">

          <a v-for='(day, index) in days' :key='index' @click='selectedDay = index'
            :class="'button dayButton ' + (index === selectedDay ? 'selected':'')">

            <div v-if="day === ''">
              {{ moment().add(index, 'days').format('D MMM') }}
            </div>
            <div v-else>
              {{ day }}
            </div>
            
          </a>
          <!-- <vue-dropdown style="display: inline-block; margin-top: 4px; margin-left: 2px; right: 0px; float:right;" :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown> -->
        </div>
      </div>
    </div>

    <!-- <hr/> -->

    <div class='card' style='padding: 8px 10%'>

      <!-- หมุนๆ ตอนโหลด -->
      <div style="margin: 24px 0" v-if="isLoading">
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

      <!-- Table Maps -->
      <div v-else-if='zone && tables'>
        <div v-for='(zone, zoneID) in zone' :key='zoneID' style="margin: 32px 0px;" >
          <h5 style='margin: 0px; margin-bottom: 12px; text-align: left;'> โซน {{ zone.get('Name') }} </h5>
          <!-- <h5> {{ '<' + zoneID + '>' }} </h5> -->
          <TableMap :editMode='false' :zone='zone' :tables='tables[zoneID]' :reservList='reservation' @tableClicked='displayDialog($event)' />
        </div>
      </div>
    </div>
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

// Map
import TableMap from '@/components/TableMap'

export default {
  components: {
    vueDropdown,
    Modal,
    ReserveDetail,
    TableMap
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

      tables: [],
      reservation: {
        // 'tableID': 'reserve'
      },
      zone: {},

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
      this.load_data()
      // this.load_reservation()
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
    this.selectedDay = 0;     // this line also calls load_data()
    this.load_data ();
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

      this.load_data();
    },
    hello() {
      alert("Hello!");
    },

    async load_table() {
      // this.isLoading = true

      const query = new Parse.Query(Tableja)
      // query.ascending('TableNumber')   //List the table by Num
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
      // console.log(tables)

      this.tables = tables
      // this.tables = rawTables
      // this.isLoading = false
    },

    async load_zone() {
      // this.isLoading = true

      //
      // Get Zones
      //
      const query = new Parse.Query("TableZone")
      query.ascending('Name')
      let rawZone = await query.find()

      // make sure every zones have table set
      let zone = {}
      for (const i in rawZone) {
        let z = rawZone[i]
        if (this.tables.hasOwnProperty(z.id) === false) {
          this.tables[z.id] = []
          console.log('added ' + z.id)
        }

        zone[z.id] = z
      }
      // console.log(this.tables)

      // this.tableMaps = maps
      this.zone = zone
      // this.isLoading = false
      // console.log(this.zone)
    },

    async load_reservation() {
      // reservations
      this.reservation = {}
      let date = this.reserveDate
      console.log(this.date)
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
    },

    async load_data() {
      this.isLoading = true

      await this.load_table()
      await this.load_zone()
      await this.load_reservation()

      this.isLoading = false
    },
  }
};
</script>
