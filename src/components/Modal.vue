<template>
  <div class="modal" ref='modal'>
    <!-- close button -->
    <div class='flex' style='margin-bottom: -32px; padding-top: 16px; padding-right: 16px; justify-content: flex-end'>
      <button :class="'btn-floating btn-small waves-effect waves-light grey darken-2'" align='left' @click='close'>
        <i class="material-icons left">close</i>
      </button>
    </div>
    <!-- children view -->
    <div class="modal-content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Parse from 'parse'

export default {
  props: [
    'value'
  ],
  data() {
    return {
      isLoading: true,

      modalInstance: null,

      modalVisible: false
    }
  },
  methods: {
    close() {
      this.modalVisible = false
    },
  },
  watch:{
    // for v-model
    value (newVal, oldVal) {
      this.modalVisible = newVal
    },

    // internal var
    modalVisible (newVal, oldVal) {
      if (newVal) {
        this.modalInstance.open()
        this.$emit('open', newVal)
      }
      else {
        this.modalInstance.close()
        this.$emit('close', newVal)
      }

      this.$emit('input', newVal)
    }
  },
  created() {
  },
  mounted() {
    let options = {
      onOpenEnd: () => {
        this.modalVisible = true
      },
      onCloseEnd: () => {
        this.modalVisible = false
      },
      // dismissible: false,
      preventScrolling: false,
      // preventScrolling: true,
    }
    this.modalInstance = M.Modal.init(this.$refs['modal'], options);
    // console.log(this.$refs['modal'])
    // console.log(this.modalInstance)
  },
}
</script>

<style scoped>
#username {
  font-size: 19px;
}
</style>

