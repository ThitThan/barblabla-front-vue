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

        <div class='content from flex flex-column' v-else>
            <h4 style='margin-bottom: 32px'>
                {{ (zone && zone.id) ? 'แก้ไขโซน':'เพิ่มโซน'}}
            </h4>

            <!-- table No -->
            <label for = 'Name'>ชื่อโซน</label>
            <div class = "input-field col">
                <!-- <i class = "material-icons prefix">account_circle</i> -->
                <input v-model='Name' id='Name' placeholder = 'โซน ...' type='text' />
            </div>

            <!-- height -->
            <label for = 'Height'>ขนาด</label>
            <div class = "input-field col">
                <i class = "material-icons prefix">crop</i>

                <input v-model.number='Height' id='Height' placeholder='กว้าง' type='number' />
                <input v-model.number='Width' id='Width' placeholder='ยาว' type='number' />
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

        <!-- delete button-->
        <div v-if='zone && zone.id' 
            class='flex' style='padding-top: -20px; padding-right: 0px; justify-content: flex-end'>
            
            <button :class="'btn-floating btn-small waves-effect waves-light red darken-2' + (isDeleting ? 'btn-disabled':'')" align='left'
            @click='deleteTableData()'>

            <i class = "material-icons left">delete</i>
            ลบโต๊ะ
            </button>
        </div>    

        
    </div>
</template>

<script>

import Parse from 'parse'
import { parse } from 'path';
var TableZone = Parse.Object.extend("TableZone");
// import Modal from '@/components/Modal'

export default {
  props: {
    value: {
      type: TableZone,
    },
  },
  data(){
      return{
        isLoading: false,
        isSaving: false,
        isDeleting: false,
        
        zone: null,
        Name: '',
        Width: 0,
        Height: 0,
      }
  },

  watch:{
      value(newT, oldT){
          this.zone = newT
      },

      zone(newT, oldT){
          console.log(oldT + '->' + newT)
          if(newT != null && newT != undefined){
            this.Name = newT.get('Name')

            if (newT.get('Width')) {
                this.Width = newT.get('Width')
            }
            else {
                this.Width = 0
            }
            
            if (newT.get('Height')) {
                this.Height = newT.get('Height')
            }
            else {
                this.Height = 0
            }
          }
      },      
  },
methods: {
saveTableData(){
    this.isSaving = true //start saving

    let zone = this.zone

    if(zone == null){
        zone = new TableZone()
    } 

    zone.set('Name', this.Name)
    zone.set('Height', this.Height)
    zone.set('Width', this.Width)

    //await TAble.save
    zone.save().then(
        (object) => {
            console.log('success')
            this.isSaving = false // finish saving
            this.$emit('input', zone)
            this.$emit('save', zone)
        },
        (error) => {
            console.error(error)
            this.isSaving = false // finish saving
        }        
    )
  },

  deleteTableData(){
      this.table.destroy()
      .then(
          (object) => {
              console.log('remove this table success')
              this.isDeleting = false // finished saving
              this.user = object
              this.$emit('destroy')
          },
          (error) => {
              console.error(error)
              this.isDeleting = false // finished saving

              alert('เกิดข้อผิดพลาด โปรดลองใหม่ในภายหลัง')
          }
      )
  },
}, // End method
  
    
}



</script>