import axios from "../../axios";

const state = {
  outlets: [],
};

const getters = {
  outlets: (state) => {
    return state.outlets;
  },
};

const mutations = {
  setOutlet: (state, payload) => {
    state.outlets = payload;
  },
};

const actions = {
  getOutlet: ({ commit }) => {
    axios.get("/v1/outlets").then((res) => {
      if (res.data) commit("setOutlet", res.data);
    });
  },
  createOutlet: ({ dispatch }, params) => {
    axios.post("/v1/outlets", params).then((res) => {
      if (res) dispatch("getOutlet");
    });
  },
  editOutlet: ({ dispatch }, params) => {
    axios.put("/v1/outlets", params).then((res) => {
      if (res) dispatch("getOutlet");
    });
  },
  deleteOutlet: ({ dispatch }, params) => {
    axios.delete("/v1/outlets/" + params.id).then((res) => {
      if (res) dispatch("getOutlet");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
