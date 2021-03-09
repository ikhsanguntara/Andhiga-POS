import axios from "../../axios";

const state = {
  uoms: [],
};

const getters = {
  uoms: (state) => {
    return state.uoms;
  },
};

const mutations = {
  setUom: (state, payload) => {
    state.uoms = payload;
  },
};

const actions = {
  getUom: ({ commit }) => {
    axios.get("/v1/uom").then((res) => {

      if (res.data) commit("setUom", res.data);
    });
  },
  createUom: ({ dispatch }, params) => {
    axios.post("/v1/uom", params).then((res) => {
      if (res) dispatch("getUom");
    });
  },
  editUom: ({ dispatch }, params) => {
    axios.put("/v1/uom", params).then((res) => {
      if (res) dispatch("getUom");
    });
  },
  deleteUom: ({ dispatch }, params) => {
    axios.delete("/v1/uom/" + params.id).then((res) => {
      if (res) dispatch("getUom");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
