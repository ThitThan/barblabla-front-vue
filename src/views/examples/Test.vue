
<template>
  <div class="about container">
    <h3>This is the staff page</h3>

    <input placeholder="ชื่อ" v-model='name'>

    <div>{{ name }}</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '...'
    }
  },
  created() {
    this.name = '555666665'
  },
  methods: {
    hello() {
      alert('Hello!')
    }
  }
}
</script>
