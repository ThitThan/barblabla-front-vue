<template>
  <div class='modal-content'>
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

        <!-- TableNumber -->
        <div style='margin: 32px 0;'>
          <label for="" style="font-size: 18px">โต๊ะ</label>
          <h3>{{ curT.get('TableNumber') }}</h3>
        </div>

        <div>
          <div class="row" style="margin-bottom: 32px; font-size: 18px">
            <div class="col s6">
              <p>
                โซน:
                {{ curT.get('Zone') ? 'INSIDE':'OUTSIDE' }}
              </p>
            </div>
            <div class="col s6">
              <p>
                จำนวนที่นั่ง:
                {{ curT.get('Seat') }}
              </p>
            </div>
          </div>
        </div>

        </div>

        <!-- customer -->
        <div class='customer-frame'>
          <div class="col s6">
            <p v-if='reserveDate'>
              สถานะการจอง ({{ reserveDate.format('D MMM') }})
            </p>
            <p>
            </p>
          </div>

          <div class="input-field col">
            <i class="material-icons prefix">account_circle</i>
            <input v-model.trim="cusName" id="cusName" placeholder="ชื่อลูกค้า" type="text">
          </div>

          <div class="input-field col">
            <i class="material-icons prefix">phone_in_talk</i>
            <input v-model.trim="cusNo" id="cusNo" placeholder="เบอร์ติดต่อ" type="tel">
          </div>

          <button :class="'waves-effect waves-light btn deep-purple darken-2 ' + (cusNo == '' || cusName == '' || isSaving ? 'disabled ':'')"
            @click='saveUserData()'>
            <i class="material-icons left">save</i>
            บันทึก
          </button>

          <button class="waves-effect waves-light btn red darken-2"
            style='margin-left: 12px'
            v-if='value && value.id'
            @click='clearReservation()'>
            <i class="material-icons left">delete</i>
            นำออก
          </button>

        </div>

      <!-- reservation -->
      <!-- <label v-if="curR">{{ curR }}</label> -->
  </div>
</template>

<style scoped>
.customer-frame {
  background-color: #ffffff09;
  padding: 24px 5%;
  border-radius: 12px;
}
</style>


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
      reserveDate: {},
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
        // console.log(oldR + '->' + newR)
        console.log(newR)
        if (newR && newR.get('customer')) {
          //   this.customerName = ''
          // this.curT = newR.get('Table')
          let cus = newR.get('customer')
          this.cusName = cus.get('name')
          this.cusNo = cus.get('phone')
        } else {
          this.cusName = ''
          this.cusNo = ''
          console.log('cleared')
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
        reserv.set('date',this.reserveDate.toDate())
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
      },

      async clearReservation() {
        let reserv = this.curR
        if (reserv) {
          await reserv.destroy()
          this.$emit('save', reserv)
        }
      },
    }

  }
</script>