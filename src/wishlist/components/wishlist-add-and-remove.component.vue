<script>
import CreateAndEdit from '../../shared/components/create-and-edit.component.vue';
import {Wishlist} from "@/wishlist/model/wishlist.entity.js";
import {ComponentService} from "@/components/services/component.service.js";
import {WishlistService} from "@/wishlist/services/wishlist.service.js";
import {$t} from "@primeuix/styled";

export default {
  name: "WishlistAddAndRemoveComponent",
  components: {
    CreateAndEdit,
  },
  data() {
    return {
      wishlists: [],
      errors: [],
      components: [],
      wishlistApi: new WishlistService()
    }
  },
  created() {
    this.getComponentsData()
    this.getWishlistData();
    this.getCartLength();

  },

  methods: {
    $t,

    // Get components Data
    getComponentsData(){
      const componentService = new ComponentService();
      componentService.getAll().then(response => {
        this.components = response.data;
        //console.log("Response: ", this.components);
      });
    },
    // Get Cart Length by user
    getCartLength() {
      this.wishlistApi.getAllByUserId()
          .then(response => {
            this.cartLength = response.data.length;
            //console.log('cart length ', this.cartLength);
            // Emit cart quantity
            this.$emit('quantity', this.cartLength);
          })
          .catch(error => {
            this.errors.push(error)
          })
    },
    getWishlistData() {
      this.wishlistApi.getAllByUserId()
          .then((response) => {
            this.wishlists = response.data; // Actualiza la lista de deseos
            this.$emit("wishlist-updated", this.wishlists); // Emite los datos para que el padre los reciba
          })
          .catch((error) => {
            this.errors.push(error);
            console.error("Error al cargar la lista de deseos:", error);
          });
    },

    getComponentName(componentId) {
      const component = this.components.find(comp => comp.componentId === componentId);
      return component ? component.name : 'Componente desconocido';
    },
    onDeleteItem(wishlistId) {

      if(wishlistId === null) {
        console.error("Item not found");
      }

      try {
        this.wishlistApi.delete(wishlistId).then((response) => {
          //console.log('Item deleted:', response);
        })
      } catch (error) {
        console.error("Error deleting item:", error);
      }

      this.getWishlistData();
      this.getCartLength();
    }
  }
};
</script>

<template>
  <div>
    <div class="int-title">{{ $t("component-card") }}</div>

    <div class="wishlist-container">
      <div v-if="wishlists.length === 0">No products added to wishlist yet.</div>

      <div v-for="wishlist in wishlists" :key="wishlist.id" class="cad-list">
        <pv-card class="w-full items-card">
          <template #header>
            <div class="flex align-items-center gap-3 card-header">
              <div class="flex-column card-info">
                <div class="card-name">{{ getComponentName(wishlist.componentId) }}</div>
                <div class="card-name"> Cantidad: {{ wishlist.quantity }}</div>
                <pv-button
                    class="card-action"
                    @click="onDeleteItem(wishlist.id)"
                    label="Remove"
                    severity="info"
                />
              </div>
            </div>
          </template>
        </pv-card>
      </div>
    </div>
  </div>
</template>

<style scoped>
.int-title {
  margin: 15px;
  color: #ffffff;
  font-size: 25px;
  font-weight: bold;
}

.cards-container {
  width: 100%;
}

.cad-list {
  padding: 1rem;
}

.items-card {
  background-color: rgba(128, 128, 128, 0.7);
  width: 100px;
}

.card-header{
  width: 100%;
}

.card-info{
  width: 200px;
  margin: 15px;
}

.card-action {
  color: #ffffff;
  width: 100%;
}

.card-name {
  margin: 5px;
  text-align: left;
  font-size: 20px;
  display: flex;

}
</style>
