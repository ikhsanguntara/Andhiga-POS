<template>
  <v-container fluid pa-3 class="backdrop">
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Outlet</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="accent" dark @click="addItem">Create</v-btn>
    </v-toolbar>
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="outlets"
          sort-by="id"
          class="elevation-1 mt-2"
        >
          <template v-slot:[`item.actions`]="{ item }">
            <v-icon small class="mr-2" @click="editItem(item)">
              mdi-pencil
            </v-icon>
            <v-icon small color="error" @click="deleteItem(item)">
              mdi-delete
            </v-icon>
          </template>
        </v-data-table>
      </v-col>
    </v-row>

    <!-- Right Navigation Drawer -->
    <v-navigation-drawer
      v-model="drawerRight"
      fixed
      right
      clipped
      app
      width="380"
    >
      <v-container>
        <v-toolbar flat>
          <v-toolbar-title class="ml-n4">{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-row dense>
          <v-col
            cols="12"
            class="d-flex justify-center mb-4"
            style="backgorun-color: blue;"
          >
            <croppa
              v-model="imageCroppa"
              :width="180"
              :height="180"
              :quality="2"
              placeholder="Upload Image"
              :placeholder-font-size="14"
              :initial-image="initialImage"
              :prevent-white-space="true"
            />
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Code"
              v-model="outlet.code"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="outlet.name"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Phone Number"
              v-model="outlet.phone"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedCity"
              :items="cities"
              item-text="name"
              label="Select City"
              outlined
              dense
            ></v-select>
          </v-col>
          <v-col cols="6">
            <v-select
              v-model="selectedLocation"
              :items="locations"
              item-text="name"
              label="Select Location"
              outlined
              dense
            ></v-select>
          </v-col>

          <v-col cols="12" class="mt-n6">
            <v-textarea
              outlined
              rows="3"
              name="input-7-4"
              v-model="outlet.address"
              label="Addres"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2">
          <v-btn v-if="isEdit" color="error">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" outlined color="accent" @click="cancel"
            >Cancel</v-btn
          >
          <v-btn primary color="accent" width="100" @click="save">Save</v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
// import { required, minLength, sameAs } from "vuelidate/lib/validators";
export default {
  name: "Outlet",
  data: () => ({
    drawerRight: false,
    isEdit: false,
    imageCroppa: {},
    outlet: {},
    initialImage: null,
    selectedLocation: null,
    selectedCity: null,
    headers: [
      { text: "Code", value: "code" },
      { text: "Name", value: "name" },
      // { text: "imageUrl", value: "image_url" },
      { text: "Phone", value: "phone" },
      { text: "Location", value: "location.name" },
      { text: "City", value: "city.name" },
      { text: "Address", value: "address" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),
  // validations: {
  //   name: { required },
  //   phone_number: { phone_number },
  //   city: { required },
  //   locations: { required },
  // },
  created() {
    this.getOutlet();
    this.getLocations();
    this.getCities();
  },
  methods: {
    ...mapActions([
      "getOutlet",
      "createOutlet",
      "editOutlet",
      "deleteOutlet",
      "showDialog",
      "uploadImage",
      "getLocations",
      "getCities",
    ]),
    addItem() {
      this.drawerRight = true;
      this.isEdit = false;

      // this.$v.$reset();
      this.outlet = {};
      // this.refreshimage({});
    },
    editItem(outlet) {
      this.drawerRight = true;
      this.isEdit = true;
      this.outlet = Object.assign({}, outlet);
      // this.refreshimage(outlet);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.outlet = {};
    },
    deleteItem(outlet) {
      this.showDialog({
        title: "Delete Outlet",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteOutlet(outlet);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    save() {
      this.isEdit
        ? this.editOutlet(this.outlet)
        : this.createOutlet(this.outlet);
      this.outlet = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
  },

  computed: {
    ...mapGetters(["outlets", "cities", "locations"]),
    formTitle() {
      return this.isEdit === false ? "New Outlet" : "Edit Outlet";
    },
  },
};
</script>
