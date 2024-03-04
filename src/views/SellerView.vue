<template>
  <div class="d-flex">
    <!-- Sidebar pc -->
    <div class="d-md-block d-none col-md-3 overflow-y-scroll shadow side-bar">
      <ul
        class="list-group list-group-flush"
        v-for="category in navigation"
        :key="category.id"
      >
        <div class="list-group-item border">
          <a
            class="d-flex justify-content-between align-items-center"
            data-bs-toggle="collapse"
            :data-bs-target="`#collapseOne${category.id}`"
            aria-expanded="false"
            :aria-controls="`collapseOne` + category.id"
            v-if="category.categoryChild.length != 0"
            @click="toggleElement(category.id)"
            style="height: 50px"
          >
            <div
              :style="{
                color: new RegExp(
                  '^\\/seller\\' + category.router + '\\/.*'
                ).test(router)
                  ? '#42b983'
                  : '',
              }"
            >
              <font-awesome-icon :icon="['fas', category.icon]" />
              {{ category.name }}
            </div>

            <div
              class="list-group-item accordion-button btn-show-list"
              :style="{
                color: new RegExp(
                  '^\\/seller\\' + category.router + '\\/.*'
                ).test(router)
                  ? '#42b983'
                  : '',
              }"
            >
              <font-awesome-icon
                :icon="['fas', 'angle-down']"
                v-if="elements[category.id] == false"
              />
              <font-awesome-icon
                :icon="['fas', 'angle-up']"
                v-if="elements[category.id] == true"
              />
            </div>
          </a>

          <router-link
            :to="'/seller' + category.router"
            class="d-flex justify-content-between align-items-center"
            v-if="category.categoryChild.length == 0"
            style="height: 50px"
          >
            <div
              :style="{
                color: new RegExp('/seller' + category.router).test(router)
                  ? '#42b983'
                  : '',
              }"
            >
              <font-awesome-icon :icon="['fas', category.icon]" />
              {{ category.name }}
            </div>
          </router-link>

          <!-- Danh mục con -->
          <div
            :id="`collapseOne` + category.id"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
            :class="{
              show: new RegExp('^\\/seller\\' + category.router + '\\/.*').test(
                router
              ),
            }"
          >
            <div v-for="child in category.categoryChild" :key="child">
              <div class="d-flex justify-content-end">
                <router-link
                  :to="'/seller' + category.router + child.router"
                  class="col-md-11 list-group-item list-group-item-child"
                  :style="{
                    color: new RegExp(
                      '^\\/seller\\' + category.router + '\\' + child.router
                    ).test(router)
                      ? '#42b983'
                      : '',
                  }"
                >
                  {{ child.name }}
                </router-link>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <!-- Content container -->
    <div class="col-md-9 overflow-y-scroll content-container p-3">
      <router-view :baseUrl="baseUrl"/>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      navigation: [
        {
          id: 1,
          router: "/data",
          name: "Dữ liệu",
          icon: "chart-line",
          categoryChild: [
            {
              router: "/businessinsights",
              name: "Phân tích bán hàng",
            },
            {
              router: "/accounthealth",
              name: "Hiệu quả hoạt động",
            },
          ],
        },
        {
          id: 2,
          router: "/product",
          name: "Quản lý sản phẩm",
          icon: "bag-shopping",
          categoryChild: [
            {
              router: "/list",
              name: "Tất cả sản phẩm",
            },
            {
              router: "/add",
              name: "Thêm sản phẩm",
            },
          ],
        },
        {
          id: 3,
          router: "/order",
          name: "Quản lý đơn hàng",
          icon: "clipboard-list",
          categoryChild: [
            {
              router: "/list",
              name: "Tất cả đơn hàng",
            },
            {
              router: "/cancel",
              name: "Đã huỷ",
            },
          ],
        },
        {
          id: 4,
          router: "/finance",
          name: "Tài chính",
          icon: "wallet",
          categoryChild: [],
        },
        {
          id: 5,
          router: "/manager",
          name: "Quản lý shop",
          icon: "store",
          categoryChild: [
            {
              router: "/rating",
              name: "Đánh Giá Shop",
            },
          ],
        },
      ],

      elements: Array(6).fill(false),
    };
  },

  props: ["baseUrl","router"],

  methods: {
    toggleElement(index) {
      this.elements[index] = !this.elements[index];
    },

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
    console.log(this.router);
  },

  mounted() {},

  computed: {},

  watch: {},
};
</script>

<style scoped>
.content-container,
.side-bar {
  height: calc(100vh - 92px);
}

.btn-show-list {
  width: 15px;
  padding: 0;
}

.list-group-item {
  border: none;
  cursor: pointer;
}

.list-group-item > a {
  text-decoration: none;
}

.list-group-item > a > div {
  color: #000;
}

.list-group-item:hover > a > div {
  color: #42b983;
}

.list-group-item-child:hover {
  color: #42b983;
}

@media (max-width: 739px) {
}
</style>
