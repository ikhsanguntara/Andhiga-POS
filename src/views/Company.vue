<template>
  <v-container class="backdrop" fluid>
    <v-row class="my-n3">
      <v-col cols="6" md="6" sm="12" xs="12" class="py-0 pr-0">
        <v-card class="mt-2" outlined>
          <v-card-title>Account Profile</v-card-title>
          <v-card-text>
            <v-row justify="center">
              <v-img
                class="ma-1"
                height="150"
                contain
                src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
              >
                <template v-slot:placeholder>
                  <v-row class="fill-height" align="center" justify="center">
                    <v-icon
                      class="mdi mdi-account-box grey--text"
                      style="font-size:100px"
                    ></v-icon>
                  </v-row>
                </template>
              </v-img>

              <v-col cols="12">
                <v-text-field
                  class="mb-n5"
                  label="Name"
                  v-model="account.name"
                  outlined
                  single-line
                  dense
                ></v-text-field>
                <v-text-field
                  class="mb-n5"
                  label="Email"
                  v-model="account.email"
                  outlined
                  single-line
                  dense
                ></v-text-field>
                <v-text-field
                  class="mb-n5"
                  label="Phone"
                  v-model="account.phone"
                  outlined
                  single-line
                  dense
                ></v-text-field>
                <v-textarea
                  outlined
                  single-line
                  rows="3"
                  name="input-3-4"
                  label="Address"
                  v-model="account.address"
                ></v-textarea>
              </v-col>
            </v-row>
            <div class="d-flex flex-row-reverse mt-n5">
              <v-btn color="accent" block>save</v-btn>
            </div>
          </v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6" md="6" sm="12" xs="12" class="py-0">
        <v-card class="mt-2" outlined>
          <v-card-title>Sosial Link</v-card-title>

          <v-card-text>
            <v-text-field
              prepend-icon="mdi-web"
              name="website"
              label="Website"
              single-line
              type="text"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-facebook"
              name="website"
              label="Website"
              single-line
              type="text"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-twitter"
              name="website"
              label="Website"
              single-line
              type="text"
            ></v-text-field>
            <v-text-field
              prepend-icon="mdi-instagram"
              name="website"
              label="Website"
              single-line
              type="text"
            ></v-text-field>

            <v-btn primary block color="accent">Change Password</v-btn>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Account",

  data: () => ({
    account: {},
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
    showCurrent: false,
    showNew: false,
    showConfirm: false,
  }),

  validations: {
    currentPassword: {
      required,
      minLength: minLength(8),
    },
    newPassword: {
      required,
      minLength: minLength(8),
    },
    confirmPassword: {
      sameAs: sameAs("newPassword"),
    },
  },

  computed: {
    ...mapGetters(["dialog", "user"]),
    currentPasswordErrors() {
      const errors = [];
      if (!this.$v.currentPassword.$dirty) return errors;
      !this.$v.currentPassword.minLength &&
        errors.push("Must be at least 8 char");
      !this.$v.currentPassword.required &&
        errors.push("Current Password is required");
      return errors;
    },
    newPasswordErrors() {
      const errors = [];
      if (!this.$v.newPassword.$dirty) return errors;
      !this.$v.newPassword.minLength && errors.push("Must be at least 8 char");
      !this.$v.newPassword.required && errors.push("New Password is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirmPassword.$dirty) return errors;
      !this.$v.confirmPassword.sameAs && errors.push("Password not match");
      return errors;
    },
  },
  created() {
    this.getUserById();
  },
  methods: {
    ...mapActions(["showDialog", "getUserById"]),
    change() {
      this.currentPassword = "";
      this.newPassword = "";
      this.confirmPassword = "";
    },
  },
};
</script>
