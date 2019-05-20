
<template>
  <div class="container">
    <!-- <h3>ลูกค้า</h3>  -->

    <center>
        <div>
           <!-- <label for='search'>ค้นหา</label> -->
      <div class="input-field col ">
        <i class="material-icons prefix ">search</i>
        <input style= " max-width: 50%" v-model='username' id='search' placeholder='ค้นหา' type='text' />
        <button class="'waves-effect waves-light btn deep-purple darken-2 align top:20px '" style="margin-left: 20px;"
          @click='searchData()'>
          <i class="material-icons left">search</i>
          ค้นหา
        </button>
        </div>
        </div>
    </center>

    <!-- <h6>{{ customer.length }} คน</h6> -->

    <!-- <input placeholder="รายซื่อลูกค้า" v-model='name'> -->

 <!-- <div>{{ name }}</div> -->
   
    <div class="row">
       
    </div>
      <center>
    <!-- <ul class="collection" >
        <li class="collection-item flex flex-column " style='padding: 17px 26px;' v-for="c in customer" v-bind:key='c.id'>
            <div style='text-align: left; font-size: 27px; margin: 8px 0;'>

                {{ c.get("name") }} 
            </div>
            <div style='text-align: left;'>
                <i class="material-icons tiny">phone</i> 
                {{ c.get("phone") }} 
            </div>
       
        </li>
    </ul> -->
      </center>
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

    },
    searchData(){
      //รอเขียน คำสั่งค้นหา
    }
    ,async loadData(){
        const query = new Parse.Query(Customer)
        let tables = await query.find()

        this.customer = tables
    }
  }

}
</script>
