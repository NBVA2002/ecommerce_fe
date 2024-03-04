<template>
  <div class="page-setup d-flex justify-content-center align-items-center">
    <form class="d-flex justify-content-center" @submit.prevent="changeBaseUrl()">
      <div
        for="inputPassword"
        class="col-md-2 col-3 m-1 d-flex justify-content-center align-items-center"
        style=""
      >
        Server URL:
      </div>
      <div
        class="col-md-6 col-sm-6 m-1 d-flex justify-content-center align-items-center"
      >
        <input
          type="text"
          class="form-control"
          id="inputPassword"
          v-model="changeUrl"
        />
      </div>
      <div
        class="col-md-2 col-sm-3 m-1 d-flex justify-content-center align-items-center"
      >
        <button class="btn btn-primary" type="submit">
          Apply
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      changeUrl: '',
    };
  },

  props: [],

  created() {},

  mounted() {},

  methods: {
    changeBaseUrl() {
      localStorage.setItem("url", this.changeUrl);
      var currentURL = window.location.href;
      console.log(currentURL.replace('/setup', ''))
    },
  },

  computed: {},
};
</script>

<style scoped>
.page-setup {
  height: calc(100vh - 535px);
}

form {
  width: 75%;
}

@media (max-width: 1242px) {
  .page-setup {
    /* margin-top: 102px; */
  }
}

@media (max-width: 719px) {
  form {
    width: 100%;
  }
}
</style>

