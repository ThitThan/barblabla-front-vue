<template>
  <div id="reservation" class='container'>

    <img class='logo' style='height: 64px; margin-bottom: 24px;' alt="logo" src="@/assets/refeel-logo.png">

    <div class='content card i-card'>
      <h4 style='margin-bottom: 12px; margin-top: 0px'>
        [ข้อมูลการจอง]
      </h4>
      <div class="row">


    <form class="col s12" @submit.prevent="makeReservation()">
      <div class="row">
        <div class="input-field col s12">
          <input id="์name" type="text">
          <label for="name">ชื่อ(สามารถระบุชื่อเล่นได้)</label>
        </div>
      </div>
    <div class="row">
        <div class="input-field col s12">
          <input id="์amount" type="number" >
          <label for="amount">จำนวน(คน)</label>
        </div>
    </div>    
    <div class="row">
        <div class="input-field col s12">
          <input id="์tel" type="tel" >
          <label for="tel">เบอร์โทร(ไม่ต้องเว้นวรรค)</label>
        </div>    
      </div>
     <button class="btn btn-white waves-effect waves-purple" type="submit" name="action">Submit
    <i class="material-icons right">send</i>
  </button>    
    </form>
  </div>
    </div>


  </div>
</template>

<script>

export default {
  name: 'reservation',
  methods: {
    makeReservation() {
      alert('บันทึกข้อมูลสำเร็จ')

      // actually submitting
    },
  },
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

