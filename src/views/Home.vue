<template>
  <div class="home">
    <h2>สตาฟ</h2>
    <br>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->

    <ul class="collection" v-if='table.length > 0'>

    <!-- งง ไอ้สัส นั่งทำความเข้าใจอยู่ได้ป่ะ get get ควยไร งง แม่ง ไปต่อกับ db ได้ไง เหี้ยแล้วกุต้องเช็คคอนดิชั่นไงเนี่ย หน่กหส่ฟหากสฟก -->

      <!-- หัวตาราง -->
        <li class='collection-item'>
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
          v-bind:key='t.Reserve'>
            <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
            <div class="col s2">{{ t.get('TableNumber') }}</div> 
            <div class="col s3">รายชื่อลูกค้า</div>
            <div class="col s3">สถานะ</div>
            <div class="col s2">{{t.get('Zone')}}</div>
            <div class="col s2">-</div>
          </div>
        </li>
      </ul>
  
  </div>
</template>

<script>
import Parse from "parse";
var Tableja = Parse.Object.extend("Tableja");

export default {
  data() {
    return {
      isLoading: false,
      name: "dsdasd",

      table: []
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

    async data_load() {
      const query = new Parse.Query(Tableja);
      query.ascending("TableNumber"); // show admin first, then regular staffs (true > false, so descending)
      let tables = await query.find();

      this.table = tables;
    }
  }
};
</script>
