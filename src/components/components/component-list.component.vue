<script>
import ComponentItem from '../components/component-item.component.vue'
import {ComponentService} from "@/components/services/component.service.js";
export default {
  name: "ComponentList",
  components: {ComponentItem},
  data() {
    return {
      components: [],
      searchQuery: '',
      filteredComponents: []
    };
  },
  created() {
    const componentService = new ComponentService();
    componentService.getAll().then(response => {
      this.components = response.data;
      this.filteredComponents = this.components; // Inicialmente, mostrar todos los componentes
      console.log("Response from JSON server:", response.data);
    });
  },
  methods: {
    filterComponents() {
      this.filteredComponents = this.components.filter(component => {
        const searchLower = this.searchQuery.toLowerCase();
        return (
            component.name.toLowerCase().includes(searchLower) ||
            component.description.toLowerCase().includes(searchLower) ||
            component.price.toString().includes(searchLower) // Convertimos el precio a string para la búsqueda
        );
      });
    },
    viewDetails(component) {
      // Navegar a una página de detalles o abrir modal
      this.$router.push({ name: 'ComponentDetails', params: { id: component.id } });
    }
  }
}
</script>

<template>
  <div>
    <input
        type="text"
        v-model="searchQuery"
        placeholder="Buscar componentes..."
        @input="filterComponents"
    />
    <div class="card-container" aria-label="country list">
      <component-item
          v-for="component in filteredComponents"
          :key="component.name"
          :component="component">
      </component-item>
    </div>
  </div>
</template>

<style scoped>
.card-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}
</style>