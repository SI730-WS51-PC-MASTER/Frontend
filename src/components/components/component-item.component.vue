<script>
import {Component} from "@/components/model/component.entity.js";
export default {
  name: "ComponentItem",
  props: {
    component: {
      type: Object,
      required: true,
    }
  },
  methods: {
  },
};
</script>

<template>
  <div class="component-list">
  <div class="component-card">
    <img
        v-if="component.image"
        :src="component.image"
        alt="Component image"
        class="component-image"
    />
    <div class="component-info">
      <h3 class="component-title">{{ component.name }}</h3>
      <p class="component-price">${{ component.price }}.00</p>

      <div class="component-rating">
  <span v-for="n in 5" :key="n" class="star">
    <i :class="{'filled-star': n <= component.ratings, 'empty-star': n > component.ratings}">★</i>
  </span>
      </div>
      <!-- Mostrar el estado del stock -->
      <p v-if="component.stock > 10" class="available component-status">Available</p>
      <p v-else-if="component.stock > 0" class="short component-status">Short</p>
      <p v-else class="unavailable component-status">Unavailable</p>
    </div>
    <div class="component-actions">
      <!-- Aquí puedes añadir los iconos de acción -->
      <i class="fa fa-edit"></i> <!-- Icono de editar -->
    </div>
  </div>
  </div>
</template>
<style>
.component-image {
  width: 200px;
  height: 200px;
  object-fit: cover;
  border-radius: 5px;
  margin-right: 10px;
}
body {
  background: linear-gradient(145deg, #2b0035, #1c2d4b); /* Fondo degradado morado oscuro */
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
  background: linear-gradient(145deg, #40005e, #1a153a); /* Degradado oscuro en la sección de filtros */
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
.component-list {
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

/* Estilo de las tarjetas de componentes */
.component-card {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #2b1d44; /* Fondo morado oscuro para las tarjetas */
  border-radius: 10px;
  padding: 15px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3);
  transition: transform 0.2s ease-in-out;
  color: #fff;
  min-height: 150px; /* Ajusta la altura mínima para uniformidad */
}


.component-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
  flex-grow: 1; /* Permite que la sección de info ocupe el espacio restante */
}


.component-card:hover {
  transform: scale(1.03);
}

.component-title {
  font-size: 18px;
  color: #ff0077; /* Color rosado para los títulos de los componentes */
  font-weight: bold;
}

.component-price {
  color: #00c4ff; /* Color azul para el precio */
  font-weight: bold;
}

.component-rating {
  display: flex;
  gap: 5px;
}

.star {
  font-size: 20px; /* Ajusta según sea necesario */
}

.filled-star {
  color: gold; /* O cualquier color que desees */
}

.empty-star {
  color: lightgray; /* O cualquier color que desees */
}


.component-status {
  background-color: transparent;
  border: 1px solid #ff0077;
  border-radius: 10px;
  color: #ff0077;
  padding: 5px 10px;
}

.component-actions {
  display: flex;
  gap: 10px;
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