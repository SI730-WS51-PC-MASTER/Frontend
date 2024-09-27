<script>
//import PvCard from "@/main.js";
//import PvButton from "@/main.js";

export default {
  name: "not-found",
  components: {}
}
</script>

<template>
  <div class="mb-4 p-8 flex items-center justify-content-center">
    <pv-card style="width: 25rem; overflow: hidden">
      <template #title> Not found Route 404. </template>
      <template #subtitle> This route is not supported </template>

      <template #footer>
        <div>
          <router-link to='home'>
            <pv-button label="Go Home" class="w-full"/>
          </router-link>
        </div>
      </template>

    </pv-card>
  </div>

</template>

<style scoped>

</style>