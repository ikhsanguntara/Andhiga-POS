<template>
  <v-app>
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-if="token" v-model="drawer" app clipped>
      <v-list nav dense>
        <v-list-item-group v-model="item" color="primary">
          <div v-for="item in items" :key="item.title">
            <!-- If Menu contains Sub Menu -->
            <v-list-group v-if="item.items" :prepend-icon="item.icon">
              <template v-slot:activator>
                <v-list-item-content>
                  <v-list-item-title v-text="item.title"></v-list-item-title>
                </v-list-item-content>
              </template>

              <v-list-item
                v-for="subItem in item.items"
                :key="subItem.title"
                :to="subItem.link"
              >
                <v-list-item-icon>
                  <v-icon v-text="subItem.icon"></v-icon>
                </v-list-item-icon>
                <v-list-item-content>
                  <v-list-item-title v-text="subItem.title"></v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list-group>

            <!-- If Menu don't contains Sub Menu -->
            <v-list-item v-else :to="item.link">
              <v-list-item-icon>
                <v-icon v-text="item.icon"></v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </div>
        </v-list-item-group>
      </v-list>

      <template v-slot:append>
        <div class="pa-2">
          <v-btn outlined block color="accent" @click="logout">
            <v-icon class="mr-2">mdi-exit-to-app</v-icon>
            Logout
          </v-btn>
        </div>
      </template>
    </v-navigation-drawer>

    <!-- Application Bar -->
    <v-app-bar v-if="token" app color="primary" dark clipped-left clipped-right>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title style="min-width:150px"
        >Andhiga - Point of Sales</v-toolbar-title
      >
      <v-spacer />
      <div style="width:320px">
        <v-text-field
          flat
          dense
          solo-inverted
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
          class="hidden-sm-and-down"
        />
      </div>
      <v-btn class="ml-1" icon>
        <v-icon>mdi-apps</v-icon>
      </v-btn>
    </v-app-bar>

    <!-- Content -->
    <v-main>
      <v-container class="fill-height pa-0" fluid>
        <router-view></router-view>
      </v-container>
    </v-main>

    <!-- Utils -->
    <Loading />
    <Snackbar />
    <Dialog />
  </v-app>
</template>

<script>
import { mapGetters, mapActions } from "vuex";
import Loading from "./components/utils/Loading";
import Snackbar from "./components/utils/Snackbar";
import Dialog from "./components/utils/Dialog";

export default {
  name: "App",

  components: {
    Loading,
    Snackbar,
    Dialog,
  },

  data: () => ({
    drawer: null,
    item: null,
    items: [
      {
        title: "Dashboard",
        icon: "mdi-view-dashboard",
        items: [
          { title: "Summary", icon: "mdi-chart-line", link: "/dashboard" },
          { title: "Transaction", icon: "mdi-chart-bar", link: "/transaction" },
        ],
      },
      {
        title: "Master",
        icon: "mdi-file-multiple",
        items: [
          {
            title: "Unit of Measurement",
            icon: "mdi-file",
            link: "/uom",
          },
          {
            title: "Item Group",
            icon: "mdi-file",
            link: "/item_group",
          },
          {
            title: "Category",
            icon: "mdi-file",
            link: "/category",
          },
          { title: "Item", icon: "mdi-file", link: "/item" },
          { title: "Variant", icon: "mdi-file", link: "/variant" },
        ],
      },
      {
        title: "Inventory",
        icon: "mdi-layers",
        items: [{ title: "Summary", icon: "mdi-cube", link: "/inventory" }],
      },
      {
        title: "Employee",
        icon: "mdi-clipboard-account",
        items: [{ title: "User", icon: "mdi-account-multiple", link: "/user" }],
      },
      {
        title: "Setting",
        icon: "mdi-wrench",
        items: [
          { title: "Account", icon: "mdi-account", link: "/account" },
          { title: "Company", icon: "mdi-bank", link: "/company" },
          { title: "Outlet", icon: "mdi-map-marker", link: "/outlet" },
        ],
      },
    ],
  }),

  methods: {
    ...mapActions(["logout"]),
  },

  computed: {
    ...mapGetters(["token"]),
  },
};
</script>
