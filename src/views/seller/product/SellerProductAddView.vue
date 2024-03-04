<template>
  <div>
    <div class="p-3">
      <h1>Thêm sản phẩm</h1>
    </div>

    <form
      class="row g-3 needs-validation"
      @submit.prevent="formSubmit()"
      novalidate
    >
      <!-- Thông tin cơ bản -->
      <div class="border shadow p-3">
        <h4 class="text-center p-2">Thông tin cơ bản</h4>

        <div class="mb-3 row col-md-8">
          <label class="col-sm-4 col-form-label">Tên sản phẩm:</label>
          <div class="col-sm-8">
            <input
              class="form-control"
              type="text"
              placeholder="Nhập vào tên sản phẩm"
              aria-label="default input example"
              v-model="productName"
              required
            />
            <div class="invalid-feedback">Tên sản phẩm không được để trống</div>
          </div>
        </div>

        <div class="mb-3 row col-md-8">
          <label class="col-sm-4 col-form-label">Danh mục sản phẩm:</label>
          <div class="col">
            <div class="position-relative">
              <input
                id="category-id"
                class="form-control bg-light-subtle"
                type="text"
                placeholder="Chọn danh mục sản phẩm"
                required
              />
              <div class="invalid-feedback">Chọn danh mục sản phẩm</div>
              <div
                class="form-control position-absolute top-0 bottom-0 bg-primary opacity-0"
                aria-label="default input example"
                data-bs-toggle="modal"
                data-bs-target="#exampleModal"
                style="cursor: pointer"
              ></div>
            </div>

            <!-- Modal -->
            <div
              class="modal fade"
              id="exampleModal"
              tabindex="-1"
              aria-labelledby="exampleModalLabel"
              aria-hidden="true"
            >
              <div class="modal-dialog modal-dialog-scrollable">
                <div class="modal-content">
                  <div class="modal-header">
                    <h1 class="modal-title fs-5" id="exampleModalLabel">
                      Danh mục sản phẩm
                    </h1>
                    <button
                      type="button"
                      class="btn-close"
                      data-bs-dismiss="modal"
                      aria-label="Close"
                    ></button>
                  </div>
                  <div class="modal-body">
                    <ul
                      class="list-group list-group-flush"
                      v-for="category in categories"
                      :key="category.id"
                    >
                      <div class="list-group-item border">
                        <div
                          class="d-flex justify-content-between align-items-center"
                          style="height: 50px"
                        >
                          <div class="row col-10">
                            <div class="col-sm-11">
                              {{ category.categoryName }}
                            </div>
                            <div class="col-sm-1">
                              <input
                                type="radio"
                                class="form-check-input border border-secondary"
                                id="validationFormCheck2"
                                v-model="categoryIndex"
                                :value="category.id"
                                name="radio-stacked"
                              />
                            </div>
                          </div>
                          <button
                            class="list-group-item accordion-button btn-show-list"
                            type="button"
                            data-bs-toggle="collapse"
                            :data-bs-target="`#collapseTwo${category.id}`"
                            aria-expanded="false"
                            v-if="category.categoryChild.length != 0"
                            @click="toggleElement(category.id)"
                          >
                            <font-awesome-icon
                              :icon="['fas', 'angle-down']"
                              v-if="elements[category.id] == false"
                            />
                            <font-awesome-icon
                              :icon="['fas', 'angle-up']"
                              v-if="elements[category.id] == true"
                            />
                          </button>
                        </div>
                        <div
                          :id="`collapseTwo` + category.id"
                          class="accordion-collapse collapse"
                        >
                          <div
                            v-for="child in category.categoryChild"
                            :key="child"
                          >
                            <div class="d-flex justify-content-end">
                              <div class="col-md-11">
                                <RecursiveCategory
                                  :category="child"
                                  :baseUrl="baseUrl"
                                  @categoryChose="changeCategoryEvent"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </ul>
                  </div>
                  <div class="modal-footer">
                    <button
                      type="button"
                      class="btn btn-secondary"
                      data-bs-dismiss="modal"
                    >
                      Huỷ
                    </button>
                    <button
                      type="button"
                      data-bs-dismiss="modal"
                      @click="btnChangeCategory()"
                      class="btn btn-primary"
                    >
                      Chọn
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3 row col-md-8">
          <label class="col-sm-4 col-form-label">Hình ảnh:</label>
          <div class="col-sm-8">
            <input
              class="form-control"
              type="file"
              id="formFile"
              multiple
              required
              @change="inputFileProduct"
            />
            <div class="invalid-feedback">Tên sản phẩm không được để trống</div>
          </div>
        </div>

        <div class="mb-3 row col-md-8">
          <label class="col-sm-4 col-form-label">Mô tả sản phẩm:</label>
          <div class="col">
            <textarea
              class="form-control"
              id="validationTextarea"
              placeholder="Nhập vào mô tả sản phẩm"
              v-model="description"
              required
            >
            </textarea>
            <div class="invalid-feedback">
              Mô tả sản phẩm không được để trống
            </div>
          </div>
        </div>
      </div>

      <!-- Thông tin chi tiết -->
      <div class="border shadow p-3">
        <h4 class="text-center p-2">Thông tin chi tiết</h4>
        <div class="d-flex flex-wrap">
          <div
            v-for="(attributeValue, key) in attributeValueCategory"
            :key="key"
            class="mb-3 p-3 col-md-6 col-12"
          >
            <label class="form-label">
              {{ attributeValue.attributeCategory.name }}:
            </label>
            <div class="col">
              <input
                v-if="attributeValue.attributeCategory.type == 'TEXT'"
                class="form-control"
                type="text"
                v-model="attributeValue.value"
                required
              />
              <input
                v-if="attributeValue.attributeCategory.type == 'NUMBER'"
                class="form-control"
                type="number"
                min="1000"
                v-model="attributeValue.value"
                required
              />
              <select
                class="form-control"
                v-if="attributeValue.attributeCategory.type == 'SELECT'"
                v-model="attributeValue.value"
              >
                <option
                  :value="value"
                  v-for="value in attributeValue.attributeCategory.dataSelect"
                  :key="value"
                >
                  {{ value }}
                </option>
              </select>
              <input
                v-if="attributeValue.attributeCategory.type == 'DATETIME'"
                class="form-control"
                type="datetime-local"
                required
              />
            </div>
          </div>
        </div>
      </div>

      <!-- Thông tin bán hàng -->
      <div class="border shadow p-3">
        <h4 class="text-center p-2">Thông tin bán hàng</h4>

        <!-- Phân loại sản phẩm -->
        <div class="mb-3 row p-3">
          <div class="form-check col-md-4">
            <input
              type="radio"
              class="form-check-input"
              id="validationFormCheck2"
              name="radio-stacked2"
              v-model="isClassify"
              value="false"
            />
            <label class="form-check-label" for="validationFormCheck2">
              Sản phẩm 1 loại
            </label>
          </div>
          <div class="form-check col-md-4">
            <input
              type="radio"
              class="form-check-input"
              id="validationFormCheck3"
              name="radio-stacked2"
              v-model="isClassify"
              value="true"
            />
            <label class="form-check-label" for="validationFormCheck3">
              Phân loại sản phẩm
            </label>
          </div>
        </div>

        <div class="mb-3 row" v-if="isClassify == 'false'">
          <div class="row col-md-6">
            <label class="form-label"> Giá tiền(đồng) </label>
            <div class="col">
              <input
                class="form-control"
                type="number"
                min="1000"
                placeholder="Nhập vào giá sản phẩm"
                aria-label="default input example"
                v-model="prices[0]"
                required
              />
              <div class="invalid-feedback">Giá sản phẩm tối thiểu 1000đ</div>
            </div>
          </div>
          <div class="row col-md-6">
            <label class="form-label"> Số lượng trong kho </label>
            <div class="col">
              <input
                class="form-control"
                type="number"
                min="0"
                placeholder="Nhập vào số lượng sản phẩm"
                aria-label="default input example"
                v-model="quantities[0]"
                required
              />
              <div class="invalid-feedback">
                Số lượng trong kho không được để trống
              </div>
            </div>
          </div>
        </div>

        <div class="mb-3" v-if="isClassify == 'true'">
          <!-- Thêm thuộc tính -->
          <div class="border rounded mb-3 p-3">
            <div
              class="border mb-3 p-3"
              v-for="(attribute, key) in attributes"
              :key="key"
            >
              <div class="mb-3 row">
                <label class="col-sm-2 col-form-label">
                  - Nhóm phân loại {{ key + 1 }}:
                </label>
                <div class="col-sm-5 col-form-label">
                  <input
                    class="form-control"
                    v-model="attribute.name"
                    required
                  />
                  <div class="invalid-feedback">
                    Hãy đặt tên cho nhóm phân loại
                  </div>
                </div>
                <div
                  class="col-md-2 col-sm-12 col-form-label d-flex justify-content-between"
                >
                  <div
                    class="btn btn-outline-danger"
                    type="button"
                    @click="removeAttribute(key)"
                  >
                    Xóa
                  </div>
                  <div>
                    <input
                      class="form-check-input"
                      type="checkbox"
                      :value="attribute.hasImage"
                    />
                    <span class="col-form-label"> Có ảnh</span>
                  </div>
                </div>

                <div class="mb-3 p-3">
                  <div
                    class="mb-3 row p-3"
                    v-for="(value, i) in attribute.attributeValues"
                    :key="i"
                  >
                    <label class="col-sm-2 col-form-label">
                      + Phân loại: {{ i + 1 }}
                    </label>
                    <div class="col-sm-4 col-form-label">
                      <input
                        class="form-control"
                        v-model="value.value"
                        required
                      />
                      <div class="invalid-feedback">
                        Hãy đặt tên cho phân loại
                      </div>
                    </div>
                    <div
                      class="col-sm-2 col-form-label d-flex justify-content-between"
                    >
                      <div
                        class="btn btn-outline-danger"
                        type="button"
                        @click="removeAttributeValue(key, i)"
                      >
                        Xóa
                      </div>
                      <div>
                        <label for="formFile2">
                          <img
                            src="../../../assets/item/add-image.png"
                            alt=""
                            style="height: 50px; cursor: pointer"
                          />
                        </label>
                      </div>
                    </div>
                  </div>
                  <div class="col-sm-7 text-center">
                    <button
                      type="button"
                      class="btn m-3 btn-primary"
                      @click="addAttributeValue(key)"
                    >
                      Thêm phân loại nhóm {{ key + 1 }} +
                    </button>
                  </div>
                </div>
              </div>
            </div>

            <!-- Button -->
            <button
              type="button"
              class="btn m-3 btn-primary"
              @click="addAttribute()"
            >
              Thêm nhóm phân loại +
            </button>
          </div>

          <!-- Bảng thuộc tính -->
          <div class="table-responsive">
            <table class="table table-striped table-hover table-bordered">
              <thead class="table-secondary">
                <tr>
                  <th
                    v-for="(attribute, key) in attributes"
                    :key="key"
                    scope="col"
                  >
                    {{ attribute.name }}
                  </th>
                  <th scope="col">Giá</th>
                  <th scope="col">Kho hàng</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="index in tableLength[0]" :key="index">
                  <RecursiveTable
                    :attributes="attributes"
                    :recursive="0"
                    :tableLength="tableLength"
                    :index="index"
                  />
                  <td>
                    <div class="d-flex align-items-center" style="height: 70px">
                      <input
                        class="form-control"
                        type="text"
                        placeholder="Nhập giá"
                        aria-label="default input example"
                        required
                      />
                    </div>
                  </td>
                  <td>
                    <div class="d-flex align-items-center" style="height: 70px">
                      <input
                        class="form-control"
                        type="number"
                        min="0"
                        placeholder="Nhập số lượng trong kho"
                        aria-label="default input example"
                        required
                      />
                    </div>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <!-- Button -->
      <div class="col-12 d-flex justify-content-end">
        <div class="p-3">
          <div
            class="btn btn-danger"
            @click="$router.push('/seller/product/list')"
          >
            Hủy
          </div>
        </div>
        <div class="p-3">
          <button class="btn btn-primary" type="submit">Đăng sản phẩm</button>
        </div>
      </div>
    </form>

    <!-- <video :src="baseUrl + '/product/file/71842ff1ec4b49afadcf2bfe916ed250.2023-12-26 22-32-00.mkv'" width="400" controls autoplay>
      Your browser does not support HTML video.
    </video> -->
    <!-- <img
      :src="baseUrl + '/auth/file/607a525b8ee8417da50cde7968617ce9.jpg'"
      alt=""
    /> -->
    <!-- <div class="mb-3 row col-md-8">
      <label class="col-sm-4 col-form-label">Hình ảnh:</label>
      <div class="col-sm-8">
        <input
          class="form-control"
          type="file"
          id="formFile"
          multiple
          required
          @change="inputFileProduct"
        />
        <div class="invalid-feedback">Tên sản phẩm không được để trống</div>
      </div>
    </div>
    <button @click="upLoadFile(5)" class="btn btn-primary">ĐĂng ảnh</button> -->
    <button @click="consoleLog()" class="btn btn-primary">Console Log</button>
  </div>
