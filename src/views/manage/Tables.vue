
<template>
  <div class="container">
    <Modal v-model='showDialog'>
      <h1>ปุ่มนี้ไว้ทำไรวะ</h1>
    </Modal>

    <!-- titles -->
    <h2> โต๊ะ </h2>
    <h6>{{ table.length }} ตัว</h6>

    <br>
    
    <ul class="collection">

    <div class="row">
            <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
            <div class="col s3">เลขโต๊ะ</div>
            <div class="col s3">โซน</div>
            <div class="col s3">จำนวนที่</div>
            <div class="col s3">สถานะ</div>
    </div>

    <li class="collection-item row" v-for="t in table" v-bind:key='t.id'>

        <!-- เลขโต๊ะ -->         
        <div class="col s3">{{t.get('TableNumber')}}</div>
        
        <!--Zone -->
        <div class='col s3'>{{t.get('Zone')}}</div>

        <!-- จำนวนที่ -->
        <div class='col s3'>{{t.get('Seat')}}</div>

        <!-- ป้าย ว่าง/ไม่ว่าง -->
        <div class='col s3'>
          <div class=' i-badge i-badge-pill i-badge-warning valign-wrapper' v-if = "t.get('Reserve') == false" >
            ว่าง
          </div>
          <div class=' i-badge i-badge-pill i-badge-dark valign-wrapper' v-else> 
            ไม่ว่าง
          </div>
        </div>       
        
        
    </li>
    
    </ul>

    <!-- ปุ่ม + -->
    <a class="btn-floating btn-large waves-effect waves-light deep-purple darken-2 i-fab"
      @click='showAddDialog()'>
      <i class="material-icons">add</i>
    </a>

    <!-- หมุนๆ ตอนโหลด -->
    <div id='loading' v-if='isLoading'>
      <div v-show='isLoading'>
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-yellow-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div><div class="gap-patch">
              <div class="circle"></div>
            </div><div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Parse from  "parse"
var Tableja = Parse.Object.extend("Tableja");

import Modal from '@/components/Modal'

export default {
  components: {
    Modal,

  },
  data() {
    return {
      isLoading: false,
      name: '...',

      // Reserve: false,

      table: [],

      showDialog: false,
    }

    Reserve : fa
  },
  created() {
    this.name = '...'
    this.data_load();
    // this.Reserve;

    // this.showDialog = true
  },
  methods: {
    hello() {
      alert('Hello!')
    },

    async data_load() {
      const query = new Parse.Query(Tableja)
      query.ascending('TableNumber')   //List the table by Num
      let tables = await query.find()

      this.table = tables
    },
    
    showAddDialog() {
      this.selectedTable = null
      this.showDialog = true
    },
    showViewDialog(user) {
      this.selectedTable = user
      this.showDialog = true
    },

    
  }
}
</script>

