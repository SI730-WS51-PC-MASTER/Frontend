<!-- meeting-confirm-component.vue -->
<template>
  <div>
    <button @click="showModal = true">Schedule Meeting</button>

    <div v-if="showModal" class="modal-overlay">
      <div class="modal-content">
        <h3 class="modal-title">YOUR REQUEST HAS BEEN SUBMITTED</h3>
        <p class="modal-subtitle">TAKE A BREATH, A TECHNICIAN WILL ATTEND YOU</p>
        <div class="modal-buttons">
          <button @click="confirmMeeting">Confirm</button>
          <button @click="showModal = false">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';

const showModal = ref(false);

const confirmMeeting = () => {
  // Handle the confirmation logic here
  console.log('Meeting confirmed!');
  showModal.value = false; // Close the modal after confirmation
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
</style>
