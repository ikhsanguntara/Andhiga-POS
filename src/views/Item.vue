<template>
  <v-container fluid pa-3 class="backdrop">
    <!-- Toolbar -->
    <v-toolbar flat>
      <v-toolbar-title>Item</v-toolbar-title>
      <v-divider class="mx-4" inset vertical></v-divider>
      <v-spacer></v-spacer>
      <v-btn color="accent" dark @click="createItem">Create</v-btn>
    </v-toolbar>
    <v-row dense class="mt-1">
      <v-col
        v-for="item in items"
        :key="item.id"
        cols="12"
        lg="4"
        md="4"
        sm="6"
      >
        <v-card @click="editItem(item)" max-height="200px">
          <v-row no-gutters>
            <v-col cols="4">
              <v-img class="ma-1" height="100" contain :src="item.image_url">
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
                {{ item.sku }}
              </p>
            </v-col>
            <v-col class="py-3" cols="8">
              <v-card-title class="py-0 font-weight-black ">
                {{ item.name }}
              </v-card-title>
              <v-card-text class="py-0 subtitle-1 font-weight-medium">
                {{ item.description }}
              </v-card-text>

              <v-card-text class="py-0 font-weight-medium">
                Rp: {{ item.price }}
              </v-card-text>
              <v-card-text class="py-0 font-weight-medium">
                {{ item.barcode }}
              </v-card-text>
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
          <v-col cols="12">
            <v-text-field
              label="SKU"
              v-model="item.sku"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Barcode"
              v-model="item.barcode"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Name"
              v-model="item.name"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-text-field
              label="Description"
              v-model="item.description"
              outlined
              single-line
              dense
            ></v-text-field>
          </v-col>
          <v-col cols="12">
            <v-select
              label="Item Group"
              v-model="item.item_group_id"
              outlined
              single-line
              dense
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select
              label="Item Category"
              outlined
              single-line
              dense
            ></v-select>
          </v-col>
          <v-col cols="12">
            <v-select label="UOM" outlined single-line dense></v-select>
          </v-col>
          <v-col cols="12">
            <v-switch
              id="switch"
              :label="item.is_active ? 'Active' : 'Inactive'"
              v-model="item.is_active"
            ></v-switch>
          </v-col>
        </v-row>
      </v-container>
      <template v-slot:append>
        <div class="d-flex pa-2" @click="deleteItem()">
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
  name: "Item",
  data: () => ({
    drawerRight: false,
    isEdit: false,
    item: {},
    search: "",
    is_active: false,
    initialImage: null,
    imageCroppa: {},
    selectedLocation: null,
  }),

  computed: {
    ...mapGetters(["items"]),
    formTitle() {
      return this.isEdit === false ? "New Item" : "Edit Item";
    },
  },
  created() {
    this.getItem();
  },
  methods: {
    ...mapActions([
      "getItem",
      "createItem",
      "editItem",
      "deleteItem",
      "showDialog",
      "uploadImage",
    ]),
    createItem() {
      this.drawerRight = true;
      this.isEdit = false;

      // this.$v.$reset();
      this.item = {};
    },
    editItem(item) {
      this.drawerRight = true;
      this.isEdit = true;
      this.item = Object.assign({}, item);
    },
    cancel() {
      this.drawerRight = false;
      this.isEdit = false;
      this.item = Object.assign({}, item);
    },
    deleteItem(item) {
      this.showDialog({
        title: "Delete Item",
        text: "Confirm delete this data?",
      }).then((confirm) => {
        if (confirm) {
          this.deleteItem(item);
          this.drawerRight = false;
          this.isEdit = false;
        }
      });
    },
    prepareImagePayload() {
      return new Promise((resolve) => {
        this.imageCroppa.generateBlob(
          (blob) => {
            // Set image payload
            let payload = {
              folder: "img/item",
              filename: this.item.name + "_" + this.item.item_id,
              file: blob,
            };
            resolve(payload);
          },
          "image/jpeg",
          0.8 // 80% compressed jpeg file
        );
      });
    },
    async save() {
      try {
        // Prepare image payload
        const payload = await this.prepareImagePayload();
        var imageUrl = await this.uploadImage(payload);
        this.item.image_url = imageUrl;
      } catch (error) {
        console.log("err vue-croppa", error);
      }

      this.isEdit ? this.editItem(this.item) : this.createItem(this.item);

      this.item = {};
      this.drawerRight = false;
      this.isEdit = false;
    },
    refreshimage() {
      var image = new Image();
      // image.setAttribute("crossorigin", "anonymous");
      image.src = this.item.image_url;

      this.initialImage = image;
      this.imageCroppa.refresh();
    }, 
  },
};
</script>
