<script>
import { TechnicianService } from '../services/technician.service.js';
import { Technician } from '../model/technician.entity.js';
import MeetingConfirmComponent from '../components/meeting-confirm-component.vue'; // Import the confirmation component

export default {
  name: 'GetHardwareGuidance',
  components: {
    MeetingConfirmComponent // Register the component
  },
  data() {
    return {
      advisors: [], // Initialize advisors as an empty array
      technicianService: new TechnicianService(), // Create an instance
      showConfirmPopup: false, // Control the visibility of the confirmation popup
      selectedAdvisor: null // Store the selected advisor for confirmation
    };
  },
  async created() {
    try {
      const response = await this.technicianService.getAll(); // Fetch technicians
      console.log('API Response:', response.data); // Log the response
      // Sort by stars in descending order and take the first 4 advisors
      this.advisors = response.data
          .map(tech => new Technician(tech)) // Map to Technician model
          .sort((a, b) => b.stars - a.stars) // Sort by stars in descending order
          .slice(0, 4); // Take only the first 4 advisors
    } catch (error) {
      console.error('Error fetching technicians:', error.response ? error.response.data : error.message);
    }
  },
  methods: {
    openConfirmPopup(advisor) {
      this.selectedAdvisor = advisor; // Set the selected advisor
      this.showConfirmPopup = true; // Show the confirmation popup
    },
    confirmMeeting() {
      // Handle the confirmation logic for the meeting here
      console.log(`Meeting scheduled with ${this.selectedAdvisor.name}`);
      this.showConfirmPopup = false; // Close the popup
    },
    cancelMeeting() {
      this.showConfirmPopup = false; // Just close the popup
    }
  }
};
</script>

<template>
  <div class="guidance-container">
    <header class="guidance-header">
      <h1>Welcome</h1>
      <h2>Get Hardware Guidance</h2>
    </header>

    <section class="best-advisors">
      <h3>Best Advisors</h3>
      <div class="advisor-list">
        <Card
            v-for="advisor in advisors"
            :key="advisor.id"
            class="advisor-card"
            :header="advisor.name"
        >

          <img :src="advisor.img" alt="advisor image" class="advisor-image" />

          <div class="advisor-details">
            <label>{{ advisor.name }}</label><br>
            <label>{{ advisor.stars }} <i class="pi pi-star"></i></label>
          </div>
          <div class="service-buttons">
            <button class="service-button">Home service</button>
            <button class="service-button" @click="openConfirmPopup(advisor)">Zoom meeting</button> <!-- Trigger the popup -->
          </div>
          <!-- Centered Status Button -->
          <div class="status-button-container">
            <button class="status-button" :class="{ available: advisor.status, unavailable: !advisor.status }">
              {{ advisor.status ? 'Available' : 'Unavailable' }}
            </button>
          </div>
        </Card>
      </div>
    </section>

    <!-- Confirmation Popup -->
    <MeetingConfirmComponent
        v-if="showConfirmPopup"
        @confirm="confirmMeeting"
        @cancel="cancelMeeting"
        :advisor="selectedAdvisor"
    />
  </div>
</template>

<style scoped>
.guidance-container {
  background: linear-gradient(to bottom, #2c003e, #000000);
  color: white;
  padding: 20px;
  text-align: center;
}

.guidance-header {
  margin-bottom: 20px;
}

.best-advisors {
  margin: 20px 0;
}

.advisor-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
}

.advisor-card {
  width: 200px;
  margin: 10px;
  padding: 15px;
  border: 1px solid white;
}

.advisor-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
}

.advisor-details {
  margin-bottom: 10px;
}

.service-buttons {
  display: flex;
  justify-content: space-between;
}

/* Service button styles */
.service-button,
.request-button {
  background-color: #FF1B6B;
  border: none;
  color: white;
  padding: 10px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.service-button:hover,
.request-button:hover {
  background-color: #45CAFF;
}

/* Centered Status Button */
.status-button-container {
  display: flex;
  justify-content: center; /* Center the button horizontally */
  margin-top: 10px; /* Space above the button */
}

.status-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px; /* Fixed width for uniformity */
  font-weight: bold;
  font-size: 14px;
  background-color: #D9D9D9;
}

.available {
  color: #FF6B9F; /* Green for available */
}

.unavailable {
  color: #45CAFF; /* Red for unavailable */
}

label {
  background-color: transparent; /* Ensure labels are white for contrast */
  color: white;
  font-weight: bold; /* Make labels bold for visibility */
  font-size: 14px; /* Increase font size for better readability */
  display: block; /* Make labels block elements */

}
</style>
