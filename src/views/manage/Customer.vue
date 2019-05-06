
<template>
  <div class="container">
    <h3><i class="material-icons">portrait</i> จัดการลูกค้า</h3> 
    <h6>{{ customer.length }} คน</h6>

    <!-- <input placeholder="รายซื่อลูกค้า" v-model='name'> -->

 <!-- <div>{{ name }}</div> -->
   
    <div class="row">
      <div class="col s6">  ชื่อลูกค้า</div>
      <div class="col s6">  เบอร์โทร</div>
       
    </div>
      
    <ul class="collection" >
        <li class="collection-item row" v-for="c in customer" v-bind:key='c.id'>
            <div class="col s4">{{ c.get("name") }} 
            <div class="col s6"><i class="material-icons">person</i>
            </div></div>
             <div class="col s6">{{ c.get("phone") }}
            <div class="col s9"><i class="material-icons">phone</i>
             </div></div>
            
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
