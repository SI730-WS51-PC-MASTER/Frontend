<script>
import { WishlistService } from "../services/wishlist.service.js";

export default {
  name: "WishlistManagement",
  data() {
    return {
      wishlist: [],
    };
  },
  methods: {
    removeFromWishlist(wishlistProduct) {
      const wishlistService = new WishlistService();
      wishlistService.delete(wishlistProduct.id)
          .then(() => {
            this.wishlist = this.wishlist.filter((p) => p.id !== wishlistProduct.id);
            this.$emit('remove-from-wishlist', wishlistProduct);
          })
          .catch((error) => {
            console.error("Error removing product:", error);
          });
  },
    fetchWishlist() {
      const wishlistService = new WishlistService();
      wishlistService.getAll()
          .then((response) => {
            this.wishlist = response.data;
          })
          .catch((error) => {
            console.error("Error fetching wishlist:", error);
          });
    },
  },
  mounted() {
    this.fetchWishlist();
  },
};
</script>

<template>
  <div class="wishlist-container">
    <h2>Products added</h2>
    <div v-if="wishlist.length">
      <div v-for="wishlistProduct in wishlist" :key="wishlistProduct.id" class="wishlist-item">
        <h3>{{ wishlistProduct.componentName }}<br><br></h3>
        <div>
          <p class="product-quantity">{{ wishlistProduct.quantityComponent }} Units</p>
          <button @click="removeFromWishlist(wishlistProduct)">Remove</button>
        </div>
      </div>
    </div>
    <div v-else>
      <p>No products added to wishlist yet.</p>
    </div>
  </div>
</template>

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
.product-quantity {
  margin-left: 15px;
}
</style>









