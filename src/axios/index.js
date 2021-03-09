import axios from "axios";
import store from "../store";

var instance = axios.create({
  baseURL: "https://andhiga-pos.herokuapp.com",
});

var token;
var local = JSON.parse(localStorage.getItem("local"));
if (local != null) token = local.auth.token;
instance.defaults.headers.common["Authorization"] = token;

instance.interceptors.request.use((config) => {
  store.dispatch("loading", true);
  return config;
});

instance.interceptors.response.use(
  (res) => {
    store.dispatch("loading", false);
    return res;
  },
  (error) => {
    store.dispatch("loading", false);
    var body = error.response.data;
    store.dispatch("snackbar", { color: "error", message: body.message });
  }
);

export default instance;
