<template>
  <div class="d-flex">
    <!-- Sidebar PC -->
    <div class="d-md-block d-none col-md-3 overflow-y-scroll shadow side-bar">
      <ul
        class="list-group list-group-flush"
        v-for="category in categorys"
        :key="category.id"
      >
        <div class="list-group-item border">
          <div
            class="d-flex justify-content-between align-items-center"
            style="height: 50px"
          >
            <router-link :to="`/shop/${category.id}`" class="">
              {{ category.categoryName }}
            </router-link>
            <button
              class="list-group-item accordion-button btn-show-list"
              data-bs-toggle="collapse"
              :data-bs-target="`#collapseOne${category.id}`"
              aria-expanded="false"
              :aria-controls="`collapseOne` + category.id"
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
            :id="`collapseOne` + category.id"
            class="accordion-collapse collapse"
            data-bs-parent="#accordionExample"
          >
            <div v-for="child in category.categoryChild" :key="child">
              <div class="d-flex justify-content-end">
                <div class="col-md-11">
                  <RecursiveCategory :category="child" :baseUrl="baseUrl"/>
                </div>
              </div>
            </div>
          </div>
        </div>
      </ul>
    </div>

    <!-- Content container -->
    <div class="col-md-9 overflow-y-scroll content-container p-3">
      <router-view :baseUrl="baseUrl" />
    </div>
  </div>
</template>
<script>
import RecursiveCategory from "../components/RecursiveCategory.vue";
import axios from "axios";
export default {
  components: {
    RecursiveCategory,
  },

  data() {
    return {
      categorys: [],
    };
  },

  props: ["router", "baseUrl"],

  methods: {
    toggleElement(index) {
      this.elements[index] = !this.elements[index];
    },

    async getListCategory() {
      try {
        const response = await axios.get(
          this.baseUrl + "/product/category?parent=1"
        );
        this.categorys = response.data.content;

        return response.data.content;
      } catch (error) {
        console.error(error);
      }
    },
  },

  async created() {
    this.getListCategory();
  },

  computed: {
    elements() {
      return Array(this.categorys.length).fill(false);
    },
  },
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