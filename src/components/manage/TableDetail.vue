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

        <div class='content from flex flex-column flex-left' v-else>
            <h4 style='margin-bottom: 32px'>
                {{ table ? 'แก้ไขโต๊ะ':'เพิ่มโต๊ะ'}}
            </h4>

            <!-- table No -->
            <label for = 'TableNumber'> เลขโต๊ะ </label>
            <div class = "input-field col">
                <i class = "material-icons prefix">account_circle</i>
                <input v-model = 'TableNumber' id='TableNumber' placeholder = 'เลขโต๊ะ' type='text' />
            </div>

            <!-- Seat -->
            <label for = 'Seat'> จำนวนที่ </label>
            <div class = "input-field col">
                <i class = "material-icons prefix">account_circle</i>
                <input v-model = 'Seat' id='Seat' placeholder = 'จำนวนที่' type='text' />
            </div>

            <!-- Zone -->
            <div>
                <label>โซน</label>
                <div class = 'input-field col'>
                    <div class="switch">
                        <label>
                            <input type="checkbox" v-model='Zone'>
                            <span class="lever"></span>
                        </label>
                    </div>
                </div>
            </div>

            <!--ปุ่มเซฟนะจ๊ะ-->
            <div style='margin-top: 48px'>

                <!-- button -->
                <button :class="'waves-effect waves-light btn deep-purple darken-2 ' + (isSaving ? 'btn-disabled':'')"
                @click='saveTableData()'>
                    <i class="material-icons left">save</i>
                    บันทึก
                </button>
            </div>
        </div>



        
    </div>
</template>

<script>

import Parse from 'parse'
import { parse } from 'path';
var Tableja = Parse.Object.extend("Tableja");
// import Modal from '@/components/Modal'

export default {
  props: {
    value: {
      type: Tableja,
    },
  },
  data(){
      return{
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        
        TableNumber: '',
        Zone: true,
        Seat: '',
        table: '',
      }
  },

  watch:{
      value(newT, oldT){
          this.table = newT
      },

      table(newT, oldT){
          console.log(oldT + '->' +newT)
          if(newT != null && newT != undefined){
            this.TableNumber = newT.get('TableNumber')
            this.Zone = newT.get('Zone')
            this.Seat = newT.get('Seat')
          }
      },      
  },
methods: {
saveTableData(){
    this.isSAving = true //start saving

    let table = this.table

    if(table == null){
        table = new Tableja()
    } 

    table.set('TableNumber', parseInt(this.TableNumber))    
    table.set('Seat', parseInt(this.Seat))
    table.set('Zone', this.Zone)

    //await TAble.save
    table.save(null, {
        useMasterKey: true
    })
    .then(
        (object) => {
            console.log('success')
            this.isSaving = false // finish saving
            this.$emit('input', table)
            this.$emit('save', table)
        },
        (error) => {
            console.error(error)
            this.isSaving = false // finish saving
        }        
    )
  },
},
  
    
}



</script>