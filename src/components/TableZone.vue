
<template>
<div class="" style="margin-bottom: 50px;">
    <div class ="flex" v-for='(row, i) in map' :key='i'>
      <div class="testja" v-for='(t, j) in row' :key='j'>
        <!-- Have table -->
        <div v-if='t !== null'
          class='tableja'
          @click='$emit("tableClicked", { x: j, y: i})' >
          {{ t }}
        </div>

        <!-- blank space -->
        <div v-else
          class='emptyja waves-effect waves-light'
          @click='$emit("emptyClicked", { x: j, y: i})'>
          <i class='material-icons'>add_circle</i>
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
    'map'
  ],
  components: {
  },
  data() {
    return {
      // tableMap: [ 
      //   [1, null, 3 ],
      //   [1, 2, 3 ],
      //   [1, 2, null ],
      // ],
    }
  },
  created() {
    
  },
  methods: {

  }
}
</script>

<style scoped>
.flex {
  display: flex;
  height: auto;
  background: #ffffff10;
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

  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyja {
  min-width: 45px;
  min-height: 40px;
  /* background-color: #ffffff33; */

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>


