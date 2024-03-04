<template>
  <div
    class="container-fluid d-flex flex-wrap align-items-center justify-content-between shadow head-nav"
  >
    <div
      class="d-flex align-items-center justify-content-between col-md-3 col-12"
    >
      <div class="d-flex align-items-center justify-content-between">
        <router-link to="/">
          <img class="logo-img p-2" src="../assets/logo.png" alt="" />
        </router-link>
        <div class="rounded-pill d-flex align-items-center search-place">
          <font-awesome-icon
            class="font-awesome-icon"
            :icon="['fas', 'magnifying-glass']"
          />
          <input id="search" type="text" placeholder="Tìm kiếm" />
        </div>
      </div>
      <div class="d-md-none d-block">
        <router-link to="/userfunction">
          <img
            v-if="isLogin && currentUser.avatarUrl != null"
            class="nav-item p-0 rounded-circle userfunction"
            :src="baseUrl + '/auth/file/' + currentUser.avatarUrl"
            alt=""
            :class="{ 'userfunction-active': this.router == '/userfunction' }"
          />
          <img
            v-else-if="isLogin && currentUser.avatarUrl == null"
            class="nav-item p-0 rounded-circle userfunction"
            src="../assets/user/anonimous-user-login.png"
            alt=""
            :class="{ 'userfunction-active': this.router == '/userfunction' }"
          />
        </router-link>

        <span v-if="!isLogin">
          <router-link
            to="/login"
            class="text-nowrap p-2"
            v-if="this.router != '/login'"
          >
            Đăng nhập
          </router-link>
          <span v-if="this.router != '/login' && this.router != '/register'">
            /
          </span>
          <router-link
            to="/register"
            class="text-nowrap p-2"
            v-if="this.router != '/register'"
          >
            Đăng kí
          </router-link>
        </span>
      </div>
    </div>

    <div
      class="d-md-flex d-none align-items-center justify-content-md-center justify-content-around col-5"
    >
      <router-link
        to="/"
        class="nav-item-page"
        :class="{ 'nav-item-page-active': router == '/' }"
      >
        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'house']" />
      </router-link>
      <router-link
        to="/shop/1"
        class="nav-item-page"
        :class="{ 'nav-item-page-active': /\/shop\/\d+/.test(router) }"
      >
        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'shop']" />
      </router-link>
    </div>

    <div
      class="d-flex align-items-center justify-content-md-end col-md-3 justify-content-between col-12"
    >
      <div class="d-md-block d-none">
        <div class="p-3" v-if="!isLogin">
          <router-link to="/login" v-if="this.router != '/login'">
            Đăng nhập
          </router-link>
          <span v-if="this.router != '/login' && this.router != '/register'">
            /
          </span>
          <router-link to="/register" v-if="this.router != '/register'">
            Đăng kí
          </router-link>
        </div>
        <div
          v-if="isLogin"
          type="button"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <img
            v-if="currentUser.avatarUrl != null"
            class="nav-item p-0"
            style="border: 3px solid #65676b"
            :src="baseUrl + '/auth/file/' + currentUser.avatarUrl"
            alt=""
          />
          <img
            v-else
            class="nav-item p-0"
            style="border: 3px solid #65676b"
            src="../assets/user/anonimous-user-login.png"
            alt=""
          />
        </div>
        <ul class="dropdown-menu">
          <li>
            <router-link to="/user/info" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'user']" /> Tài khoản của tôi
            </router-link>
          </li>
          <li>
            <router-link to="/user/order" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'receipt']" /> Đơn mua
            </router-link>
          </li>
          <li>
            <router-link to="/seller/data" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'user-tie']" /> Người bán
            </router-link>
          </li>
          <li>
            <router-link to="/admin" class="dropdown-item">
              <font-awesome-icon :icon="['fas', 'crown']" /> Quản trị viên
            </router-link>
          </li>
          <li>
            <a @click="btnLogOut" class="dropdown-item" href="#">
              <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
              Đăng xuất
            </a>
          </li>
        </ul>
      </div>
      <router-link
        to="/"
        class="nav-item d-md-none d-block"
        :class="{ 'nav-item-active': this.router == '/' }"
      >
        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'house']" />
      </router-link>
      <router-link
        to="/shop/1"
        class="nav-item d-md-none d-block"
        :class="{ 'nav-item-active': /\/shop\/\d+/.test(router) }"
      >
        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'shop']" />
      </router-link>
      <router-link
        to="/message"
        class="nav-item"
        :class="{ 'nav-item-active': router == '/message' }"
      >
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fas', 'comment']"
        />
      </router-link>
      <div to="/notification" class="nav-item d-md-block d-none">
        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'bell']" />
      </div>
      <router-link
        to="/notification"
        class="nav-item d-md-none d-block"
        :class="{ 'nav-item-active': this.router == '/notification' }"
      >
        <font-awesome-icon class="font-awesome-icon" :icon="['fas', 'bell']" />
      </router-link>
      <router-link
        to="/shopcart"
        class="nav-item position-relative"
        :class="{ 'nav-item-active': this.router == '/shopcart' }"
      >
        <font-awesome-icon
          class="font-awesome-icon"
          :icon="['fas', 'cart-shopping']"
        />
        <div v-if="shoppingCart">
          <span
            v-if="shoppingCart.length > 0"
            class="position-absolute top-0 start-90 translate-middle badge rounded-pill bg-danger"
          >
            {{ shoppingCart.length }}
          </span>
        </div>
      </router-link>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAdmin: false,
      currentUser: {},
    };
  },

  props: ["baseUrl", "router", "isLogin", "currentUserPromise"],

  methods: {
    btnLogOut() {
      localStorage.removeItem("token");
      var currentURL = window.location;
      window.location.href = currentURL.protocol + "//" + currentURL.host;
    },

    async loadImageWithHeader() {
      setTimeout(function () {
        const allImages = document.querySelectorAll("img");
        allImages.forEach((img) => {
          const url = img.src;
          const xhr = new XMLHttpRequest();
          xhr.open("GET", url, true);
          xhr.setRequestHeader("ngrok-skip-browser-warning", "ngrok");

          xhr.responseType = "blob";

          xhr.onload = () => {
            if (xhr.status === 200) {
              const blob = xhr.response;
              const objectURL = URL.createObjectURL(blob);
              img.src = objectURL;
            }
          };

          xhr.send();
        });
      }, 1000);
    },
  },

  async created() {
    this.currentUser = await this.currentUserPromise;
  },

  computed: {
    shoppingCart() {
      return this.$store.state.cart;
    },
  },

  async mounted() {
    this.loadImageWithHeader();
  },
};
</script>

