<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Category</v-toolbar-title>
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

    <!-- Data Tabel -->

    <v-row class="my-n1">
      <v-col>
        <v-data-table
          :headers="headers"
          :items="itemCategories"
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
              v-model="itemCategory.code"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              :items="itemGroups"
              item-text="name"
              label="Category"
              v-model="selectedItemGrupId"
              outlined
              single-line
              dense
            ></v-select>
            <v-text-field
              label="Name"
              v-model="itemCategory.name"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-switch
              id="switch"
              :label="itemCategories.is_active ? 'Active' : 'Inactive'"
              v-model="itemCategories.is_active"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2">
          <v-btn v-if="isEdit" color="error" @click="deleteItem()">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" outlined color="accent" @click="cancel">
            Cancel
          </v-btn>
          <v-btn primary color="accent" @click="save" width="100">
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
  name: "Category",

  data() {
    return {
      itemCategory: {},
      selectedItemGrupId: null,
      drawerRight: false,
      isEdit: false,
      is_active: false,
      search: "",
      headers: [
        {
          text: "code",
          align: "start",
          value: "code",
          groupable: false,
        },
        {
          text: "Name",
          align: "start",
          value: "name",
          groupable: false,
        },

        { text: "Category", value: "item_group_id", align: "start" },
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
    ...mapGetters(["itemCategories", "itemGroups"]),
    formTitle() {
      return this.isEdit === false ? "New Category" : "Edit Category";
    },
  },

  created() {
    this.getItemCategory();
    this.getItemGroup();
  },
  methods: {
    ...mapActions([
      "getItemCategory",
      "createItemCategory",
      "editItemCategory",
      "deleteItemCategory",
      "showDialog",
      "getItemGroup",
    ]),

    createItem() {
      this.drawerRight = true;
      this.isEdit = false;

      // this.$v.$reset();
      this.itemCategory = {};
    },
    editItem(itemCategory) {
      this.drawerRight = true;
      this.isEdit = true;
      this.itemCategory = Object.assign({}, itemCategory);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.itemCategory = {};
    },
    deleteItem(itemCategory) {
      this.showDialog({
        title: "Delete Category",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteItemCategory(itemCategory);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    save() {
      this.isEdit
        ? this.editItemCategory(this.itemCategory)
        : this.createItemCategory(this.itemCategory);
      console.log(is_active);
      this.itemCategory = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
  },
};
</script>
