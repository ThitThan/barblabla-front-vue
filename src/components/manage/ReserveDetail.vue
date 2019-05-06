<template>
  <div>
    <!-- หมุนๆ ตอนโหลด -->
    <div id='loading' v-if='isLoading'>
      <div v-show='isLoading'>
        <div class="preloader-wrapper small active">
          <div class="spinner-layer spinner-yellow-only">
            <div class="circle-clipper left">
              <div class="circle"></div>
            </div>
            <div class="gap-patch">
              <div class="circle"></div>
            </div>
            <div class="circle-clipper right">
              <div class="circle"></div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div v-if="curT">
      <label>
        <h4 style="margin-bottom: 32px">
          <!-- {{ title }} -->
          <!-- {{ user ? 'ข้อมูลสตาฟ':'เพิ่มสตาฟ' }} -->
        </h4>

        <!-- TableNumber -->

        <div class>
          <label for="username">หมายเลขโต๊ะ</label>
          <h4 style="margin-bottom: 32px">{{ curT.get('TableNumber') }}</h4>
        </div>

        <div class>
          <div class="row">
            <div class="col s6">
              <p style="margin-bottom: 32px">
                โซน:
                {{ curT.get('Zone') }}
              </p>
            </div>
            <div class="col s6">
              <p style="margin-bottom: 32px">
                จำนวนที่นั่ง:
                {{ curT.get('Seat') }}
              </p>
            </div>
            <div class="input-field col">

              <i class="material-icons prefix">account_circle</i>
              <input v-model="cusName" id="cusName" placeholder="ชื่อลูกค้า" type="text">
            </div>
            <div class="input-field col">

              <i class="material-icons prefix">phone_in_talk</i>
              <input v-model="cusNo" id="cusNo" placeholder="เบอร์ติดต่อ" type="number">
            </div>
            <button :class="'waves-effect waves-light btn deep-purple darken-2 ' + (isSaving ? 'btn-disabled':'')"
              @click='saveUserData()'>
              <i class="material-icons left">save</i>
              บันทึก
            </button>
          </div>
        </div>
      </label>

      <hr>

      <!-- reservation -->
      <label v-if="curR">{{ curR }}</label>
    </div>
  </div>
</template>

<script>
  import Parse from 'parse'
  var Reservation = Parse.Object.extend("Reservation");
  var Tableja = Parse.Object.extend("Tableja");
  var Customer = Parse.Object.extend("Customer");
  // import Modal from '@/components/Modal'

  export default {
    props: {
      value: {
        type: Reservation,
      },
      curT: {},
    },
    data() {
      return {
        isLoading: false,
        isSaving: false,

        curR: null,
        // curT: null,
        cusName: '',
        cusNo: '',
      }
    },

    watch: {
      value(newR, oldR) {
        this.curR = newR
      },

      curR(newR, oldR) {
        console.log(oldR + '->' + newR)
        if (newR) {
          //   this.customerName = ''
          // this.curT = newR.get('Table')
          let cus = newR.get('customer')
          this.cusName = cus.get('name')
          this.cusNo = cus.get('phone')
        } else {
          this.cusName = ''
          this.cusNo = ''
        }
      },
    },

    saveReservationData() {
      // $emit('save', ...)
    },
    methods: {
      async saveUserData() {
        this.isSaving = true // start saving

        let username = this.cusName
        let telno = this.cusNo

        //
        // Customer
        //

        // Look if the user already in DB
        var query = new Parse.Query(Customer)
        query.equalTo('phone', telno)
        var customer = await query.first()

        // if not, create new user
        if (!customer) {
          customer = new Customer()
        }
        customer.set('name', username)
        customer.set('phone', telno)
        await customer.save()
        console.log('customer data updated')

        //
        // Reservation
        //
        let reserv = this.curR
        if (!reserv) {
          reserv = new Reservation()
        }
        reserv.set('customer', customer)
        reserv.set('Table', this.curT)
        await reserv.save()  
        console.log('reservation data updated')

        //
        // Table
        //
        // let table = this.curT
        // let reservList = table.get('Reservations')
        // if (!reservList) {
        //   reservList = []
        // }
        // reservList.push(reserv)
        // table.set('Reservations', reservList)
        // await table.save()
        let table = this.curT
        let relation = table.relation('Reservations')
        relation.add(reserv)
        await table.save()
        console.log('table data updated')
        
        // Everything is saved --> transmit the 'save' event
        this.isSaving = false
        this.$emit('save', reserv)
      }
    }

  }
</script>