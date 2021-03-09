<template>
  <v-container fluid pa-3 class="backdrop">
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Users</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="accent" dark @click="createItem">Create</v-btn>
    </v-toolbar>
    <v-row dense class="mt-1">
      <v-col
        v-for="user in users"
        :key="user.id"
        cols="12"
        lg="4"
        md="4"
        sm="6"
      >
        <v-card @click="editItem(user)" max-height="200px">
          <v-row no-gutters>
            <v-col cols="4">
              <v-img class="ma-1" height="100" contain :src="user.image_url">
                <template v-slot:placeholder>
                  <v-row
                    class="fill-height ma-0"
                    align="center"
                    justify="center"
                  >
                    <v-icon
                      class="mdi mdi-account-box grey--text"
                      style="font-size:100px"
                    ></v-icon>
                  </v-row>
                </template>
              </v-img>
              <p
                class="ma-1 text-center primary white--text "
                style="font-size:12px"
              >
                {{ user.code }}
              </p>
            </v-col>
            <v-col class="pl-2 pt-2" cols="8">
              <h4 class="pa-0 ma-0">Name: {{ user.name }}</h4>
              <p class=" ma-0" style="font-size:14px">
                <strong> Status: {{ user.is_active }} </strong>
              </p>
              <p class="ma-0" style="font-size:14px">
                <strong> Role: {{ user.user_roles_id }} </strong>
              </p>
              <hr class="mr-2" />
              <p class="ma-0" style="font-size:16px">
                <i class="mdi mdi-phone mr-2 primary--text"></i>
                {{ user.phone }}
              </p>
              <p class="ma-0" style="font-size:16px">
                <i class="mdi mdi-email mr-2 primary--text"></i>
                {{ user.email }}
              </p>
            </v-col>
          </v-row>
        </v-card>
      </v-col>
    </v-row>

    <!-- Right Navigation Drawer -->
    <v-navigation-drawer v-model="drawerRight" clipped right app width="380">
      <v-container>
        <v-toolbar flat>
          <v-toolbar-title class="ml-n4">{{ formTitle }}</v-toolbar-title>
        </v-toolbar>
        <v-row dense>
          <v-col cols="12" class="d-flex justify-center mb-4">
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
          <v-col cols="12" class="mb-n8">
            <v-select :items="items" label="role" outlined></v-select>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="user.name"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Email"
              v-model="user.email"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>

          <v-col cols="12">
            <v-text-field
              label="Phone"
              v-model="user.phone"
              outlined
              dense
              hide-details
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-switch
              id="switch"
              :label="user.is_active ? 'Active' : 'Inactive'"
              v-model="user.is_active"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2">
          <v-btn v-if="isEdit" color="error">
            <v-icon>mdi-delete</v-icon>
          </v-btn>
          <v-spacer></v-spacer>
          <v-btn class="mr-2" outlined color="accent" @click="cancel()">
            Cancel
          </v-btn>
          <v-btn primary color="accent" width="100" @click="save">
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
  name: "User",
  data: () => ({
    drawerRight: false,
    isEdit: false,
    imageCroppa: {},
    user: {},
    initialImage: null,
    selectedLocation: null,
    items: [],
  }),

  computed: {
    ...mapGetters(["users"]),
    formTitle() {
      return this.isEdit === false ? "New User" : "Edit User";
    },
  },
  created() {
    this.getUsers();
  },
  methods: {
    ...mapActions([
      "getUsers",
      "createUser",
      "editUser",
      "deleteUser",
      "showDialog",
    ]),
    createItem() {
      this.drawerRight = true;
      this.isEdit = false;

      // this.$v.$reset();
      this.user = {};
    },
    editItem(user) {
      this.drawerRight = true;
      this.isEdit = true;
      this.user = Object.assign({}, user);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.user = Object.assign({}, user);
    },
    deleteItem() {
      this.showDialog({
        title: "Delete User",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteUser(this.user);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    save() {
      this.isEdit ? this.editUser(this.user) : this.createUser(this.user);
      this.user = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
  },
};
</script>