<style scoped>
.head-nav {
  background-color: #fff;
  padding: 10px;
  border: 1px solid #e4e6eb;
}

.logo-img {
  width: 70px;
  height: 70px;
}

.font-awesome-icon {
  width: 24px;
  height: 24px;
  margin: 5px;
  color: #65676b;
}

.nav-item {
  width: 45px;
  height: 45px;
  background-color: #e4e6eb;
  border-radius: 50%;
  margin: 5px;
  padding: 5px;
  cursor: pointer;
}

.nav-item:hover .font-awesome-icon {
  color: #42b983;
}

.nav-item-active .font-awesome-icon {
  color: #42b983;
}

.nav-item-page {
  width: 65px;
  height: 45px;
  border-radius: 15px;
  margin: 5px;
  padding: 5px;
  text-align: center;
}

.nav-item-page:hover {
  background-color: #e4e6eb;
  cursor: pointer;
}

.nav-item-page:hover .font-awesome-icon {
  color: #42b983;
}

.nav-item-page-active .font-awesome-icon {
  color: #42b983;
}

.nav-item-page-active::after {
  content: "";
  display: block;
  margin-top: 5px;
  border-bottom: 3px solid #42b983;
}

.userfunction {
  border: 3px solid #65676b;
}

.userfunction-active {
  border: 3px solid #42b983;
}

.search-place {
  border-radius: 50%;
  padding: 5px;
  background-color: #e4e6eb;
}

#search {
  margin-left: 10px;
  width: 70%;
  background-color: #e4e6eb;
  border: none;
}

#search:focus {
  outline: none;
}

.dropdown-item:hover {
  background-color: #e4e6eb;
  color: #42b983;
}

.dropdown-item:active {
  color: #42b983;
  background-color: #e4e6eb;
}

@media (max-width: 719px) {
  .head-nav {
    padding: 0px 16px;
  }

  .nav-item {
    width: 45px;
    height: 45px;
    background-color: #fff;
    border-radius: 15px;
  }
  .nav-item:hover {
    background-color: #e4e6eb;
  }

  .nav-item-active::after {
    content: "";
    display: block;
    margin-top: 5px;
    border-bottom: 3px solid #42b983;
  }
}
</style>
