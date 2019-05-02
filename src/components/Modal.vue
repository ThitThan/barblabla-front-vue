<template>
  <div class="modal" ref='modal'>
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

