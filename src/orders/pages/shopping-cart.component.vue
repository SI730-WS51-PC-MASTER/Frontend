<script>
import ShoppingCartAddAndEdit from "@/orders/components/shopping-cart-add-and-edit.component.vue";

export default {
  name: "shopping-cart",
  components: {ShoppingCartAddAndEdit}
}
</script>

<template>
  <div class="flex gap-3">
    <div class="w-3">
      <pv-card class="align-items-center">
        <template #header>
          <i class="pi pi-user" style="font-size: 2.5rem"></i>
        </template>
        <template #title> User name </template>
        <template #content>
          <p></p>

        </template>
        <template #footer>
          <router-link to='home'>
            <pv-button :label="$t('bttn-3')" severity="danger" style="color: #ffffff"/>
          </router-link>
        </template>

      </pv-card>



      <div class="flex w-full">
        <shopping-cart-add-and-edit/>
      </div>
    </div>






  </div>





</template>

<style scoped>

</style>