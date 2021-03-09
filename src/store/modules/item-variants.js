import axios from "../../axios";

const state = {
  itemVariants: [],
};

const getters = {
  itemVariants: (state) => {
    return state.itemVariants;
  },
};

const mutations = {
  setItemVariant: (state, payload) => {
    state.ItemVariants = payload;
  },
};

const actions = {
  getItemVariant: ({ commit }) => {
    axios.get("/v1/item_variants").then((res) => {
      console.log(res.data);
      if (res.data) commit("setItemVariant", res.data);
    });
  },
  createItemVariant: ({ dispatch }, params) => {
    axios.post("/v1/item_variants", params).then((res) => {
      if (res) dispatch("getItemVariant");
    });
  },
  editItemVariant: ({ dispatch }, params) => {
    axios.put("/v1/item_variants", params).then((res) => {
      if (res) dispatch("getItemVariant");
    });
  },
  deleteItemVariant: ({ dispatch }, params) => {
    axios.delete("/v1/item_variants" + params.id).then((res) => {
      if (res) dispatch("getItemVariant");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
