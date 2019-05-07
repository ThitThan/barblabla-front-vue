
<template>
  <div>
    <div class="nav-black z-depth-1 valign-wrapper">
      <img src="@/assets/refeel-logo.png" style="height: 36px">
      <div class="right-set"><a class="waves-effect waves-light btn-small deep-purple darken-2" @click="performLogout()">ล้อคเอาท์</a></div>
    </div>


    <div class="about container">
      <h3>ข้อมูลการจอง</h3>

      <div style="margin: 24px 0px; height: 35px;">
        <center style="z-index: 1000; position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px;">
          <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
        </center>
      </div>

      <!-- ตาราง -->
      <br>

      <ul
        class="collection"
        style="margin-top: 14px; font-size: 19px"
        v-for="t in table"
        v-bind:key="t.id"
      >
        <div class="collection-item">โต๊ะ {{t.get('TableNumber')}}</div>
        <!-- table -->
        <div class="row">
          <div class="col s6" style="margin-top: 10px; font-size: 23px">
            <div class="i-badge i-badge-pill i-badge-warning" v-if="reserveList[t.id]">จองแล้ว</div>
            <div class="i-badge i-badge-pill i-badge-green" v-else>ว่าง</div>
          </div>
          <div class="col s6" style="margin-top: 10px; font-size: 18px">
            <!-- <div class="col s3">{{t.get('TableNumber')}}</div> -->
            <div
              class=""
              v-if="reserveList[t.id]">{{reserveList[t.id].get('customer').get('name')}}</div>
            <div v-else>-</div>
          </div>
        </div>
        <!-- table -->
      </ul>
    </div>
  </div>
</template>

<script>
import ReserveDetail from "@/components/manage/ReserveDetail";
import vueDropdown from "@/components/vue-dropdown/vue-dropdown";
import Parse from "parse";
var Tableja = Parse.Object.extend("Tableja");
var Reservation = Parse.Object.extend("Reservation");

export default {
  props: {
    value: {
      type: Tableja
    }
  },
  components: {
    vueDropdown,
    ReserveDetail
  },
  data() {
    return {
      name: "...",
      displayAvailable: true,
      displayReserved: true,
      table: [],
      reserveList: {
        
      },
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

      reserveDate: null
    };
  },
  created() {
    this.name = "";
    this.reserveDate = moment().now()
    this.data_load();
  },
  methods: {
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

      console.log(this.reserveList);

      this.table = tables;
    },
    performLogout() {
      Parse.User.logOut().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    hello() {
      alert("Hello!");
    },

    showAddDialog() {
      this.selectedTable = new Tableja();
      this.showDialog = true;
    },
    showViewDialog(tables) {
      this.selectedTable = tables;
      this.showDialog = true;
      console.log(tables);
    },

    closeDetailDialog() {
      this.showDialog = false;
      // this.selectedUser = null

      this.data_load(); // update the user list
    }
  }
};
</script>

<style>
.element-item {
  margin-bottom: 10px;
  margin-top: 10px;
}

.nav-black {
  background: #1F1623;
  /* background: #1B0F27; */
  padding: 0px 12px;

  min-height: 48px;

  display: flex;
  flex-wrap: wrap;

  z-index: 999;
}

.right-set { 
margin-left: auto;

}
.i-badge-danger {
  border: 0px;
  color: white;
  background-color: rgb(141, 76, 1);
}

.i-badge-green {
  color: white;
  background-color: rgb(35, 99, 35);
}
</style>
