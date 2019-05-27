<template>
  <div class="frame">
    <div class ="i-flex" v-for='(row, i) in map' :key='i'>
      <div class="testja" v-for='(t, j) in row' :key='j'>
        <!-- Have table -->
        <div v-if='t !== null'
          class='tableja waves-effect waves-light'
          @click='$emit("tableClicked", t)' >
          <!-- @click='$emit("tableClicked", { x: j, y: i})' > -->
          {{ t.get('TableNumber') }}
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
  background-color: #ffffff33;

  border-radius: 4px;

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


