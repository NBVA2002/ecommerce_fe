<template>
  <div class="container p-3">
    <div class="row shadow mb-2">
      <div v-if="product.fileProduct" class="col-md-5 height-page">
        <div
          v-if="product.fileProduct.length > 0"
          class="d-flex border align-items-center img-show"
        >
          <img
            v-if="product.fileProduct[imageShow].type == 'IMAGE' && !showImageClassific"
            :src="
              baseUrl + '/file/product/' + product.fileProduct[imageShow].url
            "
            alt=""
            class="object-fit-contain"
          />
          <video
            v-if="product.fileProduct[imageShow].type == 'VIDEO' && !showImageClassific"
            :src="
              baseUrl + '/file/product/' + product.fileProduct[imageShow].url
            "
            style="width: 100%"
            controls
            class="object-fit-contain"
          />
          <img
            v-if="showImageClassific"
            :src="
              baseUrl + '/file/classifiction/' + imageClassificUrl
            "
            alt=""
            class="object-fit-contain"
          />
        </div>
        <div v-else class="img-show">
          <img src="../assets/item/no-image.png" alt="" />
        </div>

        <div
          class="d-flex border border-2 border-secondary overflow-auto"
          style="height: 20%"
        >
          <div
            v-for="(file, index) in product.fileProduct"
            :key="index"
            class="p-1"
          >
            <div
              class="d-flex align-items-center img-select"
              :class="{ 'img-select__active': imageShow == index }"
              @click="imageShow = index; showImageClassific = false"
            >
              <img
                v-if="file.type == 'IMAGE'"
                :src="baseUrl + '/file/product/' + file.url"
                alt=""
                class="object-fit-contain"
              />
              <video
                v-if="file.type == 'VIDEO'"
                :src="baseUrl + '/file/product/' + file.url"
                alt=""
                class="object-fit-contain"
              />
            </div>
          </div>
        </div>
      </div>

      <div class="col-md-7 p-3">
        <h2>{{ product.productName }}</h2>
        <div class="p-2">
          <span class="fs-2 fw-medium" style="color: red; font-w">{{
            price
          }}</span>
          <div
            v-for="classific in classification.keys()"
            :key="classific"
            class="row d-flex align-items-center"
          >
            <div class="col-md-3 col-4">{{ classific }}:</div>
            <div class="col-md-9 col-8 d-flex flex-wrap">
              <div v-for="value in classification.get(classific)" :key="value">
                <div
                  class="p-2 m-2 classific"
                  :class="{
                    'classific-active': classificSku.get(classific) === value.value,
                  }"
                  @click="findProductSkuByValue(classific, value.value, value.img)"
                >
                  {{ value.value }}
                </div>
              </div>
            </div>
          </div>
          <div class="d-flex justify-content-between align-items-center">
            <div class="d-flex align-items-center">
              <div>Số lượng:</div>
              <div
                class="btn-group p-2"
                role="group"
                aria-label="Default button group"
              >
                <button
                  type="button"
                  class="btn classific"
                  @click="addQuantity(-1)"
                  :disabled="!productSkuActive"
                >
                  -
                </button>
                <button
                  type="button"
                  class="btn border border-2 border-secondary"
                >
                  <input
                    class="no-spinner"
                    type="number"
                    inputmode="numeric"
                    min="1"
                    style=""
                    oninput="max=100"
                    v-model="quantity"
                    :disabled="!productSkuActive"
                    @change="changeQuantity()"
                  />
                </button>
                <button
                  type="button"
                  class="btn classific"
                  @click="addQuantity(1)"
                  :disabled="!productSkuActive"
                >
                  +
                </button>
              </div>
            </div>
            <div>{{ productSku.quantity }} Sản phẩm có sẵn</div>
          </div>

          <div class="d-flex justify-content-around m-3">
            <button
              class="btn btn-buy"
              style="border: 3px solid #42b983; color: #42b983"
              :disabled="!productSkuActive"
              @click="addCart"
            >
              Thêm vào giỏ hàng
            </button>
            <button
              class="btn btn-buy classific-active"
              :disabled="!productSkuActive"
            >
              Mua ngay
            </button>
          </div>
        </div>
      </div>
    </div>
    <div class="row shadow">casc</div>
  </div>
