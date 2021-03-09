import axios from "../../axios";

const state = {
  businessTypes: [],
};

const getters = {
  businessTypes: (state) => {
    return state.businessTypes;
  },
};

const mutations = {
  setBusinnesTypes: (state, payload) => {
    state.businessTypes = payload;
  },
};

const actions = {
  getBusinessTypes: ({ commit }) => {
    axios.get("/v1/business_types").then((res) => {
      if (res.data) commit("setBusinnesTypes", res.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
