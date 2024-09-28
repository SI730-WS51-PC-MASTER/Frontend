<!--<script>
export default {
  name: "wishlist-agregate-and-remove"
}
</script>

<template>

</template>

<style scoped>

</style>-->

<template>
  <div class="product-card">
    <img :src="product.image" alt="product image">
    <h3>{{ product.name }}</h3>
    <p>\${{ product.price }}</p>
    <button @click="toggleWishlist">
      {{ isInWishlist ? 'Remove' : 'Add to Wishlist' }}
    </button>
    <div class="quantity">
      <button @click="updateQuantity(-1)">-</button>
      <span>{{ product.quantity }} Units</span>
      <button @click="updateQuantity(1)">+</button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    product: Object,
    wishlist: Array,
  },
  computed: {
    isInWishlist() {
      return this.wishlist.some(item => item.id === this.product.id);
    },
  },
  methods: {
    toggleWishlist() {
      if (this.isInWishlist) {
        this.$emit('remove-from-wishlist', this.product);
      } else {
        this.$emit('add-to-wishlist', this.product);
      }
    },
    updateQuantity(amount) {
      if (this.product.quantity + amount > 0) {
        this.product.quantity += amount;
        this.$emit('update-quantity', this.product);
      }
    },
  },
};
</script>

<style scoped>
.product-card {
  border: 1px solid #ccc;
  padding: 16px;
  display: flex;
  flex-direction: column;
  align-items: center;
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
</style>


