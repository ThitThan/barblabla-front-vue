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
        </div>

        
    </div>
</template>

<script>

import Parse from 'parse'
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

        table: null,
      }
  },

  watch:{
      value(newT, oldT){
          this.table = newT
      },

      table(newT, oldT){
          console.log(oldT + '->' +newT)
          if(newT != null && newT != undefined){
              
          }
      },      
  },  
}



</script>