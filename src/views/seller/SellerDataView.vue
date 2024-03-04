<template>
  <div>
    <button
      class="accordion-button"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseOne"
      aria-expanded="true"
      aria-controls="collapseOne"
    >
      Accordion Item #1
    </button>
    <div
      id="collapseOne"
      class="accordion-collapse collapse show"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <strong>This is the first item's accordion body.</strong> It is shown by
        default, until the collapse plugin adds the appropriate classes that we
        use to style each element. These classes control the overall appearance,
        as well as the showing and hiding via CSS transitions. You can modify
        any of this with custom CSS or overriding our default variables. It's
        also worth noting that just about any HTML can go within the
        <code>.accordion-body</code>, though the transition does limit overflow.
      </div>
    </div>
    <button
      class="accordion-button collapsed"
      type="button"
      data-bs-toggle="collapse"
      data-bs-target="#collapseTwo"
      aria-expanded="false"
      aria-controls="collapseTwo"
    >
      Accordion Item #2
    </button>
    <div
      id="collapseTwo"
      class="accordion-collapse collapse"
      data-bs-parent="#accordionExample"
    >
      <div class="accordion-body">
        <strong>This is the second item's accordion body.</strong> It is hidden
        by default, until the collapse plugin adds the appropriate classes that
        we use to style each element. These classes control the overall
        appearance, as well as the showing and hiding via CSS transitions. You
        can modify any of this with custom CSS or overriding our default
        variables. It's also worth noting that just about any HTML can go within
        the <code>.accordion-body</code>, though the transition does limit
        overflow.
      </div>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {};
  },

  props: [],

  methods: {},
  created() {},
  mounted() {},

};
</script>

<style scoped>
@media (max-width: 739px) {
}
</style>
