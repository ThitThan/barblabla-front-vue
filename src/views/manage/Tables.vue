
<template>
  <div class="container">
    <!-- titles -->
    <h2> โต๊ะ </h2>
    <h6>{{ table.length }} ตัว</h6>

    <br>
    
    <ul class="collection">
      <li class="collection-item" v-for="t in table" v-bind:key='t'>
        <div>   </div>
        {{t.get('TableNumber')}}
        {{t.get("Seat")}}
      </li>
    </ul>

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

export default {
  data() {
    return {
      isLoading: false,
      name: '...',

      table: [],
    }
  },
  created() {
    this.name = '...'
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
</script>
