<template>
  <div class="container p-3 shadow">
    <div class="row">
      <div class="p-2">
        <h1>Giỏ hàng</h1>
      </div>
      <div class="col-md-9 overflow-auto">
        <table class="table table-bordered">
          <thead>
            <tr>
              <th scope="col" class="text-center align-middle">#</th>
              <th scope="col" class="text-center align-middle">Sản phẩm</th>
              <th scope="col" class="text-center align-middle">SKU</th>
              <th scope="col" class="text-center align-middle">Đơn giá</th>
              <th scope="col" class="text-center align-middle">Số lượng</th>
              <th scope="col" class="text-center align-middle">Số tiền</th>
              <th scope="col" class="text-center align-middle">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(cartItem, index) in shoppingCart" :key="index">
              <td scope="row" class="text-center align-middle">
                {{ index + 1 }}
              </td>
              <td>
                <router-link
                  :to="`/product/${cartItem.sku.productId.id}`"
                  class="d-flex"
                  style="text-decoration: none; color: black"
                >
                  <div
                    v-if="
                      cartItem.sku.productSkuClassification[0].imgUrl != null
                    "
                  >
                    <img
                      :src="
                        baseUrl +
                        '/file/product/' +
                        cartItem.sku.productSkuClassification[0].imgUrl
                      "
                      alt=""
                      class="m-1 object-fit-contain"
                      style="width: 50px; height: 50px"
                    />
                  </div>
                  <div v-else>
                    <img
                      v-if="
                        cartItem.sku.productId.fileProduct[0].type === 'IMAGE'
                      "
                      :src="
                        baseUrl +
                        '/file/product/' +
                        cartItem.sku.productId.fileProduct[0]
                      "
                      alt=""
                      class="m-1"
                      style="width: 50px; height: 50px"
                    />
                    <video
                      v-if="
                        baseUrl +
                          '/file/product/' +
                          cartItem.sku.productId.fileProduct[0].type ===
                        'VIDEO'
                      "
                      :src="cartItem.sku.productId.fileProduct[0]"
                      controls
                      class="m-1"
                      style="width: 50px; height: 50px"
                    />
                  </div>
                  <div class="text-center align-middle">
                    {{ cartItem.sku.productId.productName }}
                  </div>
                </router-link>
              </td>
              <td class="text-center align-middle">{{ cartItem.sku.id }}</td>
              <td class="text-center align-middle">
                {{ formatPrice(cartItem.sku.price) }}
              </td>
              <td class="text-center align-middle">
                <div
                  class="btn-group p-2"
                  role="group"
                  aria-label="Default button group"
                >
                  <button
                    type="button"
                    class="btn classific"
                    @click="
                      updateCart(
                        cartItem.id,
                        cartItem.sku.id,
                        quantity[index] - 1
                      )
                    "
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
                      v-model="quantity[index]"
                      @change="
                        updateCart(
                          cartItem.id,
                          cartItem.sku.id,
                          quantity[index]
                        )
                      "
                    />
                  </button>
                  <button
                    type="button"
                    class="btn classific"
                    @click="
                      updateCart(
                        cartItem.id,
                        cartItem.sku.id,
                        quantity[index] + 1
                      )
                    "
                  >
                    +
                  </button>
                </div>
              </td>
              <td class="text-center align-middle">
                {{ formatPrice(cartItem.price) }}
              </td>
              <td class="text-center align-middle">
                <button
                  type="button"
                  class="btn btn-danger"
                  @click="deleteCart(cartItem.id)"
                >
                  Xóa
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="col-md-3">
        <div class="border p-1" style="width: 100%">
          <div class="d-flex justify-content-between">
            <div>Tổng cộng:</div>
            <h4>{{ formatPrice(total) }}</h4>
          </div>
        </div>
        <button class="btn btn-order mt-2">Mua hàng</button>
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
      currentUser: {},
    };
  },

  props: ["baseUrl", "router", "isLogin", "currentUserPromise"],

  methods: {
    formatPrice(number) {
      return new Intl.NumberFormat("vi-VN", {
        style: "currency",
        currency: "VND",
      }).format(number);
    },

    async updateCart(id, skuId, quantity) {
      if (quantity <= 0) {
        this.deleteCart(id);
      } else {
        try {
          const response = await axios.put(
            this.baseUrl + "/order/cart_line/" + id,
            {
              sku: skuId,
              quantity: quantity,
            },
            {
              headers: {
                "Access-Control-Allow-Origin": "*",
                Authorization: "Bearer " + localStorage.getItem("token"),
              },
            }
          );
          this.$store.dispatch("getCart");
          return response.data;
        } catch (error) {
          alert(
            "Số lượng trong giỏ hàng không được vượt quá sản phẩm trong kho"
          );
          console.error(error);
        }
      }
    },

    async deleteCart(id) {
      try {
        const response = await axios.delete(
          this.baseUrl + "/order/cart_line/" + id,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.$store.dispatch("getCart");
        return response.data;
      } catch (error) {
        console.error(error);
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

    // changeQuantity(id, skuId, quantity) {
      // if (this.quantity <= 0) {
      //   this.quantity = 1;
      // }
      // if (this.quantity > this.productSku.quantity) {
      //   this.quantity = this.productSku.quantity;
      // }
    // },
  },

  async created() {
    this.currentUser = await this.currentUserPromise;
  },

  computed: {
    shoppingCart() {
      return this.$store.getters.getCart;
    },
    total() {
      if (this.shoppingCart) {
        return this.shoppingCart.reduce((total, item) => total + item.price, 0);
      } else {
        return 0;
      }
    },
    quantity() {
      if (this.shoppingCart) {
        let quantity = this.shoppingCart.map((x) => x.quantity);
        return quantity;
      } else {
        return null;
      }
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

.btn-order:active {
  border: 3px solid #42b983;
  color: #42b983;
}

.btn-order {
  width: 100%;
  background-color: #42b983;
  border: 3px solid #42b983;
  color: #fff;
  cursor: pointer;
}

.btn-order:hover {
  opacity: 0.6;
}

@media (max-width: 739px) {
  .height-page {
    height: calc(100vh - 150px);
    margin-bottom: 10px;
  }
}
</style>