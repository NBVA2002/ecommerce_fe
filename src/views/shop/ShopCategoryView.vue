<template>
  <div>
    <div class="p-3">
      <h1>{{ category.categoryName }}</h1>
    </div>
    <!-- Toolbar -->
    <div class="d-flex justify-content-between">
      <!-- Sidebar mobile -->
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
            <h5 class="offcanvas-title" id="offcanvasExampleLabel">Danh mục</h5>
            <button
              type="button"
              class="btn-close"
              data-bs-dismiss="offcanvas"
              aria-label="Close"
            ></button>
          </div>

          <!-- offcanvas-body -->
          <div class="offcanvas-body">
            <ul class="list-group list-group-flush">
              <li class="list-group-item">
                <router-link to="/user/info">
                  <font-awesome-icon :icon="['fas', 'user']" /> Tài khoản của
                  tôi
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

      <!-- Số bản ghi trên 1 trang -->
      <div class="d-flex">
        <span class="d-md-block d-none col-md-3 text-center m-auto">
          Hiển thị:
        </span>
        <select
          class="form-select col-md-5"
          aria-label="Default select example"
          v-model="pageSize"
          @change="changePageSize(pageSize)"
        >
          <option value="12" selected>12 Sản phẩm trên 1 trang</option>
          <option value="24">24 Sản phẩm trên 1 trang</option>
          <option value="48">48 Sản phẩm trên 1 trang</option>
        </select>
      </div>

      <!-- Bộ lọc -->
      <div
        class="d-flex align-items-center btn"
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        <font-awesome-icon :icon="['fas', 'filter']" style="font-size: 25px" />
      </div>

      <!-- Modal -->
      <div
        class="modal fade"
        id="exampleModal"
        tabindex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div class="modal-dialog">
          <div class="modal-content">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="exampleModalLabel">
                Modal title
              </h1>
              <button
                type="button"
                class="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div class="modal-body">...</div>
            <div class="modal-footer">
              <button
                type="button"
                class="btn btn-secondary"
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button type="button" class="btn btn-primary">
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Sort -->
    <div class="d-flex justify-content-between">
      <div class="d-flex">
        <span class="d-md-block d-none m-auto">Sắp xếp theo</span>
        <div
          class="btn btn-sort-by"
          :class="{ 'btn-sort-by-active': sortBy == 'id' }"
          @click="changeSortBy('id')"
        >
          Mới nhất
        </div>
        <div
          class="btn btn-sort-by"
          :class="{ 'btn-sort-by-active': sortBy == 2 }"
          @click="changeSortBy(2)"
        >
          Bán chạy
        </div>
        <div
          class="btn btn-sort-by d-flex"
          :class="{ 'btn-sort-by-active': sortBy == 'price' }"
          @click="changeSortBy('price')"
          style=""
        >
          <span class="m-auto">Giá</span>
        </div>
        <div
          class="btn btn-sort-by"
          :class="{ 'btn-sort-by-active': sortBy == 4 }"
          @click="changeSortBy(4)"
        >
          Đánh giá
        </div>
      </div>
      <div class="d-flex">
        <span class="d-md-block d-none m-auto">Sắp xếp &nbsp;</span>
        <span class="m-auto d-flex btn-sort" @click="changeSort()">
          <font-awesome-icon
            :icon="['fas', 'arrow-up']"
            :class="{ 'sort-active': sort == 'asc' }"
          />
          <font-awesome-icon
            :icon="['fas', 'arrow-down']"
            :class="{ 'sort-active': sort == 'desc' }"
          />
        </span>
      </div>
    </div>

    <!-- Product list -->
    <div class="d-flex flex-wrap">
      <div
        class="col-md-3 col-6 p-md-2 p-1"
        v-for="(product, key) in products"
        :key="key"
      >
        <router-link
          class="card overflow-hidden product-item"
          :to="`/product/${product.id}`"
        >
          <div v-if="product.fileProduct.length > 0" class="img-product">
            <img
              v-if="product.fileProduct[0].type == 'IMAGE'"
              :src="baseUrl + '/file/product/' + product.fileProduct[0].url"
              alt=""
            />
            <video
              v-if="product.fileProduct[0].type == 'VIDEO'"
              :src="baseUrl + '/file/product/' + product.fileProduct[0].url"
              controls
            />
          </div>
          <div v-else class="img-product">
            <img src="../../assets/item/no-image.png" alt="" />
          </div>
          <div class="card-body">
            <h5 class="card-title">{{ product.productName }}</h5>
            <p class="card-text">{{ product.description }}</p>
            <div>{{ product.priceMin }}đ - {{ product.priceMax }}đ</div>
            <div class="d-flex">
              <div class="col-6">*****</div>
              <div class="col-6">Đã bán</div>
            </div>
          </div>
        </router-link>
      </div>
    </div>

    <!-- Pagination -->
    <div class="d-flex justify-content-center mt-3">
      <div class="btn-group" role="group">
        <button
          type="button"
          class="btn border btn-pagination"
          @click="changePage('prev')"
        >
          &lt;
        </button>
        <button
          type="button"
          class="btn border btn-pagination"
          v-for="(page, index) in pages"
          :key="index"
          :class="{ 'btn-pagination-active': pageNumber == page }"
          @click="changePage(page)"
        >
          {{ page }}
        </button>
        <button
          type="button"
          class="btn border btn-pagination"
          @click="changePage('after')"
        >
          &gt;
        </button>
      </div>
    </div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},

  data() {
    return {
      category: {},
      products: [],
      sortBy: "id",
      sort: "desc",
      pageSize: 12,
      pageNumber: 1,
      totalPages: 1,
      totalElements: 0,

      // priceProducts: [],

      // listType: [],
      // url: this.urlbe + "/product/list?",
      // search: "",
      // gender: "",
      // categorytype: 0,
      // type: "",
      // userRateFilter: 0,
      // priceGT: 0,
      // priceLT: 0,
      // typeSort: "id",
      // isSort: "desc",
      // shoppingCart: [],
      // displayFilter: false,
      // displayTypeFilter: false,
    };
  },

  props: ["baseUrl"],

  methods: {
    async getCategory() {
      try {
        const response = await axios.get(
          this.baseUrl + "/product/category/" + this.$route.params.id
        );
        this.category = response.data;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async getListProduct() {
      try {
        const response = await axios.get(
          this.baseUrl +
            "/product/product?category=" +
            this.$route.params.id +
            "&size=" +
            this.pageSize +
            "&page=" +
            (this.pageNumber - 1) +
            "&sort=" +
            this.sortBy +
            "," +
            this.sort
        );
        this.products = response.data.content;
        this.totalElements = response.data.totalElements;
        this.totalPages = response.data.totalPages;
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    changeSortBy(sortId) {
      this.sortBy = sortId;
      this.pageNumber = 1;
      this.getListProduct();
    },

    changeSort() {
      if (this.sort == "desc") {
        this.sort = "asc";
      } else if (this.sort == "asc") {
        this.sort = "desc";
      }
      this.getListProduct();
    },

    async changePageSize(size) {
      this.pageSize = size;
      this.pageNumber = 1;
      this.getListProduct();
    },

    async changePage(page) {
      if (page == "prev" && this.pageNumber > 1) {
        this.pageNumber--;
      } else if (page == "after" && this.pageNumber < this.totalPages) {
        this.pageNumber++;
      } else if (typeof page == "number") {
        this.pageNumber = page;
      }
      this.getListProduct();
    },
  },

  async created() {
    this.getListProduct();
    this.getCategory();
  },

  computed: {
    pages() {
      let pages = [];
      for (let i = 1; i <= this.totalPages; i++) {
        if (
          i == 1 ||
          i == this.totalPages ||
          Math.abs(i - this.pageNumber) <= 2
        ) {
          pages.push(i);
        } else if (Math.abs(i - this.pageNumber) == 3) {
          pages.push("...");
        }
      }
      return pages;
    },

    priceProducts() {
      let priceProducts = [];
      for (let i = 0; i < this.products.length; i++) {
        let list = [];
        for (let j = 0; j < this.products[i].subProduct.length; j++) {
          list.push(this.products[i].subProduct[j].price);
        }
        priceProducts.push({
          min: Math.min(...list),
          max: Math.max(...list),
        });
      }
      return priceProducts;
    },
  },

  watch: {
    async $route(to) {
      if (/\/shop\/\d+/.test(to.fullPath)) {
        this.getListProduct();
        this.getCategory();
      }
    },
  },
};
</script>
<style scoped>
.form-select:focus {
  box-shadow: none;
}

.btn-sort-by {
  margin: 10px;
  border: 1px solid #000;
}

.btn-sort-by:hover {
  border: 1px solid #42b983;
  color: #42b983;
}

.btn-sort-by-active {
  background-color: #42b983;
  border: 1px solid #42b983;
  color: #fff;
}

.btn-sort-by-active:hover {
  border: 1px solid #42b983;
  color: #fff;
}

.btn-sort {
  cursor: pointer;
  font-size: 25px;
}

.sort-active {
  color: #42b983;
}

.btn-pagination:hover {
  border: 1px solid #42b983;
  background-color: #e4e6eb;
  color: #42b983;
}

.btn-pagination-active {
  background-color: #42b983;
  border: 1px solid #42b983;
  color: #fff;
}

.btn-pagination-active:hover {
  background-color: #42b983;
  border: 1px solid #42b983;
  color: #fff;
}

.product-item {
  position: relative;
  text-decoration: none;
}

.product-item:hover {
  box-shadow: 0 5px 10px #888888;
  cursor: pointer;
  transform: translateY(-1px);
}

.img-product {
  height: 250px;
}

.img-product img {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 250px;
  width: auto;
}

.img-product video {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  height: 250px;
  width: auto;
}

@media (max-width: 739px) {
  .btn-sort-by {
    margin: 5px;
    border: 1px solid #000;
  }

  .img-product {
    height: 200px;
  }

  .img-product img {
    height: 200px;
  }
}
</style>