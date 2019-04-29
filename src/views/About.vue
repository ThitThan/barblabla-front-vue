<template>
  <div class="about container">
    <h1>This is an about page</h1>

    <!-- v-on -->
    <button v-on:click='hello()'>Click</button>

    <!-- v-model -->
    <input placeholder='name' v-model="name">
    <h2>My name is {{ name }}</h2>

    <!-- v-if -->
    <input placeholder='age' v-model='age'>
    <h2 v-if='age >= 18' style='color: green'>
      Great, you're {{ age }}
    </h2>
    <h2 v-else-if='parseInt(age)'>
      You're under age
    </h2>
    <h2 v-else style='color: red'>
      Error
    </h2>

    <br>

    <!-- v-for -->
    <h3>Movie List (v-for)</h3>
    <ul>
      <!-- <li>movie 1</li> -->
      <!-- <li>movie 2</li> -->
      <li v-for='x in movies' v-bind:key='x'>
        {{ x }}
      </li>
    </ul>

  </div>
</template>

<script>
export default {
  data() {
    return {
      name: '-',
      age: 0,

      movies: [
        'Into the Spider-Verse',
        'The Last Jedi',
        'End Game',
      ],
    }
  },
  created() {
    // load name from db
    this.name = 'XXXX'
  },
  methods: {
    hello() {
      alert('Hello!')
    }
  }
}
</script>
