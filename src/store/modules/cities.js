import axios from "../../axios";

const state = {
  cities: [],
};

const getters = {
  cities: (state) => {
    return state.cities;
  },
};

const mutations = {
  setCities: (state, payload) => {
    state.cities = payload;
  },
};

const actions = {
  getCities: ({ commit }) => {
    axios.get("/v1/cities").then((res) => {
      if (res.data) commit("setCities", res.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
