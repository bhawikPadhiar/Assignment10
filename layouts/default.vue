<template>
  <v-app dark>
    <v-app-bar
      :clipped-left="clipped"
      fixed
      app
    >
      <v-toolbar-title>{{ title }}</v-toolbar-title>
      <div>
       <v-btn text to="/">Home</v-btn>
      </div>
      <v-spacer></v-spacer>
     
       <v-spacer></v-spacer>
      <v-spacer />
      <div > 
          <v-btn text to="/login">Login</v-btn>
          <v-btn text to ="/register">Register</v-btn>
        </div>
    </v-app-bar>
    <v-main>
      <v-container>
        <Nuxt />
      </v-container>
    </v-main>
   
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  name: 'DefaultLayout',
  data () {
    return {
      clipped: false,
      drawer: false,
      fixed: false,
      miniVariant: false,
      right: true,
      rightDrawer: false,
      title: 'TodoList'
    }
  }
}
</script>
