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
      inputvalue: 1,
      valovalue: 3,

      components: [],
    }
  },
  created() {
    this.cartsApi.getAll()
        .then(response => {
          this.carts = response.data;
          console.log('Carts Data: ', this.carts)
    })
        .catch(error => { this.errors.push(error) })


    const componentService = new ComponentService();
    componentService.getAll().then(response => {
      this.components = response.data;
      console.log("Response from JSON server:", response.data);
    });

  },

  methods: {
    getComponentName(componentId) {
      const component = this.components.find(comp => comp.id === componentId);
      return component ? component.name : 'Componente desconocido';
    },
    getComponentImage(componentId) {
      const component = this.components.find(comp => comp.id === componentId);
      return component && component.image ? component.image.main : ''; // Accede a component.image.main
    }
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
                <img alt="Component image" style="width: 200px; height: 200px" :src="getComponentImage(cart.id)"/>
              </div>
              <div class="flex-column">
                <div class="flex"><p>{{ getComponentName(cart.id) }}</p></div> <br>
                <div class="flex"><pv-rating v-model="valovalue"/></div>
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