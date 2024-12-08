<script>
import {TechnicalReviewService} from "@/review/services/technical-review.service.js";
import {TechnicalSupportReview} from "@/review/model/technical-support-review.entity.js";

export default {
  name: "technical-review-management",
  props: {
    technicalSupportId: {
      type: [Number],
      required: true,
    },
  },
  data() {
    return {
      reviews: [],
      newReview: new TechnicalSupportReview(),
      editingReview: null,
    };
  },
  mounted() {
    //console.log('In mounted hook, technicalSupportId:', this.technicalSupportId);
    if (this.technicalSupportId) {
      this.fetchReviews();
    } else {
      console.error("technicalSupportId is undefined in mounted hook");
    }
  },
  watch: {
    technicalSupportId(newVal) {
      if (newVal) {
        console.log('technicalSupportId changed:', newVal);
        this.fetchReviews();
      }
    },
  },
  methods: {
    async fetchReviews() {
      const reviewService = new TechnicalReviewService();
      try {
        console.log("Fetching reviews for technical Support ID:", this.technicalSupportId);
        const response = await reviewService.getByTechnicalId(this.technicalSupportId);
        this.reviews = Array.isArray(response.data) ? response.data : [];
      } catch (error) {
        console.error("Error fetching reviews:", error);
        this.reviews = [];
      }
    },

    // Guardar o actualizar opinión
    async saveReview() {
      const reviewService = new TechnicalReviewService();

      // Validar que el rating esté entre 1 y 5
      if (this.newReview.rating < 1 || this.newReview.rating > 5) {
        alert("El rating debe estar entre 1 y 5."); // Mostrar alerta
        return; // Salir del método sin proceder
      }

      if (this.editingReview) {
        // Actualizar opinión existente
        try {
          await reviewService.update(this.editingReview.id, this.newReview);
          await this.fetchReviews();
          this.cancelEdit();
        } catch (error) {
          console.error("Error updating review:", error);
        }
      } else {
        // Crear una nueva opinión
        this.newReview.technicalSupportId = this.technicalSupportId; // Asignar el ID del componente
        try {
          await reviewService.create(this.newReview);
          await this.fetchReviews();
          this.resetForm();
        } catch (error) {
          console.error("Error adding review:", error);
        }
      }
    },

    // Editar una opinión existente
    editReview(review) {
      this.editingReview = review;
      this.newReview = { ...review };
    },

    // Cancelar la edición
    cancelEdit() {
      this.editingReview = null;
      this.resetForm();
    },

    // Eliminar una opinión
    async deleteReview(id) {
      const reviewService = new TechnicalReviewService();
      try {
        await reviewService.delete(id);
        await this.fetchReviews();
      } catch (error) {
        console.error("Error deleting review:", error);
      }
    },

    // Restablecer el formulario de opinión
    resetForm() {
      this.newReview = new TechnicalSupportReview();
    }
  }
}
</script>

<template>
  <div class="review-management">
    <h3>Opinions for Technician ID: {{ technicalSupportId }}</h3>

    <!-- Listado de Opiniones -->
    <div v-if="reviews && reviews.length" class="review-list">
      <div v-for="review in reviews" :key="review.id" class="review-item">
        <p><strong>{{ review.userName }}</strong> (Rating: {{ review.rating }})</p>
        <p>{{ review.comment }}</p>
        <button @click="editReview(review)">Edit</button>
        <button @click="deleteReview(review.id)">Delete</button>
      </div>
    </div>
    <p v-else>No reviews available.</p>

    <!-- Formulario para Crear/Editar Opiniones -->
    <div class="review-form">
      <h4>{{ editingReview ? 'Edit' : 'Add' }} an Opinion</h4>
      <input v-model="newReview.userName" placeholder="Your name" />
      <input v-model.number="newReview.rating" type="number" min="1" max="5" placeholder="Rating (1-5)" />
      <textarea v-model="newReview.comment" placeholder="Write your opinion..."></textarea>
      <button @click="saveReview">{{ editingReview ? 'Update' : 'Submit' }}</button>
      <button v-if="editingReview" @click="cancelEdit">Cancel</button>
    </div>
  </div>
</template>

<style scoped>
.review-management {
  padding: 20px;
  border-radius: 10px;
  background: linear-gradient(145deg, #2c0032, #0f1f3d); /* Degradado púrpura a azul oscuro */
  color: #e0e0e0; /* Texto gris claro para buena legibilidad */
}

.review-management h3, .review-management h4 {
  color: #45CAFF; /* Color azul brillante para los títulos */
}

.review-list {
  margin-bottom: 20px;
}

.review-item {
  padding: 10px;
  border-bottom: 1px solid #45CAFF; /* Borde azul claro para separar cada opinión */
  color: #e0e0e0; /* Texto gris claro */
}

.review-item p {
  margin: 5px 0;
}

/* Botones de Editar y Eliminar */
.review-item button {
  margin-right: 5px;
  padding: 8px 12px;
  background-color: #FF1B6B; /* Fondo fucsia vibrante */
  color: #ffffff; /* Texto blanco */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.review-item button:hover {
  background-color: #ff4796; /* Efecto hover en un tono más claro */
}

/* Formulario para agregar/editar opiniones */
.review-form {
  margin-top: 20px;
}

.review-form h4 {
  color: #45CAFF; /* Color azul para el título del formulario */
}

.review-form input,
.review-form textarea {
  width: 100%;
  margin-bottom: 10px;
  padding: 10px;
  border: 2px solid #45CAFF; /* Borde azul claro */
  border-radius: 5px;
  background-color: #1a1a1a; /* Fondo gris oscuro para los campos */
  color: #e0e0e0; /* Texto gris claro */
}

.review-form input::placeholder,
.review-form textarea::placeholder {
  color: #b3b3b3; /* Placeholder gris más claro */
}

.review-form button {
  margin-right: 5px;
  padding: 10px 20px;
  background-color: #45CAFF; /* Fondo azul claro para destacar el botón */
  color: #1a1a1a; /* Texto oscuro */
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
}

.review-form button:hover {
  background-color: #5fd0ff; /* Hover en un tono de azul más claro */
}

/* Botón de Cancelar (solo visible en modo de edición) */
.review-form button.cancel-button {
  background-color: #333; /* Fondo oscuro para diferenciarlo */
  color: #ffffff; /* Texto blanco */
}

.review-form button.cancel-button:hover {
  background-color: #555; /* Hover más claro */
}
</style>