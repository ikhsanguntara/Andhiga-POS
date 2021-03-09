import axios from "../../axios";

const state = {
  items: [],
};

const getters = {
  items: (state) => {
    return state.items;
  },
};

const mutations = {
  setItem: (state, payload) => {
    state.items = payload;
  },
};

const actions = {
  getItem: ({ commit }) => {
    axios.get("/v1/items").then((res) => {
      if (res.data) commit("setItem", res.data);
    });
  },
  createItem: ({ dispatch }, params) => {
    axios.post("/v1/items", params).then((res) => {
      if (res) dispatch("getItem");
    });
  },
  editItem: ({ dispatch }, params) => {
    axios.put("/v1/items", params).then((res) => {
      if (res) dispatch("getItem");
    });
  },
  deleteItem: ({ dispatch }, params) => {
    axios.delete("/v1/items/" + params.id).then((res) => {
      if (res) dispatch("getItem");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
