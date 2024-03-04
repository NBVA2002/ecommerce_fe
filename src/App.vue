<template>
  <nav-bar
    class="nav-bar"
    :baseUrl="baseUrl"
    :isLogin="isLogin"
    :router="router"
    :currentUserPromise="currentUser"
  />
  <router-view
    class="view-pages"
    :baseUrl="baseUrl"
    :isLogin="isLogin"
    :isAdmin="isAdmin"
    :router="router"
    :currentUserPromise="currentUser"
  />
  <footer-place />
</template>

<script>
import NavBar from "./components/NavBar.vue";
import axios from "axios";
import FooterPlace from "./components/FooterPlace.vue";
export default {
  components: {
    NavBar,
    FooterPlace,
  },

  data() {
    return {
      router: "/",
      baseUrl: this.$store.state.baseUrl,
      changeUrl: "",
      isLogin: false,
      isAdmin: false,
      currentUser: {},
    };
  },

  methods: {
    checkLogin() {
      if (localStorage.getItem("token")) {
        return true;
      }
      return false;
    },

    checkSetUrl() {
      if (localStorage.getItem("url")) {
        return true;
      }
      return false;
    },

    async getCurrentUser() {
      try {
        const response = await axios.get(this.baseUrl + "/auth/usercontext", {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        });
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    getBaseUrl() {
      this.baseUrl = localStorage.getItem("url");
    },

    beforeDestroy() {
      localStorage.clear();
    },
  },

  created() {
    // if (this.checkSetUrl() == false) {
    //   this.$router.push("/setup");
    // } else {
    //   this.getBaseUrl();
    // }

    this.isLogin = this.checkLogin();
    if (this.isLogin) {
      this.currentUser = this.getCurrentUser();
      this.$store.dispatch("getCart");
    }
  },

  mounted() {},

  computed: {},

  watch: {
    $route(to) {
      this.router = to.fullPath;
    },
  },
};
</script>

<style scoped>
.nav-bar {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 1000;
}

.view-pages {
  margin-top: 92px;
}

@media (max-width: 1242px) {
  .view-pages {
    /* margin-top: 102px; */
  }
}

@media (max-width: 719px) {
  .view-pages {
    margin-top: 127px;
  }
}
</style>
