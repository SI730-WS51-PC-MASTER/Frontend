<script>
import ShoppingCartAddAndEdit from "@/orders/components/shopping-cart-add-and-edit.component.vue";
import {cartService} from "@/orders/services/cart.service.js";

export default {
  name: "shopping-cart",
  components: {ShoppingCartAddAndEdit},
  data() {
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
  }
}

</script>

<template>
  <div class="shopping-container">

    <div class="page-left">
      <pv-card class="align-items-center">
        <template #header>
          <div class="pi pi-user" style="font-size: 2.5rem; margin: 30px"></div>
        </template>
        <template #title> Name:  </template>
        <template #content>
          <div></div>

        </template>
        <template #footer>
          <router-link to='get-guidance'>
            <pv-button class="action-buttons" :label="$t('bttn-3')" severity="danger"/>
          </router-link>
        </template>
      </pv-card>

      <div>
        <router-link to='get-guidance'>
          <i class="pi pi-ellipsis-h"></i>
        </router-link>
      </div>
    </div>

    <div class="page-mid">
      <shopping-cart-add-and-edit @quantity="getQuantity"
                                  @totalPrice = "getPrice"/>
    </div>

    <div class="page-right">
      <pv-card class="cart-summary">
        <template #header>
          <div class="summary-tittle"> {{$t('orders.summary')}}: </div>
          <hr class="divisor">
          <div class="card-content"><i class="pi pi-check-square"></i> {{$t('orders.products')}}: <a>{{this.quantity}}</a> </div>
          <hr class="divisor">
          <div class="card-content"><i class="pi pi-dollar"></i> {{$t('orders.totalPrice')}}: <a>{{ this.price }}</a> </div>

        </template>
        <template #content>

        </template>
        <template #footer>
          <pv-button class="action-buttons" :label="$t('orders.bttn2')" severity="info"></pv-button>
        </template>

      </pv-card>

      <pv-button class="action-buttons" :label="$t('orders.bttn1')" severity="info"></pv-button>
    </div>

  </div>

</template>

<style scoped>

.shopping-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.page-left {
  flex: 0.5;
}

.page-mid {
  flex: 1;
  min-width: 250px;
  margin: 10px;
}

.page-right {
  flex: 0.5;
}

.summary-tittle{
  margin: 10px;
  color: #000000;
  font-size: 20px;
  font-weight: bold;
}

.card-content {
  margin: 10px;
  color: rgb(248, 113, 113);
  font-size: 15px;
  font-weight: bold;
  border: #00d5ff;
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