import axios from "../../axios";

const state = {
  locations: [],
};

const getters = {
  locations: (state) => {
    return state.locations;
  },
};

const mutations = {
  setLocations: (state, payload) => {
    state.locations = payload;
  },
};

const actions = {
  getLocations: ({ commit }) => {
    axios.get("/v1/locations").then((res) => {
      if (res.data) commit("setLocations", res.data);
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
