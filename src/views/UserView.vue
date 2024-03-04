<template>
  <div>
    <div class="tool-bar d-md-none d-block">
      <a
        class="btn btn-side-bar"
        data-bs-toggle="offcanvas"
        href="#offcanvasExample"
        role="button"
        aria-controls="offcanvasExample"
      >
        <font-awesome-icon :icon="['fas', 'bars']" />
      </a>
      <div
        class="offcanvas offcanvas-start"
        tabindex="-1"
        id="offcanvasExample"
        aria-labelledby="offcanvasExampleLabel"
      >
        <div class="offcanvas-header">
          <h5 class="offcanvas-title" id="offcanvasExampleLabel">Offcanvas</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Close"
          ></button>
        </div>
        <div class="offcanvas-body">
          <ul class="list-group list-group-flush">
            <li class="list-group-item">
              <router-link to="/user/info">
                <font-awesome-icon :icon="['fas', 'user']" /> Tài khoản của tôi
              </router-link>
            </li>
            <li class="list-group-item">
              <router-link to="/user/order">
                <font-awesome-icon :icon="['fas', 'receipt']" /> Đơn mua
              </router-link>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <div class="d-flex">
      <div class="d-md-block d-none col-md-2 shadow side-bar">
        <ul class="list-group list-group-flush">
          <router-link to="/user/info">
            <li class="list-group-item">
              <font-awesome-icon :icon="['fas', 'user']" /> Tài khoản của tôi
            </li>
          </router-link>
          <router-link to="/user/order">
            <li class="list-group-item">
              <font-awesome-icon :icon="['fas', 'receipt']" />
              Đơn mua
            </li>
          </router-link>
          <router-link to="/user/notification">
            <li class="list-group-item">
              <font-awesome-icon :icon="['fas', 'bell']" />
              Thông báo
            </li>
          </router-link>
          <router-link to="/user/change">
            <li class="list-group-item">
              <font-awesome-icon :icon="['fas', 'lock']" />
              Đổi mật khẩu
            </li>
          </router-link>
          <li class="list-group-item" @click="btnLogOut">
            <font-awesome-icon :icon="['fas', 'right-from-bracket']" />
            Đăng xuất
          </li>
        </ul>
      </div>
      <router-view class="col-md-10" />
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  props: [],

  methods: {
    btnLogOut() {
      localStorage.removeItem("token");
      var currentURL = window.location;
      window.location.href = currentURL.protocol + "//" + currentURL.host;
    },
  },
  created() {
    if (!localStorage.getItem("token")) {
      var currentURL = window.location;
      window.location.href = currentURL.protocol + "//" + currentURL.host;
    }
  },
  mounted() {},
};
</script>

<style scoped>
.list-group > a {
  text-decoration: none;
}

.list-group-item:hover {
  cursor: pointer;
  color: #42b983;
  background-color: #e4e6eb;
}

@media (max-width: 739px) {
}
</style>
