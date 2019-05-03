
<template>
  <div class="container">
    <Modal v-model='showDialog'>
      <h1>dee jaa</h1>
    </Modal>

    <!-- titles -->
    <h2> โต๊ะ </h2>
    <h6>{{ table.length }} ตัว</h6>

    <br>
    
    <ul class="collection">
      <li class="collection-item" v-for="t in table" v-bind:key='t.id'>
        <div> </div>
        {{t.get('TableNumber')}}
        {{t.get("Seat")}}
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

      table: [],

      showDialog: false,
    }
  },
  created() {
    this.name = '...'
    this.data_load();

    // this.showDialog = true
  },
  methods: {
    hello() {
      alert('Hello!')
    },

    async data_load() {
      const query = new Parse.Query(Tableja)
      query.ascending('TabkeNumber')   // show admin first, then regular staffs (true > false, so descending)
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
