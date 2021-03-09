<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Variant</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>

      <v-select class="mt-7 mx-4" label="Is_active" outlined dense></v-select>
      <v-spacer></v-spacer>

      <v-select class="mt-7 mx-4" label="Type" outlined dense></v-select>
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

    <!-- Data Tabel -->

    <v-row class="my-n1">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="itemVariants"
          :search="search"
          item-key="name"
          sort-by="name"
          group-by="category"
          class="elevation-1"
          show-group-by
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
    <v-navigation-drawer v-model="drawerRight" clipped right app width="380">
      <v-container>
        <v-toolbar flat>
          <v-toolbar-title class="ml-n4">{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Code"
       
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
           <v-col cols="12">
            <v-text-field
              label="Code"
       
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select label="Is_active" outlined single-line dense></v-select>
          </v-col>
          <v-col cols="12">
            <v-select label="UOM" outlined single-line dense></v-select>
          </v-col>
          <v-col>
            <v-switch
              id="switch"
              :label="itemVariant.is_active ? 'Active' : 'Inactive'"
              v-model="itemVariant.is_active"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2">
          <v-btn v-if="isEdit" color="error" @click="deleteItemVariant()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" outlined color="accent" @click="cancel">
            Cancel
          </v-btn>
          <v-btn primary color="accent" width="100">
            Save
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
  data() {
    return {
      drawerRight: false,
      isEdit: false,
      is_active: false,
      itemVariant: {},
      search: "",
      headers: [
        {
          text: "SKU",
          align: "start",
          value: "code",
        },
        {
          text: "Barcode",
          align: "start",
          value: "barcode",
          groupable: false,
        },
        {
          text: "Item",
          align: "start",
          value: "item_id",
          groupable: false,
        },
        { text: "Name", value: "name", align: "start", groupable: false },
        { text: "Price", value: "price", align: "start", groupable: false },
        {
          text: "Actions",
          value: "actions",
          sortable: false,
          groupable: false,
        },
      ],
    };
  },
  computed: {
    ...mapGetters(["itemVariants"]),
    formTitle() {
      return this.isEdit === false ? "New Item Variant" : "Edit Item Variant";
    },
  },
  created() {
    this.getItemVariant();
  },
  methods: {
    ...mapActions([
      "getItemVariant",
      "createItemVariant",
      "editItemVariant",
      "deleteItemVariant",
      "showDialog",
    ]),
    createItem() {
      this.drawerRight = true;
      this.isEdit = false;

      // this.$v.$reset();
      this.itemVariant = {};
    },
    editItem(itemVariant) {
      this.drawerRight = true;
      this.isEdit = true;
      this.itemVariant = Object.assign({}, itemVariant);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.itemVariant = {};
    },
    deleteItem() {
      this.showDialog({
        title: "Delete Item Variant",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteItemVariant(this.itemVariant);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    save() {
      this.isEdit
        ? this.editItemVariant(this.itemVariant)
        : this.createItemVariant(this.itemVariant);
      console.log(is_active);
      this.itemVariant = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
  },
};
</script>
