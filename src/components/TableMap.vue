<template>
  <div class="frame">
    <div class ="i-flex" v-for='(row, i) in map' :key='i'>
      <div class="testja" v-for='(t, j) in row' :key='j'>
        <!-- Have table -->
        <div v-if='t !== null'
          class='tableja'
          @click='$emit("tableClicked", t)' >
          <!-- {{ editMode }}
          {{ reservList.hasOwnProperty(t.id) }} -->
          <div v-if='editMode == false && reservList && reservList.hasOwnProperty(t.id)'
            class='table-unavailable waves-effect waves-light'>
            <i class='material-icons'>supervisor_account</i>
          </div>
          <div v-else-if='editMode == false'
            class='table-available waves-effect waves-light'>
            {{ t.get('TableNumber') }}
          </div>
          <div v-else
            class='table-editmode waves-effect waves-light'>
            {{ t.get('TableNumber') }}
          </div>
        </div>

        <!-- empty grid -->
        <div v-else
          class='emptyja'
          @click='$emit("emptyClicked", { zone: zone, x: j, y: i })'>
          <!-- :class="'emptyja' + (editMode ? 'edit-mode waves-effect waves-light':'')" -->

          <!-- EDITING: show add button -->
          <div v-if='editMode'
            class='edit-mode waves-effect waves-light'>
            <i class='material-icons'>add</i>
          </div>

        </div>
      </div>
        <!-- <div class="testja">
        <div style="background-color:green;">green</div></div>
    <div class="testja">
    <div style="background-color:black;">orange</div></div>
    <div class="testja">
    <div style="background-color:red;">white</div></div> -->
    </div>
  </div>

</template>

<script>

export default {
  props: [ 
    // 'map', 
    'tables',
    'zone',
    'reservList',
    'editMode',
  ],
  components: {
  },
  watch: {
    zone(newZ) {
      this.generateMap()
      // console.log('Zone ' + newZ.id)
    },
    tables(newT) {
      this.generateMap()
      // console.log(newT.length)
    },
    reservList(newR) {
      // this.generateMap()
      console.log('RESERV UPDATED'); 
      console.log(newR); 
    }
  },
  data() {
    return {
      map: [ 
        [1, null, 3 ],
        [1, 2, 3 ],
        [1, 2, null ],
      ],
    }
  },
  created() {
    this.generateMap()

    console.log(this.reservList)
  },
  methods: {
    generateMap() {
      // console.log(this.zone !== undefined)
      // console.log(this.zone.length)
      // console.log(this.map !== undefined)
      // console.log(this.map.length)
      // console.log('=-=-=-=-=-=-=-=-=')
      if (this.zone) {
        //
        // generate map
        //
        let z = this.zone

        let zoneWidth = z.get('Width')
        let zoneHeight = z.get('Height')

        // console.log(raw_zones[i])
        let arr = []

        for (var y = 0; y < zoneHeight; y++) {
          arr.push([])
          for (var x = 0; x < zoneWidth; x++) {
            // arr[y][x] = y + '_' + x
            if (this.tables)
            arr[y][x] = null
          }
        }

        //
        // put the tables in
        //
        for (const i in this.tables) {
          let t = this.tables[i];

          if (t && t.get('Zone') && t.get('Zone').id === this.zone.id) {
            let Zone = t.get('Zone')
            let OffsetY = t.get('OffsetY')
            let OffsetX = t.get('OffsetX')

            // console.log(Zone.get('Name') + ' ' + OffsetY + ' ' + OffsetX)
            arr[OffsetY][OffsetX] = t
          }
        }
        // console.log('=-=-=-=-=-=-=-=-=-')

        // maps[z.id] = arr
        // zone[z.id] = z
        this.map = arr

        // console.log(this.map)
      }
    },
  }
}
</script>

<style scoped>
.frame {
  padding: 12px;
  background: #ffffff0a;

  border-radius: 6px;
}
.i-flex {
  display: flex;
  height: auto;
}

.button1 {
  color: black;
  border: 2px solid rgb(153, 153, 153); /* Green */
}

.testja {
  height: auto;
  margin: auto;  /* Magic! */
  flex-flow: row wrap;
  
  justify-content: space-around;
  /* flex: 1; */

  padding: 12px;
}

.tableja {
  min-width: 45px;
  min-height: 40px;
}

.table-available {
  /* background-color: #ffffff33; */
  background-color: #2e7d32;
  color: #fff;
  font-size: 15px;
  border-radius: 4px;

  min-width: 45px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-editmode {
  background-color: #ffffff33;
  color: #fff;
  border-radius: 4px;

  min-width: 45px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}
.table-unavailable {
  /* background-color: #ffffff33; */
  /* background-color: #e65100; */
  background-color: #8B0000;
  color: #fff;
  border-radius: 4px;

  min-width: 45px;
  min-height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyja {
  min-width: 45px;
  min-height: 40px;
  /* background-color: #ffffff33; */

  /* display: flex;
  align-items: center;
  justify-content: center; */
}

.edit-mode {
  min-width: 45px;
  min-height: 40px;

  border: #ffffff22 solid 2px;
  color: #ffffff30;
  border-radius: 4px;

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>


