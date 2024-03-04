<!-- Vue Component: RecursiveComponent.vue -->
<template>
  <td v-if="(index-1) % (tableLength[recursive + 1]) == 0" :rowspan="tableLength[recursive+1]" >
    {{ attributes[recursive].attributeValues[Math.floor((index-1) / (tableLength[recursive + 1])%attributes[recursive].attributeValues.length)].value }}    
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
