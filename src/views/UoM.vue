<template>
  <v-container class="backdrop" fluid>
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Unit of Measurement</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-select
        v-model="is_active"
        :items="status"
        name="name"
        item-text="name"
        class="mt-7 mx-4"
        label="Active"
        outlined
        dense
      ></v-select>
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

    <!-- Table -->
    <v-row>
      <v-col>
        <v-data-table
          :headers="headers"
          :items="activeItems"
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
    <v-navigation-drawer v-model="drawerRight" clipped right app width="380">
      <v-container>
        <v-toolbar flat>
          <v-toolbar-title class="ml-n4">{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-row dense>
          <v-col cols="12">
            <v-text-field
              label="Code"
              v-model="uom.code"
              @blur="$v.uom.code.$touch()"
              :error-messages="codeErrors"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="uom.name"
              @blur="$v.uom.name.$touch()"
              :error-messages="nameErrors"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col>
            <v-switch
              id="switch"
              :label="uoms.is_active ? 'Active' : 'Inactive'"
              v-model="uoms.is_active"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2">
          <v-btn v-if="isEdit" color="error" @click="deleteItem(uom)">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" outlined color="accent" @click="cancel">
            Cancel
          </v-btn>
          <v-btn
            primary
            color="accent"
            @click="save"
            width="100"
            :disabled="$v.$invalid"
          >
            Save
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required } from "vuelidate/lib/validators";

export default {
  name: "UoM",

  data: () => ({
    drawerRight: false,
    isEdit: false,
    search: "",
    is_active: true,
    status: [
      {
        name: "Active",
        value: true,
      },
      {
        name: "Inactive",
        value: false,
      },
    ],
    // activeStatus: ["Active", "Inactive"],
    uom: {},
    headers: [
      { text: "Code", value: "code" },
      { text: "Name", value: "name" },
      { text: "Status", value: "is_active" },
      { text: "Actions", value: "actions", sortable: false },
    ],
  }),

  validations: {
    uom: {
      code: { required },
      name: { required },
    },
  },

  computed: {
    ...mapGetters(["uoms"]),
    emptyData() {
      return this.uoms.length > 0 ? false : true;
    },
    formTitle() {
      return this.isEdit === false ? "New UoM" : "Edit UoM";
    },
    codeErrors() {
      const errors = [];
      if (!this.$v.uom.code.$dirty) return errors;
      !this.$v.uom.code.required && errors.push("Code is required");
      return errors;
    },
    nameErrors() {
      const errors = [];
      if (!this.$v.uom.name.$dirty) return errors;
      !this.$v.uom.name.required && errors.push("Name is required");
      return errors;
    },
    activeItems() {
      var items = this.uoms.filter((item) => (item.is_active = this.is_active));
      return this.uoms.filter((item) => item.is_active === this.is_active);
    },
  },

  created() {
    this.getUom();
  },

  methods: {
    ...mapActions([
      "getUom",
      "createUom",
      "editUom",
      "deleteUom",
      "showDialog",
    ]),
    createItem() {
      this.drawerRight = true;
      this.isEdit = false;

      this.$v.$reset();
      this.uom = {};
    },
    editItem(uom) {
      this.drawerRight = true;
      this.isEdit = true;
      this.uom = Object.assign({}, uom);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.uom = {};
    },
    deleteItem(uom) {
      this.showDialog({
        title: "Delete UoM",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteUom(uom);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    save() {
      this.isEdit ? this.editUom(this.uom) : this.createUom(this.uom);
      this.uom = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
  },
};
</script>
