<script>
import { TechnicianService } from '../services/technician.service.js';
import { Technician } from '../model/technician.entity.js';
import { TechnicalSupportService } from "@/technical-support/services/technical-support.service.js";
import MeetingConfirmComponent from '../components/technician-service-confirmation.component.vue';

export default {
  name: 'GetHardwareGuidance',
  components: {
    MeetingConfirmComponent,
  },
  data() {
    return {
      technicians: [],
      technicianService: new TechnicianService(),
      technicalSupportService: new TechnicalSupportService(),
      showConfirmPopup: false,
      showGeneralRequestConfirmPopup: false,
      selectedTechnician: null,
      selectedServiceType: ""
    };
  },
  async created() {
    try {
      const response = await this.technicianService.getAll();
      console.log('API Response:', response.data);
      this.technicians = response.data
          .map(tech => new Technician(tech))
          .sort((a, b) => b.stars - a.stars)
          .slice(0, 4);
    } catch (error) {
      console.error('Error fetching technicians:', error.response ? error.response.data : error.message);
    }
  },
  methods: {
    openConfirmPopup(technician, serviceType) {
      // Check if technician is available
      if (technician.status) {
        this.selectedTechnician = technician;
        this.selectedServiceType = serviceType;
        this.showConfirmPopup = true;
      }
      else {
        alert(`${technician.name} is currently unavailable.`); // Alert for unavailable technicians
      }
    },
    async handleConfirm({ technician, serviceType }) {
      const supportType = serviceType || "zoom help meeting";
      const newSupport = {
        supportType,
        dateOfRequest: new Date().toISOString(),
        technicianId: technician.id, // Add technicianId here
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString()
      };

      console.log('Data to be sent in POST request:', newSupport);

      try {
        const response = await this.technicalSupportService.create(newSupport);
        console.log('New technical support created:', response.data);
      } catch (error) {
        console.error('Error creating technical support:', error);
      }
      this.showConfirmPopup = false;
    },
    openGeneralRequestConfirmPopup(serviceType) {
      this.selectedServiceType = serviceType;
      this.showGeneralRequestConfirmPopup = true; // Open the confirmation popup
    },
    async handleGeneralRequestConfirm() {
      const newSupport = {
        supportType: this.selectedServiceType,
        dateOfRequest: new Date().toISOString(),
        technicianId: null, // No technician ID for general requests
        startDate: new Date().toISOString(),
        endDate: new Date().toISOString()
      };

      console.log('Data to be sent in POST request for general request:', newSupport);

      try {
        const response = await this.technicalSupportService.create(newSupport);
        console.log('New general support created:', response.data);
      } catch (error) {
        console.error('Error creating general technical support:', error);
      }
      this.showGeneralRequestConfirmPopup = false; // Close the popup after submission
    },
    cancelMeeting() {
      this.showConfirmPopup = false;
      this.showGeneralRequestConfirmPopup = false;
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

    <section class="best-technicians">
      <h2>Best technicians</h2>
      <div class="technician-list">
        <pv-card
            v-for="technician in technicians"
            :key="technician.id"
            class="technician-card"
            :header="technician.name"
        >
          <!-- technician Image -->
          <template #title>
            <img :src="technician.img" alt="technician image" class="technician-image" />
          </template>
          <!-- technician Name & Stars -->
          <template #content>
            <div class="technician-details">
              <label>{{ technician.name }}</label><br>
              <label>{{ technician.stars }} <i class="pi pi-star"></i></label>
            </div>
          </template>
          <!-- Service Buttons -->
          <template #footer>
            <div class="service-buttons">
              <button class="service-button" id="home-service" @click="openConfirmPopup(technician, 'home service')">Home service</button>
              <button class="service-button" id="zoom-help-meeting" @click="openConfirmPopup(technician, 'zoom help meeting')">Zoom meeting</button>
            </div>
            <!-- Centered Status Button -->
            <div class="status-button-container">
              <button class="status-button" :class="{ available: technician.status, unavailable: !technician.status }">
                {{ technician.status ? 'Available' : 'Unavailable' }}
              </button>
            </div>
          </template>
        </pv-card>
      </div>
    </section>

    <MeetingConfirmComponent
        v-if="showConfirmPopup"
        @confirm="handleConfirm"
        @cancel="cancelMeeting"
        :technician="selectedTechnician"
        :serviceType="selectedServiceType"
    />

    <MeetingConfirmComponent
        v-if="showGeneralRequestConfirmPopup"
        @confirm="handleGeneralRequestConfirm"
        @cancel="cancelMeeting"
        :technician="null"
        :serviceType="selectedServiceType"
    />

    <section class="all-technicians">
      <h2>Send request to any <br> Technician</h2>
      <div class="flex-column">
        <button class="service-button" @click="openGeneralRequestConfirmPopup('home service')">Request Home Service</button>
        <button class="service-button" @click="openGeneralRequestConfirmPopup('zoom help meeting')">Request Zoom Meeting</button>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* Container */
.guidance-container {
  background: linear-gradient(to bottom, #2c003e, #000000);
  color: white;
  padding: 20px;
  text-align: center;
  min-height: 100vh;
}

/* Header */
.guidance-header {
  margin-bottom: 20px;
}

.guidance-header h1 {
  margin: 0;
  font-weight: 600;
}

.best-technicians h2 {
  padding-top: 40px;
  color: #FF6B9F;
}

.best-technicians {
  margin: 20px 0;
}

/* technician List: Responsive Flex Layout */
.technician-list {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 20px;
}

/* technician Card */
.technician-card {
  width: 100%;
  max-width: 250px;
  margin: 10px auto;
  padding: 15px;
  border: 1px solid #ffffff80; /* Slightly transparent white */
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.3);
  transition: transform 0.3s ease, box-shadow 0.3s ease;
}

.technician-card:hover {
  transform: translateY(-5px);
  box-shadow: 0 8px 12px rgba(0, 0, 0, 0.5);
}

/* technician Image */
.technician-image {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 2px solid #FF1B6B;
}

/* technician Details */
.technician-details {
  margin-bottom: 10px;
  font-size: 16px;
}

.technician-details label {
  color: #fff;
  display: block;
  font-weight: bold;
  margin: 4px 0;
}

/* Service Buttons */
.service-buttons {
  display: flex;
  justify-content: space-between;
  gap: 10px;
}

.service-button {
  background-color: #FF1B6B;
  border: none;
  color: white;
  padding: 8px 12px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  font-size: 14px;
}

.service-button:hover {
  background-color: #45CAFF;
}

/* Centered Status Button */
.status-button-container {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}

.status-button {
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  width: 100px;
  font-weight: bold;
  font-size: 14px;
  background-color: #D9D9D9;
}

.available {
  color: #45CAFF; /* Blue for available */
}

.unavailable {
  color: #FF6B9F; /* Pink for unavailable */
}

/* Request Section For All technicians */
.all-technicians h2 {
  padding-top: 80px;
  padding-bottom: 10px;
  color: #FF6B9F;
}

.flex-column {
  display: flex;             /* Utiliza flexbox para la disposición */
  flex-direction: column;    /* Coloca los elementos en una columna */
  gap: 10px;                /* Espacio entre los botones */
}

.flex-column .service-button {
  width: 20%;
  padding: 10px;           /* Espaciado interno */
  font-size: 16px;         /* Tamaño de fuente */
  cursor: pointer;         /* Cambia el cursor al pasar por encima */
  background-color: #FF1B6B; /* Color de fondo */
  color: white;            /* Color del texto */
  border: none;            /* Sin borde */
  border-radius: 5px;     /* Bordes redondeados */
  transition: background-color 0.3s; /* Efecto de transición para el fondo */
  align-self: center;
}

.flex-column .service-button:hover {
  background-color: #45CAFF; /* Color al pasar el cursor */
}


/* Responsive Styles */
@media (max-width: 768px) {
  .technician-card {
    width: 80%;
    max-width: none;
  }

  .guidance-header h1 {
    font-size: 24px;
  }

  .guidance-header h2 {
    font-size: 18px;
  }

  .service-button, .status-button {
    padding: 8px;
    font-size: 13px;
  }

  .technician-details {
    font-size: 14px;
  }
}

@media (max-width: 480px) {
  .technician-card {
    width: 90%;
  }

  .guidance-header h1 {
    font-size: 20px;
  }

  .guidance-header h2 {
    font-size: 16px;
  }

  .service-buttons {
    flex-direction: column;
    gap: 5px;
  }
}
</style>
