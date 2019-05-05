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
                <input v-model="cusName" id="username" placeholder="ชื่อลูกค้า" type="text">
              </div>
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
var Tablejaa = Parse.Object.extend("Tablejaa");
// import Modal from '@/components/Modal'

export default {
  props: {
    value: {
      type: Reservation,
    },
    curT: {},
  },
  data(){
      return{
        isLoading: false,
        // isSaving: false,

        curR: null,
        // curT: null,
        cusName: '',
      }
  },

  watch:{
      value(newR, oldR){
          this.curR = newR
      },

      curR(newR, oldR){
          console.log(oldR + '->' +newR)
          if (newR){
            //   this.customerName = ''
            // this.curT = newR.get('Table')
            let cus = newR.get('customer')
            this.cusName = cus.get('name')
          }
          else {
            this.cusName = ''
          }
      },      
  },

  saveReservationData(){
    // $emit('save', ...)
  },
    
}



</script>