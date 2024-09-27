<script>
import ComponentList from "../components/component-list.component.vue"; // Ajusta la ruta según sea necesario
import { ComponentService } from "../services/component.service.js";

export default {
  name: "AllComponents",
  components: { ComponentList },
  data() {
    return {
      components: [],
    };
  },
};
</script>

<template>
  <div class="navbar">
    <div class="icons">
      <img src="@/assets/icons/settings.png" alt="Settings" />
      <img src="@/assets/icons/announcements.png" alt="Announcements" />
      <img src="@/assets/icons/translation.png" alt="Translation" />
    </div>
    <div class="user-icon">
      <img src="@/assets/icons/user.png" alt="User" />
    </div>
  </div>

  <div class="container">
    <!-- Sección de filtros -->
    <div class="filter-section">
      <h2>Find a component</h2>
      <div class="search-bar">
        <input type="text" placeholder="Search">
        <button><i class="fas fa-search"></i></button>
      </div>
      <h2>Choose your options</h2>
      <div class="filter-options">
        <label for="price">Precio</label>
        <input type="number" placeholder="Mínimo">
        <input type="number" placeholder="Máximo">

        <label for="country">Pais - Busqueda</label>
        <select id="country">
          <option value="default">Select a country</option>
          <option value="usa">USA</option>
          <option value="canada">Canada</option>
          <!-- Agregar más países -->
        </select>

        <!-- Badges de categorías -->
        <div class="filter-badges">
          <div class="badge">Trabajo</div>
          <div class="badge">Juegos</div>
          <div class="badge">Diseño</div>
        </div>

        <!-- Badges de componentes -->
        <div class="filter-badges">
          <div class="badge">Processors</div>
          <div class="badge">RAM Memories</div>
          <div class="badge">Motherboards</div>
          <div class="badge">Graphics Cards</div>
        </div>
      </div>
    </div>

    <!-- Sección de componentes -->
    <div class="component-section">
      <h2>Enumerate by</h2>
      <div class="sort-buttons">
        <button>Lower Price</button>
        <button>Higher Price</button>
        <button>More stars</button>
        <button>Less stars</button>
      </div>
      
      <div class="component-list">
        <component-list :components="components" />
        <!-- Repetir las cards para más componentes -->
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #FF1B6B4D;
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.icons {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
}

.user-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}
body {
  background: linear-gradient(145deg, #FF1B6B4D 30%, #45CAFF33 70%); /* Degradado personalizado */
  color: #ffffff; /* Color de texto blanco por defecto */
  font-family: 'Arial', sans-serif;
}

.container {
  display: flex;
  gap: 30px;
  padding: 20px;
}

/* Sección izquierda para buscar componentes y opciones */
.filter-section {
  width: 30%;
  background: linear-gradient(145deg, #FF1B6B4D 30%, #45CAFF33 70%); /* Degradado personalizado */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.filter-section h2 {
  color: #fff; /* Color blanco para los títulos principales */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 18px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.search-bar input {
  border: none;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
}

.search-bar button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.filter-options label {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.filter-options input[type="text"],
.filter-options input[type="number"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.filter-options select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
}

.filter-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  background-color: #ff0077; /* Color rosa neón */
  color: #fff;
  border-radius: 20px;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 14px;
}

.badge:hover {
  background-color: #ff55aa; /* Efecto hover en los badges */
}

/* Sección derecha con lista de componentes */
.component-section {
  width: 65%;
}

.component-section h2 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

/* Botones para ordenar los componentes */
.sort-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.sort-buttons button {
  padding: 10px 15px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sort-buttons button:hover {
  background-color: #ff0077;
}

/* Lista de componentes */
.component-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.component-actions i {
  color: #00c4ff;
  font-size: 24px;
  cursor: pointer;
}

.component-actions i:hover {
  color: #ff55aa;
}
</style>