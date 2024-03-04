<template>
  <ul class="list-group list-group-flush">
    <li class="list-group-item">
      <router-link to="/user/info"
        ><font-awesome-icon :icon="['fas', 'user']" /> Tài khoản của
        tôi</router-link
      >
    </li>
    <li class="list-group-item">
      <router-link to="/user/order"
        ><font-awesome-icon :icon="['fas', 'receipt']" /> Đơn mua</router-link
      >
    </li>
    <li class="list-group-item">
      <router-link to="/seller"
        ><font-awesome-icon :icon="['fas', 'user-tie']" /> Người
        bán</router-link
      >
    </li>
    <li class="list-group-item">
      <router-link to="/admin"
        ><font-awesome-icon :icon="['fas', 'crown']" /> Quản trị
        viên</router-link
      >
    </li>
    <li @click="btnLogOut" class="list-group-item">
      <font-awesome-icon :icon="['fas', 'right-from-bracket']" /> Đăng xuất
    </li>
  </ul>
</template>

<script>
export default {
  methods: {
    btnLogOut() {
      localStorage.removeItem("token");
      var currentURL = window.location;
      window.location.href = currentURL.protocol + "//" + currentURL.host;
    },
  },
};
</script>
<style scoped>
.list-group-item {
  color: black;
}

.list-group-item a {
  color: black;
  text-decoration: none;
}

.list-group-item:hover a {
  color: #42b983;
  background-color: #e4e6eb;
}

.list-group-item:hover {
  color: #42b983;
  background-color: #e4e6eb;
}
</style>