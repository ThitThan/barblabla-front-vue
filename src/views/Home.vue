<template>
  <div class="home">
    <h2>สตาฟ</h2>
    <br>
   <!-- display current date and time -->
    <span>{{ moment().format('Do MMMM YYYY, h:mm:ss a') }}</span>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->
  <center>
     <vue-dropdown
      :config="config"
      @setSelectedOption="setNewSelectedOption($event);"
    ></vue-dropdown>
  </center>
  
       


    <ul class="collection">
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
          <div class='row  waves-effect waves-light'
          v-for='t in table' 
          v-bind:key='t.id'>
            <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
            <div class="col s2">
              {{ t.get('TableNumber') }} </div> 
            <div class="col s3">
              <div v-if='reservation[t.id]'>
                {{ t.get('Name') }}
              </div>
              <div v-else>
                -
              </div>
              </div>
            <div class="col s3">
              <div v-if='reservation[t.id]'>
                จองแล้ว
              </div>
              <div v-else>
                -
              </div>
              <!-- {{ reservation[t.id] }} -->
            </div>
            <div class="col s2">
              {{t.get('Zone')}} </div>
            <div class="col s2">-</div>
          </div>
        </li>
      </ul>
  
  </div>
  
</template>



<script>
import Parse from "parse";
import vueDropdown from "@/components/vue-dropdown/vue-dropdown";

var Tableja = Parse.Object.extend("Tableja");
var Reservation = Parse.Object.extend("Reservation");


export default {
  components: {
    vueDropdown
  },
  data() {
    return {
      isLoading: false,
      name: "dsdasd",
      table: [],

      table: [],
      reservation: {
        // 'tableID': 'reserve'
      // priao
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
          width: 350
        },
      }
    };
  },
  created() {
    this.name = "5555";
    this.data_load();
  },

  methods: {
    hello() {
      alert("Hello!");
      
    },
    methods: {
  moment: function () {
    return moment();
  }
},

    async data_load() {
      const query = new Parse.Query(Tableja);
      query.ascending("TableNumber");
      let tables = await query.find();    // get the list of table

      for (var i = 0; i < tables.length ; i++) {
        let t  = tables[i];
        // console.log(t); 

        const query = new Parse.Query(Reservation);
        query.equalTo("Table", t);
        let r = await query.first();

        if(r !== null && r !== undefined) {
          let cus = r.get("customer");
          console.log(cus); 

          this.reservation[t.id] = r
        }
      }

      this.table = tables;
    }
    
  }
};
</script>
