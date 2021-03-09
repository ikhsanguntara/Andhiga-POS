import axios from "../../axios";

const state = {
  itemGroups: [],
};

const getters = {
  itemGroups: (state) => {
    return state.itemGroups;
  },
};

const mutations = {
  setItemGroup: (state, payload) => {
    state.itemGroups = payload;
  },
};

const actions = {
  getItemGroup: ({ commit }) => {
    axios.get("/v1/item_groups").then((res) => {
      if (res.data) commit("setItemGroup", res.data);
    });
  },
  createItemGroup: ({ dispatch }, params) => {
    axios.post("/v1/item_groups", params).then((res) => {
      if (res) dispatch("getItemGroup");
    });
  },
  editItemGroup: ({ dispatch }, params) => {
    axios.put("/v1/item_groups", params).then((res) => {
      if (res) dispatch("getItemGroup");
    });
  },
  deleteItemGroup: ({ dispatch }, params) => {
    axios.delete("/v1/item_groups/" + params.id).then((res) => {
      if (res) dispatch("getItemGroup");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
