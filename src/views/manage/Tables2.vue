
<template>
  <div class="container">
    <Modal v-model='tableDialogVisible'>
      <TableDetail v-model='selectedTable' @save='closeTableDialog($event)' @destroy='closeTableDialog($event)'/>
    </Modal>

    <Modal v-model='zoneDialogVisible'>
      <TableZoneDetail v-model='selectedZone' @save='closeZoneDialog($event)' @destroy='closeZoneDialog($event)'/>
    </Modal>

    <!-- titles -->
    <h2> แผนผังโต๊ะ </h2>

    <br>
    <hr>

    <div v-for='(map, zoneID) in zone' :key='zoneID'>
      <h5> โซน {{ zone[zoneID].get('Name') }} </h5>
      <!-- <h5> {{ '<' + zoneID + '>' }} </h5> -->
      <TableMap :editMode='true' :zone='zone[zoneID]' :tables='tables[zoneID]' @emptyClicked='addTable($event)' @tableClicked='editTable($event)' />
    </div>

    <!-- <h4> Zone B </h4>
    <TableZone :map='zones["A"]' /> -->

    <!-- ปุ่ม + -->
    <a class="btn-floating btn-large waves-effect waves-light deep-purple darken-2 i-fab"
      @click='showZoneDialog()'>
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
import TableMap from '@/components/TableMap'
import TableZoneDetail from '@/components/manage/TableZoneDetail'

const Tableja = Parse.Object.extend("Tableja")
const TableZone = Parse.Object.extend('TableZone')

import Modal from '@/components/Modal'

export default {
  components: {
    Modal,
    TableDetail,
    TableZoneDetail,
    TableMap
  },
  data() {
    return {
      isLoading: false,
      tableMaps: {
        // 'A': [ 
        //   [1, null, 3 ],
        //   [4, 2, 3 ],
        //   [5, 99, null ],
        // ],
        // 'B': [ 
        //   [1, null, 3 ],
        //   [4, 2, 3 ],
        //   [5, 99, null ],
        // ],
      },

      tables: [],
      tableDialogVisible: false,
      selectedTable: null,

      zone: [],
      zoneDialogVisible: false,
      selectedZone: null,
    }

    // Reserve : fa
  },
  watch: {
    tableDialogVisible(newVal, oldVal) {
      if (newVal === false) {
        // console.log('close!!')
        this.selectedTable = undefined     // set to undefined to clear the form (null is for adding new user, an obj is for editing existing user)
        // this.selectedUser = null
      }
    },
  },
  created() {
    this.load_data()

    // this.tableDialogVisible = true
  },
  methods: {
    async load_data() {
      await this.load_table()
      await this.load_zone()
    },

    async load_table() {
      this.isLoading = true

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
      this.isLoading = false
    },

    async load_zone() {
      this.isLoading = true

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
      this.isLoading = false
      // console.log(this.zone)
    },
    
    showZoneDialog() {
      let lastZone = this.zone[this.zone.length - 1]
      let newZone = new TableZone()
      if (lastZone) {
        let zoneName = lastZone.get('Name')
        zoneName = this.nextChar(zoneName).toUpperCase()
        newZone.set("Name", zoneName)
      }
      
      this.selectedZone = newZone
      this.zoneDialogVisible = true
    },

    closeZoneDialog(e) {
      this.zoneDialogVisible = false

      this.load_data()
    },

    nextChar(c) {
        var i = (parseInt(c, 36) + 1 ) % 36;
        return (!i * 10 + i).toString(36);
    },

    addTable(e) {
      // let zone = e.zone
      // let x = e.x
      // let y = e.y
      // alert(zone + "\n\n" + JSON.stringify(offset))
      // console.log(zone.get('Name'))
      // console.log(x)
      // console.log(y)
      let table = new Tableja()
      table.set('Zone', e.zone)
      table.set('OffsetY', e.y)
      table.set('OffsetX', e.x)

      this.showTableDialog(table);
    },

    editTable(t) {
      this.showTableDialog(t);
      // let zone = t.get('Zone')
      // let x = t.get('OffsetX')
      // let y = t.get('OffsetY')
    },

    showTableDialog(table) {
      this.selectedZone = newZone
      this.tableDialogVisible = true
    },

    showTableDialog(t) {
      this.selectedTable = t
      this.tableDialogVisible = true
    },

    closeTableDialog(e) {
      this.tableDialogVisible = false

      this.load_data()
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

</style>


