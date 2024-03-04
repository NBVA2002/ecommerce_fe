<template>
  <div class="products">
    message
  </div>
</template>

<script>
// import axios from "axios";
export default {
  data() {
    return {
      listType: [],
      products: [],
      url: this.urlbe + "/product/list?",
      search: "",
      gender: "",
      categorytype: 0,
      category: 0,
      type: "",
      userRateFilter: 0,
      priceGT: 0,
      priceLT: 0,
      typeSort: "id",
      isSort: "desc",
      totalItem: 0,
      totalPage: 0,
      pageNumber: 1,
      limit: 12,
      shoppingCart: [],
      displayFilter: false,
      displayTypeFilter: false,
    };
  },

  props: ["islogin", "isAdmin", "urlbe"],

  created() {
  },

  methods: {
  },

  computed: {
  },
};
</script>

<style scoped>
</style>