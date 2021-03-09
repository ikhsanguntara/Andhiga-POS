import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
import auth from "./modules/auth";
import businessType from "./modules/business-types";
import cities from "./modules/cities";
import locations from "./modules/locations";
import outlets from "./modules/outlets";
import uoms from "./modules/uoms";
import users from "./modules/users";
import itemGroups from "./modules/item-groups";
import itemCategories from "./modules/item-categories";
import item from "./modules/item";
import itemVariants from "./modules/item-variants";

Vue.use(Vuex);

export default new Vuex.Store({
  plugins: [createPersistedState({ key: "local", paths: ["auth"] })],
  state: {
    loading: false,
    snackbar: {},
    dialog: {},
  },
  getters: {
    loading: (state) => {
      return state.loading;
    },
    snackbar: (state) => {
      return state.snackbar;
    },
    dialog: (state) => {
      return state.dialog;
    },
  },
  mutations: {
    loading: (state, payload) => {
      state.loading = payload;
    },
    snackbar: (state, snackbar) => {
      state.snackbar = snackbar;
    },
    showDialog: (state, dialog) => {
      state.dialog = dialog;
    },
    dismissDialog: (state) => {
      state.dialog = {};
    },
  },
  actions: {
    loading: ({ commit }, payload) => {
      commit("loading", payload);
    },
    snackbar: ({ commit }, snackbar) => {
      if (!snackbar.show) snackbar.show = true;
      if (!snackbar.color) snackbar.color = "accent";
      if (!snackbar.timeout) snackbar.timeout = 2000;
      commit("snackbar", snackbar);
    },
    showDialog: ({ commit }, { title, text }) => {
      return new Promise((resolve, reject) => {
        commit("showDialog", { show: true, title, text, resolve, reject });
      });
    },
    dismissDialog: ({ commit }) => {
      commit("dismissDialog");
    },
  },
  modules: {
    auth,
    businessType,
    cities,
    locations,
    outlets,
    uoms,
    users,
    itemGroups,
    itemCategories,
    item,
    itemVariants,
  },
});
