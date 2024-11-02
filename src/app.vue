<script>
import LanguageSwitcher from "@/public/components/language-switcher.component.vue";

export default {
  name: 'app',
  components: { LanguageSwitcher },
  title: 'PC',
  methods: {
    goToWishlist() {
      //this.$router.push({name: 'wishlist'});
    },
    goToTechnicalSupport() {
      //this.$router.push({name: 'technicalSupport'});
    }
  }
}
</script>

<template>
  <pv-toast/>
  <pv-confirm-dialog/>
  <header>
    <pv-toolbar class="mb-4 toolbar">
      <template #start>
        <div class="flex align-items-center gap-4 start-buttons">
          <i class="pi pi-cog" style="font-size: 2rem"></i>
          <router-link to='view-your-request-for-guidance-submitted'>
            <i class="pi pi-megaphone" style="font-size: 2rem" @click="goToTechnicalSupport"></i>
          </router-link>
          <router-link to='shopping-cart'>
          <i class="pi pi-shopping-cart"></i>
          </router-link>
          <router-link to='wishlist'>
          <i class="pi pi-heart-fill" style="font-size: 2rem" @click="goToWishlist"></i>
          </router-link>
          <!--<i class="pi pi-user" style="font-size: 2.5rem"></i>-->
        </div>
      </template>
      <template #center>
        <div class="flex flex-column items-center gap-2">
          <h1 class="text-center"> {{ $t('phrase') }} </h1>
          <div class="flex justify-content-center gap-2 buttons-container">
            <router-link to='home'>
              <pv-button :label="$t('bttn-4')" severity="peace" style="color: #ffffff"/>
            </router-link>
            <router-link to='build'>
              <pv-button :label="$t('bttn-1')" severity="danger" style="color: #ffffff"/>
            </router-link>
            <router-link to='components'>
              <pv-button :label="$t('bttn-2')" severity="info" style="color: #ffffff"/>
            </router-link>
            <router-link to='get-guidance'>
              <pv-button :label="$t('bttn-3')" severity="warn" style="color: #ffffff"/>
            </router-link>
          </div>
        </div>
      </template>
      <template #end>
        <language-switcher/>
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
/* Estilos generales */
body {
  margin: 0;
  font-family: Arial, sans-serif;
}

/* Toolbar */
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem;
  background-color: #2c003e;
}

.start-buttons i {
  font-size: 1.5rem;
  color: #ffffff;
}

.buttons-container pv-button{
  color: #ffffff;
}

/* Estilos para los íconos */
.pi {
  transition: transform 0.3s;
}

.pi:hover {
  transform: scale(1.1);
}

/* Contenedor de botones */
.buttons-container {
  display: flex;
  flex-wrap: wrap; /* Permite que los botones se envuelvan en pantallas más pequeñas */
  justify-content: center;
}

/* Media Queries */
@media (max-width: 600px) {
  .toolbar {
    flex-direction: column; /* Apila los elementos verticalmente en pantallas pequeñas */
    align-items: flex-start; /* Alinea los elementos al inicio */
  }

  .buttons-container {
    flex-direction: column; /* Apila los botones verticalmente */
    align-items: center; /* Centra los botones */
  }

  header h1 {
    font-size: 1.5rem; /* Reduce el tamaño de fuente para pantallas pequeñas */
  }

  .pi {
    font-size: 1.5rem; /* Reduce el tamaño de los íconos */
  }
}

@media (max-width: 300px) {
  header h1 {
    font-size: 1.2rem; /* Ajuste adicional para pantallas muy pequeñas */
  }

  .pi {
    font-size: 1.2rem; /* Ajusta aún más los íconos */
  }

  .buttons-container {
    margin: 0.5rem 0; /* Reduce el margen entre los botones */
  }
}

</style>
