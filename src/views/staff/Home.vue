
<template>
  <div class="about container">
    <a class='waves-effect waves-light btn-small deep-purple darken-2' 
      @click="performLogout()">
      ล้อคเอาท์
    </a>

    <h3>This is the staff page</h3>
    
    <div style="margin: 24px 0px; height: 35px;">
      <center style="z-index: 1000; position: absolute; margin-left: auto; margin-right: auto; left: 0px; right: 0px;">
        <vue-dropdown :config="config" @setSelectedOption="setNewSelectedOption($event);"></vue-dropdown>
      </center>
    </div>

    <input placeholder="ชื่อ" v-model='name'>

    <div>{{ name }}</div>
    
  </div>
</template>

<script>
import vueDropdown from "@/components/vue-dropdown/vue-dropdown";
import Parse from 'parse'
export default {
  components: {
    vueDropdown
  },
  data() {
    return {
      name: '...',
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
    }
  },
  created() {
    this.name = '5555'
  },
  methods: {
    performLogout() {
      Parse.User.logOut().then(() => {
        this.$router.push({ path: '/login' })
      })
    },
    hello() {
      alert('Hello!')
    }
  }
}
</script>
