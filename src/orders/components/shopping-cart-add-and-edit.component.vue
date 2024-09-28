<script>
import { cartService } from "../services/cart.service.js";
import { Cart } from "../model/cart.entity.js";

export default {
  name: "shopping-cart-add-and-edit",
  components: {},
  data() {
    return {
      carts: [],
      errors: [],
      cartsApi: new cartService(),
      inputvalue: 1,
    }
  },
  created() {
    this.cartsApi.getAll()
        .then(response => {
          this.carts = response.data;
          console.log('Carts Data: ', this.carts)
    })
        .catch(error => { this.errors.push(error) })
  }
}
</script>

<template>
  <div>
    <h1> {{ $t('shoppingtitle') }} </h1>
    <div class="">
      <div v-for="cart in carts" :key="cart.id">
        <pv-card class="w-full">
          <template #header>
            <div class="flex align-items-center gap-3">
              <div class="flex">
                <img alt="Component image" src=""/>
              </div>
              <div class="flex-column">
                <div class="flex"><p>nombre del component</p></div> <br>
                <div class="flex"><pv-rating v-model="inputvalue"/></div>
                <div class="flex"><p> {{ cart.id }} </p></div>
                <div class="flex"><pv-button label="Remove" severity="info" style="color: #ffffff"/></div>
              </div>
            </div>
          </template>

          <template #footer>
            <pv-input-number v-model="inputvalue" inputId="horizontal-buttons" showButtons buttonLayout="horizontal" fluid>
              <template #incrementbuttonicon>
                <span class="pi pi-plus"/>
              </template>
              <template #decrementbuttonicon>
                <span class="pi pi-minus"/>
              </template>
            </pv-input-number>
          </template>
        </pv-card>
      </div>
    </div>

  </div>

</template>

<style scoped>

.custom-flex {
  display: flex;
  flex-direction: column; /* Coloca los elementos en columna */
  gap: 12px; /* Espaciado entre los elementos */
}

</style>