<!-- technician-service-confirmation.component.vue -->
<template>
  <div>
    <button class="show-modal" @click="showModal = true">Schedule Meeting</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">YOUR REQUEST IS IN PROCESS TO BE SUBMITTED</h3>
        <p class="modal-subtitle">PLEASE SELECT CONFIRM TO CONTINUE</p>
        <div class="modal-buttons">
          <button @click="confirm">Confirm</button>
          <button @click="cancel">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, defineProps, defineEmits } from 'vue';

const showModal = ref(false);
const props = defineProps(['technician', 'serviceType']);
const emit = defineEmits(['confirm', 'cancel']);

const confirm = () => {
  console.log('Meeting confirmed!');
  emit('confirm', { technician: props.technician, serviceType: props.serviceType });
  showModal.value = false;
};

const cancel = () => {
  emit('cancel');
  showModal.value = false;
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  background:
      /*radial-gradient(circle at 30%, rgba(255, 27, 107, 1) 0%, rgba(0, 0, 0, 0) 100%),
      radial-gradient(circle at 20%, rgba(69, 202, 255, 1) 0%, rgba(69, 202, 255, 0) 100%),*/
      #001014;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  width: 300px;
  text-align: center;
}


.modal-title {
  font-size: 18px;
  color: white;
  background-color: transparent;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.modal-subtitle {
  color: white;
  background-color: transparent;
  padding: 5px;
  font-size: 14px;
  border-radius: 5px;
  margin-bottom: 20px;
}

.modal-buttons {
  display: flex; /* Usa flexbox para alinear los botones */
  justify-content: center; /* Centra los botones */
  gap: 15px; /* Espacio entre los botones */
}

.modal-buttons button {
  padding: 12px 24px; /* Aumentar padding para agrandar los botones */
  font-size: 1rem; /* Aumentar tamaño de fuente de los botones */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados para los botones */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Añadir transición para efecto al pasar el ratón */
}

.modal-buttons button:hover {
  background-color: #007bff; /* Color de fondo al pasar el ratón */
  color: white; /* Cambia el color del texto al pasar el ratón */
}

.show-modal {
  margin-top: 20px;
  padding: 12px 24px; /* Aumentar padding para agrandar los botones */
  font-size: 1rem; /* Aumentar tamaño de fuente de los botones */
  border: none; /* Sin borde */
  border-radius: 5px; /* Bordes redondeados para los botones */
  cursor: pointer; /* Cambia el cursor al pasar sobre el botón */
  transition: background-color 0.3s; /* Añadir transición para efecto al pasar el ratón */
}

.show-modal:hover {
  background-color: #007bff; /* Color de fondo al pasar el ratón */
  color: white; /* Cambia el color del texto al pasar el ratón */
}

</style>
