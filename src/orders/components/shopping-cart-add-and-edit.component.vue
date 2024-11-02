<script>
import { cartService } from "../services/cart.service.js";
import { Cart } from "../model/cart.entity.js";

import {ComponentService} from "@/components/services/component.service.js";

export default {
  name: "shopping-cart-add-and-edit",
  components: {},
  data() {
    return {
      carts: [],
      errors: [],
      cartsApi: new cartService(),

      components: [],

      amountValue: [],

      cartLength: 0,

      totalPrice: 0,
    }
  },
  created() {

    //this.cartsApi.setUserContext(2);

    this.getComponentsData()
    this.getCartData();
    this.getCartLength();

  },

  methods: {

    // Get components Data
    getComponentsData(){
      const componentService = new ComponentService();
      componentService.getAll().then(response => {
        this.components = response.data;
        //console.log("Response: ", this.components);
      });
    },

    // Get carts Data by user
    getCartData(){
      this.cartsApi.getAllByUserId()
          .then(response => {
            this.carts = response.data;
            //console.log('Carts Data: ', this.carts)

            this.calculatePrice();
          })
          .catch(error => { this.errors.push(error) })
    },

    // Get Cart Length by user
    getCartLength() {
      this.cartsApi.getAllByUserId()
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

    // Get total price
    calculatePrice() {
      this.totalPrice = this.carts.reduce((total, cartItem) => {
        const componentPrice = this.getComponentPrice(cartItem.componentId);
        return total + (componentPrice || 0);
      }, 0);
      this.$emit('totalPrice', this.totalPrice);
      //console.log('Total price', this.totalPrice);
    },

    getComponentName(componentId) {
      const component = this.components.find(comp => comp.id === componentId);
      return component ? component.name : 'Componente desconocido';
    },
    getComponentImage(componentId) {
      const component = this.components.find(comp => comp.id === componentId);
      return component && component.image ? component.image.main : ''; // Accede a component.image.main
    },
    getComponentPrice(componentId){
      const component = this.components.find(comp => comp.id === componentId);
      return component ? component.price : 0;
    },

    onDeleteItem(cartId) {

      if(cartId == null) {
        console.error("Item not found");
      }

      try {
        this.cartsApi.delete(cartId).then((response) => {
          console.log('Item deleted:', response);
        })
      } catch (error) {
        console.error("Error deleting item:", error);
      }

      this.getCartData();
      this.getCartLength();
    }
  }
}
</script>

<template>
  <div>
    <div class="int-title"> {{ $t('orders.shoppingtitle') }} </div>

    <div class="cards-container">
      <div v-for="cart in carts" :key="cart.id" class="cad-list">
        <pv-card class="w-full items-card">
          <template #header>
            <div class="flex align-items-center gap-3 card-header">

              <div class="flex card-image">
                <img alt="Component image" :src="getComponentImage(cart.componentId)"/>
              </div>

              <div class="flex-column card-info">
                <div class="card-name">{{ getComponentName(cart.componentId) }}</div>

                <div class="card-price"> $:  {{ getComponentPrice(cart.componentId) }} </div>
                <!--<div class="flex"><p> Price: </p><p> {{ this.components }} </p></div>-->

                <div ><pv-button class="card-action" @click="onDeleteItem(cart.id)" label="Remove" severity="info" /></div>
              </div>

            </div>
          </template>

          <template #content>
            <div class="card-amount">
              <pv-input-number v-model="cart.quantity" inputId="minmax-buttons" showButtons
                                mode="decimal" :min="1" :max="10" fluid >
              </pv-input-number>
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

.card-image{
  padding: 10px;
  height: 200px;
  width: 250px;
  overflow: hidden;
}

.card-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
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

.card-price {
  margin: 10px;
  text-align: left;
  font-weight: bold;
  font-size: 20px;
  display: flex;
}

.card-amount {

}

</style>