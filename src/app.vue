<script>
import LanguageSwitcher from "@/public/components/language-switcher.component.vue";

export default {
  name: 'app',
  components: { LanguageSwitcher },
  title: 'PC'
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="mb-4 toolbar">
      <template #start>
        <div class="flex align-items-center gap-3">
          <i class="pi pi-cog" style="font-size: 2rem"></i>
          <i class="pi pi-megaphone" style="font-size: 2rem"></i>
          <language-switcher/>
        </div>
      </template>
      <template #center>
        <div clas="flex items-center gap-2">
          <h1 class="text-center"> {{ $t('phrase') }} </h1>
          <div class="flex justify-content-center gap-2 buttons-container">
            <router-link to='build'>
              <pv-button :label="$t('bttn-1')" severity="danger" style="color: #ffffff"/>
            </router-link>
            <router-link to='components'>
              <pv-button :label="$t('bttn-2')" severity="info" style="color: #ffffff"/>
            </router-link>
            <router-link to='guidance'>
              <pv-button :label="$t('bttn-3')" severity="warn" style="color: #ffffff"/>
            </router-link>
          </div>
        </div>
      </template>
      <template #end>
        <i class="pi pi-user" style="font-size: 2.5rem"></i>
      </template>
    </pv-toolbar>
  </header>
  <main>
    <div id="app">
      <router-view></router-view>
    </div>
  </main>

</template>


<style scoped>
.toolbar{
  width: 100%;
  display: flex;
  padding: 1rem;
  background-color: #2c003e;
}

.buttons-container pv-button{
  color: #ffffff;
}

header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>
