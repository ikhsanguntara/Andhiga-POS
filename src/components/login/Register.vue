<template>
  <v-row>
    <v-col cols="12" sm="6">
      <v-container>
        <v-toolbar-title class="mb-4">Register Account</v-toolbar-title>
        <v-row>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="firstName"
              label="First Name"
              type="text"
              color="primary"
              v-model="first_name"
              @blur="$v.first_name.$touch()"
              :error-messages="firstNameErrors"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="lastName"
              label="Last Name"
              type="text"
              color="primary"
              v-model="last_name"
              @blur="$v.last_name.$touch()"
              :error-messages="lastNameErrors"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="email"
              label="Email Address"
              type="email"
              color="primary"
              v-model="email"
              @blur="$v.email.$touch()"
              :error-messages="emailErrors"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="phone"
              label="Phone Number"
              type="tel"
              color="primary"
              v-model="phone_number"
              @blur="$v.phone_number.$touch()"
              :error-messages="phoneNumberErrors"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="password"
              label="Password"
              color="primary"
              v-model="password"
              @blur="$v.password.$touch()"
              :error-messages="passwordErrors"
              :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showPassword ? 'text' : 'password'"
              @click:append="showPassword = !showPassword"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="Confirm password"
              label="Confirm Password"
              :append-icon="showConfirm ? 'mdi-eye' : 'mdi-eye-off'"
              :type="showConfirm ? 'text' : 'password'"
              @click:append="showConfirm = !showConfirm"
              color="primary"
              v-model="confirm_password"
              @blur="$v.confirm_password.$touch()"
              :error-messages="confirmPasswordErrors"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0 d-flex align-center" cols="12" sm="12">
            <v-checkbox v-model="terms"></v-checkbox>
            <span class="caption">
              By registering you agree to
              <span class="primary--text">Privacy Policy</span> &
              <span class="primary--text">Terms of Service</span>
            </span>
          </v-col>
          <v-col class="py-0 d-flex align-center" cols="12" sm="12">
            <v-btn
              block
              color="accent"
              class="white--text"
              @click="clickRegister"
              :disabled="!terms"
              >Register</v-btn
            >
          </v-col>
        </v-row>
      </v-container>
    </v-col>

    <v-col cols="12" sm="6">
      <v-container>
        <v-toolbar-title class="mb-4">Business Information</v-toolbar-title>

        <v-row>
          <v-col class="py-0" cols="12" sm="6">
            <v-text-field
              outlined
              dense
              name="companyName"
              label="Company Name"
              type="text"
              color="primary"
              v-model="company_name"
              @blur="$v.company_name.$touch()"
              :error-messages="companyNameErrors"
            ></v-text-field>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <v-select
              value="id"
              :items="businessTypes"
              item-text="name"
              label="Select Business Type"
              outlined
              dense
              v-model="selectedBusinessType"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12" sm="6">
            <v-select
              :items="cities"
              item-text="name"
              outlined
              dense
              label="Select City"
              color="primary"
              v-model="selectedCity"
            ></v-select>
          </v-col>
          <v-col class="py-0" cols="12" sm="6">
            <v-select
              v-model="selectedLocation"
              :items="locations"
              item-text="name"
              outlined
              dense
              label="Location"
              color="primary"
            ></v-select>
          </v-col>
        </v-row>
        <v-row>
          <v-col class="py-0" cols="12" sm="12">
            <v-textarea
              v-model="address"
              label="Address"
              name="input-7-1"
              outlined
              @blur="$v.address.$touch()"
              :error-messages="addressErrors"
            ></v-textarea>
          </v-col>
        </v-row>
      </v-container>
    </v-col>
  </v-row>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import { required, minLength, sameAs } from "vuelidate/lib/validators";

export default {
  name: "Register",
  data() {
    return {
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      confirm_password: "",
      phone_number: "",
      company_name: "",
      address: "",
      selectedBusinessType: null,
      selectedCity: null,
      selectedLocation: 0,
      terms: false,
      showConfirm: false,
      showPassword: false,
    };
  },
  validations: {
    first_name: { required },
    last_name: { required },
    email: { required },
    password: { required, minLength: minLength(8) },
    confirm_password: { required, sameAs: sameAs("password") },
    phone_number: { required },
    company_name: { required },
    address: { required },
  },
  computed: {
    ...mapGetters(["businessTypes", "cities", "locations"]),
    firstNameErrors() {
      const errors = [];
      if (!this.$v.first_name.$dirty) return errors;
      !this.$v.first_name.required && errors.push("Firstname is required");
      return errors;
    },
    lastNameErrors() {
      const errors = [];
      if (!this.$v.last_name.$dirty) return errors;
      !this.$v.last_name.required && errors.push("Lastname is required");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.required && errors.push("Email is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.minLength && errors.push("Must be at least 8 char");
      !this.$v.password.required && errors.push("Password is required");
      return errors;
    },
    confirmPasswordErrors() {
      const errors = [];
      if (!this.$v.confirm_password.$dirty) return errors;
      !this.$v.confirm_password.sameAs && errors.push("Password not match");
      return errors;
    },
    phoneNumberErrors() {
      const errors = [];
      if (!this.$v.phone_number.$dirty) return errors;
      !this.$v.phone_number.required && errors.push("Phone number is required");
      return errors;
    },
    companyNameErrors() {
      const errors = [];
      if (!this.$v.company_name.$dirty) return errors;
      !this.$v.company_name.required && errors.push("Company name is required");
      return errors;
    },
    addressErrors() {
      const errors = [];
      if (!this.$v.address.$dirty) return errors;
      !this.$v.address.required && errors.push("Adrees is required");
      return errors;
    },
    getBusinessTypesId() {
      var list = this.businessTypes;
      var selected = this.selectedBusinessType;
      var arrayList = list.filter(function(el) {
        return el.name === selected;
      });
      return arrayList[0].id;
    },
    getCityId() {
      var list = this.cities;
      var selected = this.selectedCity;
      var arrayList = list.filter(function(el) {
        return el.name === selected;
      });
      return arrayList[0].id;
    },
    getLocationId() {
      var list = this.locations;
      var selected = this.selectedLocation;
      var arrayList = list.filter(function(el) {
        return el.name === selected;
      });
      return arrayList[0].id;
    },
  },
  created() {
    this.getBusinessTypes();
    this.getLocations();
    this.getCities();
  },
  methods: {
    ...mapActions([
      "getBusinessTypes",
      "getLocations",
      "getCities",
      "register",
    ]),
    clickRegister() {
      console.log("clicked button register");
      var params = {
        user: {
          name: this.first_name + " " + this.last_name,
          email: this.email,
          password: this.password,
          phone: this.phone_number,
          address: this.address,
        },
        company: {
          name: this.company_name,
          business_type_id: this.getBusinessTypesId,
          city_id: this.getCityId,
          location_id: this.getLocationId,
        },
      };
      this.register(params);
    },
  },
};
</script>
