import axios from "../../axios";
import router from "../../router";

const state = {
  token: null,
  outlet: {},
};
const getters = {
  token: (state) => {
    return state.token;
  },
  outlet: (state) => {
    return state.outlet;
  },
};
const mutations = {
  login: (state, params) => {
    state.token = params;
  },
  logout: (state) => {
    state.token = null;
  },
  outlet: (state, params) => {
    state.outlet = params;
  },
};
const actions = {
  login: ({ commit }, params) => {
    axios.post("/v1/login", params).then((res) => {
      if (res) {
        commit("login", res.data.token);
        router.push("/dashboard");
      }
    });
  },
  logout: ({ commit, dispatch }) => {
    dispatch("showDialog", {
      title: "Confirm Logout",
      text: "Are you sure want to logout?",
    }).then((confirm) => {
      if (confirm) {
        commit("logout");
        router.push("/login");
      }
    });
  },
  outlet: ({ commit }, params) => {
    commit("outlets", params);
  },
  register: (params) => {
    axios.post("/v1/register", params).then((res) => {
      if (res) router.push("/login");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
