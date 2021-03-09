import axios from "../../axios";

const state = {
  users: [],
  user: {},
};

const getters = {
  users: (state) => {
    return state.users;
  },
  user: (state) => {
    return state.user;
  },
};

const mutations = {
  setUsers: (state, payload) => {
    state.users = payload;
  },
  setUser: (state, payload) => {
    state.user = payload;
  },
};

const actions = {
  getUsers: ({ commit }) => {
    axios.get("/v1/users").then((res) => {
      if (res.data) commit("setUsers", res.data);
    });
  },
  getUserById: ({ commit }, params) => {
    axios.get("/v1/users/" + params).then((res) => {
      console.log(params)
      if (res.data) commit("setUser", res.data);
    });
  },
  createUser: ({ dispatch }, params) => {
    axios.post("/v1/users", params).then((res) => {
      if (res) dispatch("getUsers");
    });
  },
  editUser: ({ dispatch }, params) => {
    axios.put("/v1/user", params).then((res) => {
      if (res) dispatch("getUsers");
    });
  },
  deleteUser: ({ dispatch }, params) => {
    axios.delete("/v1/user" + params.id).then((res) => {
      if (res) dispatch("getUsers");
    });
  },
};

export default {
  state,
  getters,
  mutations,
  actions,
};
