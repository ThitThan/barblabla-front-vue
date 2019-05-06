
<template>
  <div class>
    <div class="nav-dark z-depth-1 valign-wrapper">
      <img src="@/assets/refeel-logo.png" style="height: 36px">
      <a
        class="waves-effect waves-light btn-small deep-purple darken-2"
        @click="performLogout()"
      >ล้อคเอาท์</a>
    </div>

    <div class="about container">
      <h3>ข้อมูลการจอง</h3>

      <hr>

      <div style="margin: 24px 0px; height: 35px;">
        <center
          style="z-index: 1000; position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px;"
        >
          <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
        </center>
      </div>

      <ul class="collection" style="margin-top: 24px">
        <div class="collection-item">
          เลขโต๊ะ
          </div>
        <ul class="element-item" style>
          <div id class="i-badge i-badge-pill i-badge-warning valign-wrapper">
            ผู้ดูแลระบบ
            </div>
        </ul>
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
    performLogout() {
      Parse.User.logOut().then(() => {
        this.$router.push({ path: "/login" });
      });
    },
    hello() {
      alert("Hello!");
    }
  }
};
</script>

<style>
.element-item {
  margin-bottom: 10px;
  margin-top: 10px;
}
</style>
