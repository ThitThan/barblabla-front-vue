<template>
  <div id="not-found">
    <h5 style='margin:auto'>ยังไม่ได้ทำจ้า รอแปบนะ :3</h5>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'not-found',
  components: {
    HelloWorld
  }
}
</script>

<style scoped>
#not-found {
  display: flex;
  height: 100vh;
  width: 100vw;
  max-width: 100%;
  /* background: red; */
}

</style>

