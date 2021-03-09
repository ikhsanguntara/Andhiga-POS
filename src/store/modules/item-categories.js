import axios from "../../axios";

const state = {
  itemCategories: [],
};

const getters = {
  itemCategories: (state) => {
    return state.itemCategories;
  },
};

const mutations = {
  setItemCategory: (state, payload) => {
    state.itemCategories = payload;
  },
};

const actions = {
  getItemCategory: ({ commit }) => {
    axios.get("/v1/item_categories").then((res) => {
      if (res.data) commit("setItemCategory", res.data);
    });
  },
  createItemCategory: ({ dispatch }, params) => {
    axios.post("/v1/item_categories", params).then((res) => {
      if (res) dispatch("getItemCategory");
    });
  },
  editItemCategory: ({ dispatch }, params) => {
    axios.put("/v1/item_categories", params).then((res) => {
      if (res) dispatch("getItemCategory");
    });
  },
  deleteItemCategory: ({ dispatch }, params) => {
    axios.delete("/v1/item_categories/" + params.id).then((res) => {
      if (res) dispatch("getItemCategory");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
