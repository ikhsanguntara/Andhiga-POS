<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Inventory</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-text-field
        class="mx-4"
        v-model="search"
        label="Search"
        append-icon="mdi-magnify"
        single-line
        outlined
        dense
        hide-details
      ></v-text-field>
      <v-btn color="accent" dark @click="createItem">Create</v-btn>
    </v-toolbar>
  </v-container>
</template>

<script>
export default {
  name: "Inventory",
};
</script>
