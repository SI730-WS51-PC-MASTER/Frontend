<!--<script>
export default {
  name: "wishlist-management"
}
</script>

<template>

</template>

<style scoped>

</style>-->

<template>
  <div class="wishlist-container">
    <h2>Products added</h2>
    <div v-if="wishlist.length">
      <div v-for="product in wishlist" :key="product.id" class="wishlist-item">
        <img :src="product.image" alt="product image">
        <h3>{{ product.name }}<br><br></h3>
        <div>
          <p>Precio unitario: ${{ product.price }}</p>
          <p>{{ product.quantity }} Units</p>
          <button @click="removeFromWishlist(product)">Remove</button>
          <button>Buy now</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No products added to wishlist yet.</p>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    wishlist: Array,
  },
  methods: {
    removeFromWishlist(product) {
      this.$emit('remove-from-wishlist', product);
    },
  },
};
</script>

<style scoped>
.wishlist-container {
  border: 1px solid #ccc;
  padding: 16px;
}
.wishlist-item {
  display: flex;
  align-items: center;
  margin-bottom: 16px;
}
.wishlist-item img {
  width: 100px;
  height: 100px;
  margin-right: 16px;
}
.wishlist-item button {
  margin-left: 16px;
  padding: 4px 8px;
  background-color: #ff4081;
  color: white;
  border: none;
}
</style>


