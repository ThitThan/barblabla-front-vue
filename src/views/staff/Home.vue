
<template>
  <div class>
    <div class="nav-dark z-depth-1 valign-wrapper">
      <img src="@/assets/refeel-logo.png" style="height: 36px">
      
    </div>
    <a class="waves-effect waves-light btn-small deep-purple darken-2 right" @click="performLogout()">ล้อคเอาท์</a>

    <div class="about container">
      <h3>ข้อมูลการจอง</h3>

     

      <div style="margin: 24px 0px; height: 35px;">
        <center
          style="z-index: 1000; position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px;"
        >
          <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
        </center>
      </div>

      <!-- ตาราง -->
       <br>

      <ul class="collection" style="margin-top: 14px; font-size: 19px">
        <div class="collection-item">โต๊ะ </div>
        <div class="row">
          <ul class="col s6" style="margin-top: 10px; font-size: 23px">
            <div id class="i-badge i-badge-pill i-badge-warning valign-wrapper">สถานะโต๊ะ</div>
          </ul>
          <ul class="col s6" style="margin-top: 10px; font-size: 18px">
            <div id class="">-</div>
          </ul>
        </div>
      </ul>
    </div>
  </div>
</template>

<script>
import vueDropdown from "@/components/vue-dropdown/vue-dropdown";
import Parse from "parse";
var Tableja = Parse.Object.extend("Tableja");
var Reservation = Parse.Object.extend("Reservation");

export default {
  props: {
    value: {
      type: Tableja,
    },
  },
  components: {
    vueDropdown
  },
  data() {
    return {
      name: "...",
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
      }
    };
  },
  created() {
    this.name = "";
  },
  methods: {
    async data_load() {
      const query = new Parse.Query(Tableja)
      query.ascending('TableNumber')   //List the table by Num
      let tables = await query.find()

      this.table = tables
    },
    performLogout() {
      Parse.User.logOut().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    hello() {
      alert("Hello!");
    },
    async data_load() {
      const query = new Parse.Query(Tableja)
      query.ascending('TableNumber')   //List the table by Num
      let tables = await query.find()

      this.table = tables
    },
    
    showAddDialog() {
      this.selectedTable = new Tableja()
      this.showDialog = true
    },
    showViewDialog(tables) {
      this.selectedTable = tables
      this.showDialog = true
      console.log(tables)
    },

    closeDetailDialog() {
      this.showDialog = false
      // this.selectedUser = null

      this.data_load()  // update the user list
    },
    
  }
};
</script>

<style>
.element-item {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
