<script>

export default {
  name: "add-cart-button",
  components: {},

  props: {
    buttonData: {
      type: Object,
      required: false,
    }
  },

  methods: {
    handleClick() {
      this.$emit('button-click', this.buttonData);
    }
  }
}
</script>

<template>
  <pv-button label="Add to shopping cart" severity="danger" @click="handleClick">
    <slot></slot> <!--To pass text inside button-->
  </pv-button>
</template>

<style scoped>

</style>