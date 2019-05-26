
<template>
<div class="" style="margin-bottom: 50px;">
    <div class ="flex" v-for='(row) in map' :key='row'>
      <div class="testja" v-for='t in row' :key='t'>
        <!-- Have table -->
        <div class='tableja' v-if='t !== null'>
          {{ t }}
        </div>

        <!-- blank space -->
        <div class='emptyja' v-else>
          <div class="btn-flat  button1">+</div>
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
  min-height: 30px;
  background-color: #ffffff33;

  display: flex;
  align-items: center;
  justify-content: center;
}

.emptyja {
  min-width: 45px;
  min-height: 30px;
  /* background-color: #ffffff33; */

  display: flex;
  align-items: center;
  justify-content: center;
}

</style>


