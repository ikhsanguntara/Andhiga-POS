import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import Login from "../components/login/Login.vue";
import Forgot from "../components/login/Forgot.vue";
import Base from "../views/Base.vue";
import Register from "../components/login/Register.vue";
import Verify from "../components/login/Verify.vue";
import Reset from "../components/login/Reset.vue";
import Dashboard from "../views/Dashboard.vue";
import Transaction from "../views/Transaction.vue";
import UoM from "../views/UoM.vue";
import ItemGroup from "../views/ItemGroup.vue";
import Category from "../views/Category.vue";
import Item from "../views/Item.vue";
import Variant from "../views/Variant.vue";
import Inventory from "../views/Inventory.vue";
import User from "../views/User.vue";
import Account from "../views/Account.vue";
import Company from "../views/Company.vue";
import Outlet from "../views/Outlet.vue";

import store from "../store";

Vue.use(VueRouter);

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
    redirect: "/login",
    children: [
      { name: "Login", path: "login", component: Login },
      { name: "Forgot", path: "forgot", component: Forgot },
    ],
  },
  {
    path: "/",
    name: "Base",
    component: Base,
    children: [
      { name: "Register", path: "register", component: Register },
      { name: "Verify", path: "verify", component: Verify },
      { name: "Reset", path: "reset", component: Reset },
    ],
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    component: Dashboard,
  },
  {
    path: "/transaction",
    name: "Transaction",
    component: Transaction,
  },
  {
    path: "/uom",
    name: "UoM",
    component: UoM,
  },
  {
    path: "/item_group",
    name: "ItemGroup",
    component: ItemGroup,
  },
  {
    path: "/category",
    name: "Category",
    component: Category,
  },
  {
    path: "/item",
    name: "Item",
    component: Item,
  },
  {
    path: "/variant",
    name: "Variant",
    component: Variant,
  },
  {
    path: "/inventory",
    name: "Inventory",
    component: Inventory,
  },
  {
    path: "/user",
    name: "User",
    component: User,
  },
  {
    path: "/account",
    name: "Account",
    component: Account,
  },
  {
    path: "/company",
    name: "Company",
    component: Company,
  },
  {
    path: "/outlet",
    name: "Outlet",
    component: Outlet,
  },
  {
    path: "*",
    redirect: "/",
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  var auth = store.getters.token;
  if (
    (!auth && to.name === "Login") ||
    (!auth && to.name === "Forgot") ||
    (!auth && to.name === "Register") ||
    (!auth && to.name === "Verify") ||
    (!auth && to.name === "Reset")
  ) {
    next();
  } else if (
    (auth && to.name === "Login") ||
    (auth && to.name === "Forgot") ||
    (auth && to.name === "Register") ||
    (auth && to.name === "Verify") ||
    (auth && to.name === "Reset")
  ) {
    next({ name: "Dashboard" });
  } else if (!store.getters.token) next({ name: "Login" });
  else next();
});

export default router;
