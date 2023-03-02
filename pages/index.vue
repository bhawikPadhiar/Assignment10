<template>
  <div>
    <h1 class="h1">TODO LIST using nuxt.js,vuetify,vuex </h1>
    <h3 class="h3">Assignment 10</h3>
    <v-spacer></v-spacer>
    <div class="btn">
      <v-btn text to="/login">Login</v-btn>

      <v-btn text to="/register">Register</v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: 'IndexPage'
}
</script>
<style>
.btn {
  margin-top: 100px;
  margin-left: 700px;
}

h1 {
  margin-top: 100px;
  margin-left: 700px;
}

h3 {

  margin-left: 700px;
}
</style>
