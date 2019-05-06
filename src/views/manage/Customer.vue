
<template>
  <div class="about container">
    <h3>จัดการลูกค้า</h3>

    <input placeholder="รายซื่อลูกค้า" v-model='name'>

    <div>{{ name }}</div>
    <div class="row">
      <!-- <div class='col s12'>This div is 12-columns wide on all screen sizes</div> -->
      <div class="col s3">ชื่อลูกค้า</div>
      <div class="col s1 left"></div>
      <div class="col s4">เบอร์โทร</div>
       
    </div>
    <ul class="collection" >
        <li class="collection-item" v-for="c in customer" v-bind:key='c.id'>
            <div>
                {{ c.get("name") }}
            </div>

         <div> 
               {{ c.get("phone") }}
               </div>
        </li>
    </ul>
  </div>

</template>

<script>
// PARSE
import Parse from 'parse'
const Customer = Parse.Object.extend("Customer")

export default {
  data() {
    return {
      name: '...',
      customer: [],
    }
  },
  created() {
    this.name = ''
    this.loadData()
  },
  methods: {
    hello() {
      alert('Hello!')

    }
    ,async loadData(){
        const query = new Parse.Query(Customer)
        let tables = await query.find()

        this.customer = tables
    }
  }

}
</script>