</template>
<script>
import RecursiveTable from "./RecursiveTable.vue";
import RecursiveCategory from "./RecursiveCategory.vue";

import axios from "axios";
export default {
  components: {
    RecursiveTable,
    RecursiveCategory,
  },

  data() {
    return {
      categories: [],
      productName: "",
      categoryIndex: {},
      elements: {},
      isClassify: "true",
      isCheckedModal: true,

      // Input form
      categoryCreate: "",
      fileProduct: [],
      prices: [],
      quantities: [0],
      description: "",
      attributeValueCategory: [],
      attributes: [
        // {
        //   name: "",
        //   attributeValues: [
        //     {
        //       value: "",
        //     },
        //   ],
        // },
      ],
    };
  },

  props: ["baseUrl"],

  methods: {
    async formSubmit() {
      const forms = document.querySelectorAll(".needs-validation");
      Array.from(forms).forEach((form) => {
        if (!form.checkValidity()) {
          form.classList.add("was-validated");
        } else {
          try {
            this.createProduct();
            alert("Đăng sản phẩm thành công");
            this.$router.push("/seller/product/list");
          } catch (error) {
            console.error(error);
          }
        }
      });
    },

    // Xử lý UI
    toggleElement(index) {
      this.elements[index] = !this.elements[index];
    },

    inputFileProduct(event) {
      this.fileProduct = event.target.files;
    },

    addAttribute() {
      this.attributes.push({
        name: "",
        hasImage: "",

        attributeValues: [
          {
            value: "",
          },
        ],
      });
    },

    removeAttribute(index) {
      this.attributes.splice(index, 1);
    },

    addAttributeValue(index) {
      this.attributes[index].attributeValues.push({
        value: "",
      });
    },

    removeAttributeValue(key, index) {
      this.attributes[key].attributeValues.splice(index, 1);
    },

    changeCategoryEvent(data) {
      this.categoryIndex = data;
    },

    async loadImageWithHeader() {
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
    },

    async btnChangeCategory() {
      const categoryId = document.getElementById("category-id");
      this.categoryCreate = await this.getCategoryById(this.categoryIndex);
      categoryId.value = this.categoryCreate.categoryName;
      this.attributeValueCategory = this.categoryCreate.attributeCategory.map(
        function (item) {
          return {
            attributeCategory: item,
            value: "",
          };
        }
      );
    },

    // Lấy dữ liệu
    async getListCategory() {
      try {
        const response = await axios.get(
          this.baseUrl + "/product/category?parent=1"
        );
        this.categories = await response.data.content;
        this.elements = Array(this.categories.length).fill(false);
        return response.data.content;
      } catch (error) {
        console.error(error);
      }
    },

    async getCategoryById(id) {
      try {
        const response = await axios.get(
          this.baseUrl + "/product/category/" + id
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    // Tạo dữ liệu
    async createProduct() {
      try {
        const response = await axios.post(
          this.baseUrl + "/product/product",
          {
            productName: this.productName,
            category: {
              id: this.categoryCreate.id,
            },
            description: this.description,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.upLoadFile(response.data.id);
        if (this.attributeValueCategory.length != 0) {
          this.createAttributeValueCategory(response.data.id);
        }
        this.createSubProduct(response.data.id);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async upLoadFile(pid) {
      let formdata = new FormData();
      for (var i = 0; i < this.fileProduct.length; i++) {
        formdata.append("file", this.fileProduct[i]);
      }
      try {
        const response = await axios.post(
          this.baseUrl + "/product/file/" + pid,
          formdata,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        return response;
      } catch (error) {
        console.error(error);
      }
    },

    async createAttributeValueCategory(pid) {
      try {
        const response = await axios.post(
          this.baseUrl + "/product/attribute_value_category/list/" + pid,
          this.attributeValueCategory,
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async createSubProduct(pid) {
      try {
        const response = await axios.post(
          this.baseUrl + "/product/subproduct",
          {
            productId: pid,
            prices: this.prices,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        this.createInventory(response.data);
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    async createInventory(subProductId) {
      try {
        const response = await axios.post(
          this.baseUrl + "/product/inventory",
          {
            subProductId: subProductId.map(function (item) {
              return item.id;
            }),
            quantity: this.quantities,
          },
          {
            headers: {
              "Access-Control-Allow-Origin": "*",
              Authorization: "Bearer " + localStorage.getItem("token"),
            },
          }
        );
        return response.data;
      } catch (error) {
        console.error(error);
      }
    },

    consoleLog() {
      console.log(this.attributes);
    },
  },

  async created() {
    this.getListCategory();
  },

  async mounted() {
    // this.loadImageWithHeader();
  },
  computed: {
    tableLength() {
      var result = [];
      var count = 1;
      result.push(count);
      for (var j = this.attributes.length; j > 0; j--) {
        count = count * this.attributes[j - 1].attributeValues.length;
        result.push(count);
      }
      result = result.reverse();
      return result;
    },
  },
};
</script>

<style scoped>
.side-bar {
  height: calc(100vh - 92px);
}

.btn-show-list {
  width: 15px;
  padding: 0;
}

.btn-show-list:hover {
  color: #42b983;
}

.list-group-item {
  border: none;
}

.list-group-item > div > a {
  text-decoration: none;
  color: black;
}

.list-group-item > div > a:hover {
  color: #42b983;
}
@media (max-width: 739px) {
}
</style>