</template>
<script>
import axios from "axios";
export default {
  components: {},

  data() {
    return {
      product: {},
      productSku: {},
      productSkuActive: false,
      classificSku: new Map(),
      price: "",
      quantity: 1,

      showImageClassific: false,
      imageClassificUrl: "",

      category: {},
      sortBy: "id",
      sort: "desc",
      pageSize: 12,
      pageNumber: 1,
      totalPages: 1,
      totalElements: 0,
      imageShow: 0,

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
    formatPrice(number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },

    async getProduct() {
      try {
        const response = await axios.get(
          this.baseUrl + "/product/product/" + this.$route.params.id
        );
        this.product = response.data;
        this.price =
          this.formatPrice(this.product.priceMin) +
          "-" +
          this.formatPrice(this.product.priceMax);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    findProductSkuByValue(key, valueClassific, imgUrl) {
      this.classificSku.set(key, valueClassific);
      if(imgUrl!=null) {
        this.showImageClassific = true;
        this.imageClassificUrl = imgUrl;
      }
      if (this.classificSku.size == this.classification.size) {
        let flag;
        for (let sku of this.product.productSku) {
          flag = false;
          for (let skuClassific of sku.productSkuClassification) {
            if (
              this.classificSku.get(skuClassific.classificName) !=
              skuClassific.value
            ) {
              flag = true;
              break;
            }
          }
          if (flag) {
            continue;
          }
          this.productSku = sku;
          this.price = this.formatPrice(sku.price);
          this.productSkuActive = true;
        }
      }
    },

    addQuantity(add) {
      if (
        this.quantity + add > 0 &&
        this.quantity + add <= this.productSku.quantity
      ) {
        this.quantity += add;
      }
    },

    changeQuantity() {
      if (this.quantity <= 0) {
        this.quantity = 1;
      }
      if (this.quantity > this.productSku.quantity) {
        this.quantity = this.productSku.quantity;
      }
    },

    async addCart() {
      try {
        const response = await axios.post(
          this.baseUrl + "/order/cart_line",
          {
            sku: this.productSku.id,
            quantity: this.quantity,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.$store.dispatch("getCart");
        alert("Thêm vào rỏ hàng thành công");
        return response.data;
      } catch (error) {
        alert("Số lượng trong giỏ hàng không được vượt quá sản phẩm trong kho");
        console.error(error);
      }
    },

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
        console.log(this.products[1].subProduct[0].image[0].imgURL);
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
    this.getProduct();
    // this.getCategory();
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

    classification() {
      const classification = new Map();
      if (this.product.productSku) {
        const seen = [];
        for (let i = 0; i < this.product.productSku.length; i++) {
          if (this.product.productSku[i].productSkuClassification) {
            for (
              let j = 0;
              j < this.product.productSku[i].productSkuClassification.length;
              j++
            ) {
              if (
                classification.has(
                  this.product.productSku[i].productSkuClassification[j]
                    .classificName
                ) == false
              ) {
                let set = [];
                set.push({
                  value:
                    this.product.productSku[i].productSkuClassification[j]
                      .value,
                  img: this.product.productSku[i].productSkuClassification[j]
                    .imgUrl,
                });
                seen.push(
                  this.product.productSku[i].productSkuClassification[j].value
                );

                classification.set(
                  this.product.productSku[i].productSkuClassification[j]
                    .classificName,
                  set
                );
              } else {
                let set = classification.get(
                  this.product.productSku[i].productSkuClassification[j]
                    .classificName
                );
                if (
                  !seen.includes(
                    this.product.productSku[i].productSkuClassification[j].value
                  )
                ) {
                  set.push({
                    value:
                      this.product.productSku[i].productSkuClassification[j]
                        .value,
                    img:
                      this.product.productSku[i].productSkuClassification[j]
                        .imgUrl,
                  });
                  seen.push(
                    this.product.productSku[i].productSkuClassification[j].value
                  );

                  classification.set(
                    this.product.productSku[i].productSkuClassification[j]
                      .classificName,
                    set
                  );
                }
              }
            }
          }
        }
      }
      return classification;
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

    imagesProduct() {
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
  },

  watch: {
    async $route() {},
  },
};
</script>
<style scoped>
.height-page {
  height: calc(100vh - 124px);
}

.img-show {
  height: 80%;
  width: 100%;
}

.img-show img {
  height: 100%;
  width: 100%;
}

.img-select {
  height: 100%;
  cursor: pointer;
}

.img-select:hover {
  border: 3px solid #42b983;
}

.img-select video,
.img-select img {
  width: 110px;
  height: 100%;
}

.img-select__active {
  border: 3px solid #42b983;
}

.classific {
  border: 2px solid #6c757d;
  cursor: pointer;
}

.classific:hover {
  background-color: #42b983;
  color: #fff;
}

.classific-active {
  background-color: #42b983;
  color: #fff;
}

.no-spinner::-webkit-outer-spin-button,
.no-spinner::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}
.no-spinner {
  outline: none;
  border: none;
  width: 50px;
  text-align: center;
}

.btn-buy:hover {
  opacity: 0.6;
}

.btn-buy:active {
  border: 3px solid #42b983;
  color: #42b983;
}

@media (max-width: 739px) {
  .height-page {
    height: calc(100vh - 150px);
    margin-bottom: 10px;
  }
}
</style>