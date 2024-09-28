<script>
export default {
  name: "WishlistAddAndRemoveComponent",
  props: {
    component: {
      type: Object,
      required: true,
    },
    wishlist: {
      type: Array,
      required: true,
    },
  },
  computed: {
    isInWishlist() {
      return this.wishlist.some((item) => item.id === this.component.id);
    },
  },
  methods: {
    toggleWishlist() {
      if (this.isInWishlist) {
        this.$emit("remove-from-wishlist", this.component);
      } else {
        this.$emit("add-to-wishlist", this.component);
      }
    },
    updateQuantity(amount) {
      if (this.component.quantity + amount > 0) {
        this.component.quantity += amount;
        this.$emit("update-quantity", this.component);
      } else {
        this.component.quantity = 1;
      }
    },
  },
};
</script>

<template>
  <div class="component-card">
    <button @click="toggleWishlist" class="addButton">
      {{ isInWishlist ? 'Remove' : 'Add to Wishlist' }}
    </button>
    <div class="quantity">
      <button @click="updateQuantity(-1)">-</button>
      <span>{{ component.quantity }} Units</span>
      <button @click="updateQuantity(1)">+</button>
    </div>
  </div>
</template>

<style scoped>
.component-card {
  width: 250px;
  height: auto;
  padding: 10px;
  margin: 10px;
  display: flex;
  box-shadow: none;
}
.quantity {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.quantity button {
  background-color: #ff4081;
  border: none;
  color: white;
  padding: 4px 8px;
}

.addButton {
  background-color: transparent;
  border: 1px solid #ff0077;
  border-radius: 10px;
  color: #ff0077;
  padding: 5px 10px;
}
</style>
