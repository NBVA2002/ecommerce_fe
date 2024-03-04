<!-- Vue Component: RecursiveComponent.vue -->
<template>
  <div>
    <div
      class="d-flex justify-content-between align-items-center list-group-item"
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
            v-model="categoryChose"
            :value="category.id"
            name="radio-stacked"
            @change="changeEvent()"
          />
        </div>
      </div>
      <button
        type="button"
        class="accordion-button btn-show-list"
        data-bs-toggle="collapse"
        :data-bs-target="`#collapseOne${category.id}`"
        aria-expanded="true"
        aria-controls="`collapseOne` + category.id"
      >
        <div class="d-flex justify-content-between">
          <div v-if="category.categoryChild.length != 0" @click="toggleElement">
            <font-awesome-icon
              :icon="['fas', 'angle-down']"
              v-if="elements == false"
            />
            <font-awesome-icon
              :icon="['fas', 'angle-up']"
              v-if="elements == true"
            />
          </div>
        </div>
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
            <RecursiveCategory
              :category="child"
              @categoryChose="changeCategoryEvent"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      categoryChose: "",
      elements: false,
    };
  },

  props: ["category"],

  methods: {
    toggleElement() {
      this.elements = !this.elements;
    },

    changeEvent() {
      this.$emit("categoryChose", this.categoryChose);
    },
    
    changeCategoryEvent(data) {
      this.categoryChose = data;
      this.$emit("categoryChose", this.categoryChose);
    },

  },
  created() {},
};
</script>

<style scoped>
.content-container,
.side-bar {
  height: calc(100vh - 104px);
}

.list-group-item {
  padding: 0;
  border: none;
}

.list-group-item > a {
  text-decoration: none;
  color: black;
}

.list-group-item :hover {
  color: #42b983;
}

.btn-show-list {
  width: 15px;
  padding: 0;
}

.btn-show-list:hover {
  color: #42b983;
}

/* 
.list-group-item:hover {
  cursor: pointer;
  color: #42b983;
  background-color: #e4e6eb;
}

.list-group-item-active {
  cursor: pointer;
  color: #42b983;
  background-color: #e4e6eb;
} */
</style>
