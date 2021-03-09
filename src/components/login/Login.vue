<template>
  <div class="d-flex align-center fill-height">
    <v-card class="mx-auto" width="400" outlined>
      <v-card-title class="justify-center">Login</v-card-title>

      <v-card-text>
        <v-text-field
          v-model="auth.email"
          @blur="$v.auth.email.$touch()"
          :error-messages="emailErrors"
          label="Email"
          outlined
          single-line
          dense
          clearable
        />

        <v-text-field
          v-model="auth.password"
          @blur="$v.auth.password.$touch()"
          :error-messages="passwordErrors"
          label="Password"
          outlined
          single-line
          dense
          :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
          :type="show ? 'text' : 'password'"
          @click:append="show = !show"
        />

        <v-btn
          primary
          block
          color="primary"
          @click="login(auth)"
          :disabled="$v.$invalid"
          >Login</v-btn
        >

        <v-card-actions class="pb-3 pt-6">
          <router-link
            tag="a"
            class="mt-2 py-2 accent--text"
            style="text-decoration: none"
            to="/forgot"
          >
            <strong>Forgot Password</strong>
          </router-link>
          <v-spacer />
          <router-link
            tag="a"
            class="mt-2 py-2 accent--text"
            style="text-decoration: none"
            to="/register"
          >
            <strong>Register</strong>
          </router-link>
        </v-card-actions>
      </v-card-text>
    </v-card>
  </div>
</template>

<script>
import { mapActions } from "vuex";
import { required, email, minLength } from "vuelidate/lib/validators";

export default {
  data: () => ({
    auth: {},
    show: false,
  }),

  validations: {
    auth: {
      email: {
        required,
        email,
      },
      password: {
        required,
        minLength: minLength(8),
      },
    },
  },

  computed: {
    emailErrors() {
      const errors = [];
      if (!this.$v.auth.email.$dirty) return errors;
      !this.$v.auth.email.email && errors.push("Must be valid e-mail");
      !this.$v.auth.email.required && errors.push("E-mail is required");
      return errors;
    },
    passwordErrors() {
      const errors = [];
      if (!this.$v.auth.password.$dirty) return errors;
      !this.$v.auth.password.minLength &&
        errors.push("Must be at least 8 char");
      !this.$v.auth.password.required && errors.push("Password is required");
      return errors;
    },
  },

  methods: {
    ...mapActions(["login"]),
  },
};
</script>
