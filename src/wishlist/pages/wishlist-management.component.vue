<script>
import { WishlistService } from "../services/wishlist.service.js";
import ShoppingCartAddAndEdit from "@/orders/components/shopping-cart-add-and-edit.component.vue";
import WishlistAddAndRemoveComponent from "@/wishlist/components/wishlist-add-and-remove.component.vue";

export default {
  name: "WishlistManagement",
  components: {WishlistAddAndRemoveComponent},
  /*data() {
    return {
      quantity: null,
      price: 0,
    }
  },

  methods: {
    getQuantity(length){
      this.quantity = length
    },
    getPrice(price){
      this.price = price
    }
  }*/
  data() {
    return {
      wishlists: [], // Lista de productos en la wishlist
      errors: [],
    };
  },
  created() {
    this.loadWishlist();
  },
  methods: {
    // Carga la lista de deseos desde el backend
    // Maneja la actualización de la lista de deseos
    handleWishlistUpdated(updatedWishlists) {
      this.wishlists = updatedWishlists;
    },

    loadWishlist() {
      const wishlistService = new WishlistService();
      wishlistService.getAllByUserId()
          .then((response) => {
            this.wishlists = response.data;
          })
          .catch((error) => {
            console.error("Error al cargar la lista de deseos:", error);
            this.errors.push(error);
          });
    },

    // Elimina un producto de la wishlist
    removeFromWishlist(wishlistId) {
      const wishlistService = new WishlistService();
      wishlistService.delete(wishlistId)
          .then(() => {
            this.wishlists = this.wishlists.filter(item => item.id !== wishlistId);
            alert("Producto eliminado de la lista de deseos");
          })
          .catch((error) => {
            console.error("Error al eliminar de la lista de deseos:", error);
          });
    },
  },
};
</script>

<template>
  <div class="wishlist-container">
    <h2>Your Wishlist</h2>

    <!-- Usa el componente hijo y escucha el evento -->
    <wishlist-add-and-remove-component
        @wishlist-updated="handleWishlistUpdated"
    />
  </div>
</template>


<style scoped>
.wishlist-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}


i {
  color: #000000;
}

a {
  color: #000000;
  font-size: 17px;
}

.divisor{
  border: 1px solid #00d5ff;
  margin: 15px;
}

.cart-summary {
  background-color: #f8f8f8;
  color: #001014;
}

.action-buttons {
  color: #ffffff;
  margin-top: 15px;
}
</style>









