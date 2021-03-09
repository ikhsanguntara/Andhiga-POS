<template>
  <v-main class="pa-0 fill-height">
    <!-- Application Bar -->
    <v-app-bar app color="primary" dark>
      <v-icon class="mdi mdi-cash-register mr-4" />
      <v-toolbar-title style="min-width:150px">
        Andhiga - Point of Sales
      </v-toolbar-title>
      <v-spacer />
      <v-btn text class="white--text" to="/login">Contact Us</v-btn>
      <v-btn text class="white--text" to="/login">Login</v-btn>
    </v-app-bar>

    <v-container class="pa-0" fluid>
      <router-view></router-view>
    </v-container>
  </v-main>
</template>

<script>
export default {
  name: "Base",
};
</script>
