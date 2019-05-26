
<template>
  <div class="container-grid">
    <Modal v-model='showDialog'>
      <TableDetail v-model='selectedTable' @save='closeDetailDialog($event)' @destroy='closeDetailDialog($event)'/>
    </Modal>

    <!-- titles -->
    <h2> โต๊ะ NEW </h2>
    <h6>{{ table.length }} ตัว</h6>

    <br>
    
    

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
import TableDetail from '@/components/manage/TableDetail'
var Tableja = Parse.Object.extend("Tableja");

import Modal from '@/components/Modal'

export default {
  components: {
    Modal,
    TableDetail,

  },
  data() {
    return {
      isLoading: false,
      name: '...',

      // Reserve: false,

      table: [],

      showDialog: false,
      selectedTable: null,
    }

    // Reserve : fa
  },
  watch: {
    showDialog(newVal, oldVal) {
      if (newVal === false) {
        console.log('close!!')
        this.selectedTable = undefined     // set to undefined to clear the form (null is for adding new user, an obj is for editing existing user)
        // this.selectedUser = null
      }
    },
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
      let lastTable = this.table[this.table.length - 1]
      let newTable = new Tableja()
      if (lastTable) {
        newTable.set("TableNumber", lastTable.get('TableNumber') + 1)
        newTable.set("Zone", lastTable.get('Zone'))
      }
      console.log(newTable)

      this.selectedTable = newTable

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
}
</script>

<style scoped>
.table-header {
  height: 32px;
  margin-bottom: 0;
}
.table-row {
  padding: 16px 16px;
}
.subtitle {
  font-size: 15px;
}

.container-grid {
  justify-content: flex-start;
}

.item {
  order: 3; /* default is 0 */
}

</style>


