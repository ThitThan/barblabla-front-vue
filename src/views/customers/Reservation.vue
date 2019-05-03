<template>
  <div id="reservation" class='container'>

    <img class='logo' style='height: 64px; margin-bottom: 24px;' alt="logo" src="@/assets/refeel-logo.png">

    <div class='content card i-card'>
      <h4 style='margin-bottom: 12px; margin-top: 0px'>
        จองโต๊ะ
      </h4>
      <div>ยังไม่ได้ทำจ้า รอแปบนะ :3</div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'reservation',
}
</script>

<style scoped>
#reservation {
  /* display: flex; */
  height: 100vh;
  width: 100vw;
  max-width: 100%;

  padding: 32px 24px;
  /* background: red; */
}
.i-card {
  max-width: 400px;
  margin: 0 auto;

  padding: 32px 24px;
}

</style>

