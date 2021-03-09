<template>
  <v-row class="fill-height backdrop">
    <v-col
      class="d-none d-sm-flex align-center justify-center primary"
      cols="6"
      sm="7"
      md="6"
    >
      <div class="text-center">
        <v-icon
          class="mdi mdi-cash-register mb-4"
          color="white"
          alt="logo"
          style="font-size:150px"
        ></v-icon>
        <h1 class="white--text">Andhiga PoS</h1>
      </div>
    </v-col>
    <v-col cols="12" sm="5" md="6">
      <v-fade-transition>
        <router-view></router-view>
      </v-fade-transition>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "Home",
};
</script>
