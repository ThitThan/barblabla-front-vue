
<template>
  <div class="container">
    <h3><i class="material-icons">portrait</i> จัดการลูกค้า</h3> 
    <h6>{{ customer.length }} คน</h6>

    <!-- <input placeholder="รายซื่อลูกค้า" v-model='name'> -->

 <!-- <div>{{ name }}</div> -->
   
    <div class="row">
       
    </div>
      
    <ul class="collection" >
        <li class="collection-item row" v-for="c in customer" v-bind:key='c.id'>
            <div class="col s5"><i class="material-icons">person</i>{{ c.get("name") }}
            <div class="col s12"><i class="material-icons">phone</i> {{ c.get("phone") }} 
            </div>
            </div>
          <!-- <div class="col s3">
             {{ c.get("name") }} 
             </div>
             <div class="col s2">
            {{ c.get("phone") }} 
             </div> -->
       
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
