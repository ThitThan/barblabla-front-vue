<template>
  <div class="home">
    <h2>สตาฟ</h2>
    <br>
    <!-- <img alt="Vue logo" src="../assets/logo.png"> -->


<ul class="collection">
  <li class='collection-item waves-effect waves-light'>
<div class="row">
      <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
      <div class='col s1'> 1 </div>
      <div class='col s3'>6-columns (one-half)</div>
      <div class='col s2'>6-columns (one-half)</div>
      <div class='col s4'>6-columns (one-half)</div>
      <div class='col s2'>6-columns (one-half)</div>
    </div>
   </li>
      
    </ul>
    

    
  </div>
  
  


</template>

<script>
import Parse from  "parse"

var Tableja = Parse.Object.extend("Tableja");

export default {
  data() {
    return {
      isLoading: false,
      name: 'dsdasd',

      table: [],
    }
  },
  created() {
    this.name = '5555'
    this.data_load();
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
  }
}
// @ is an alias to /src
// import HelloWorld from '@/components/HelloWorld.vue'

// export default {
//   name: 'home',
//   components: {
//     HelloWorld
//   }
// }
</script>
