<!-- Vue Component: RecursiveComponent.vue -->
<template>
  <td
    v-if="(index - 1) % tableLength[recursive + 1] == 0"
    :rowspan="tableLength[recursive + 1]"
  >
    <div>
      <div class="mb-2">
        {{
          attributes[recursive].attributeValues[
            Math.floor(
              ((index - 1) / tableLength[recursive + 1]) %
                attributes[recursive].attributeValues.length
            )
          ].value
        }}
      </div>
      <div class="d-flex justify-content-center">
        <input
          class="d-none"
          type="file"
          id="formFile2"
          accept="image/*"
          @change="inputImageProduct"
        />
        <!-- <label for="formFile2">
          <img
            src="../../../assets/item/add-image.png"
            alt=""
            style="height: 50px"
          />
        </label> -->
      </div>
    </div>
  </td>

  <RecursiveTable
    v-if="recursive + 1 < attributes.length"
    :attributes="attributes"
    :recursive="recursive + 1"
    :tableLength="tableLength"
    :index="index"
  />
</template>

<script>
export default {
  data() {
    return {};
  },

  props: ["attributes", "recursive", "tableLength", "index"],

  methods: {},
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
