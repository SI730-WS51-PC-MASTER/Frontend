<script>
import {cartService} from "@/orders/services/cart.service.js";
import {Cart} from "@/orders/model/cart.entity.js";

export default {
  name: "cart-manager",
  components: {},

  data(){
    return {
      orders: [],
      cartServ: null
    }
  },

  methods: {
    getAllOrder() {
      this.cartServ = new cartService();
      this.cartServ.getAll().then(response => {
        this.orders = response.data.map(order => new Cart(order));
        console.log(this.orders);
      }).catch(error => console.error(error));
    }
  },

  created() {
    this.getAllOrder();
  }
}

</script>

<template>
  <pv-data-table :value="orders" table-style="min-width: 50rem" paginator:rows="10" :showGridlines="true">
    <!--<pv-column v-for="order of orders" :key="order.field" :field="order.field" :header="order.header"></pv-column>-->
    <pv-column field="id" header="ID" sortable></pv-column>
    <pv-column field="componentId" header="Component ID" sortable></pv-column>
    <pv-column field="userId" header="User ID" sortable></pv-column>
    <pv-column field="quantity" header="Quantity" sortable></pv-column>
  </pv-data-table>

</template>

<style scoped>

</style>