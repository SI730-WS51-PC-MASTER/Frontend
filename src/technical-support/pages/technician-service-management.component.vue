<script>
import { TechnicianService } from '../services/technician.service.js';
import { Technician } from '../model/technician.entity.js';
import { TechnicalSupportService } from "@/technical-support/services/technical-support.service.js";
import MeetingConfirmComponent from '../components/technician-service-confirmation.component.vue';
import TechnicalReviewManagementComponent from "@/review/components/technical-review-management.component.vue";

export default {
  name: 'GetHardwareGuidance',
  components: {
    MeetingConfirmComponent,
    TechnicalReviewManagementComponent
  },
  data() {
    return {
      technicians: [],
      technicianService: new TechnicianService(),
      technicalSupportService: new TechnicalSupportService(),
      showConfirmPopup: false,
      showGeneralRequestConfirmPopup: false,
      selectedTechnician: null,
      selectedServiceType: 0,
      showReview: false,
      selectedTechnicalId: null,
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
      try {
        // Convertir selectedServiceType a un valor booleano
        const supportTypeBoolean = Boolean(serviceType); // Convierte 1 a true, 0 a false

        // Convertir technician.id a string si no lo es
        const technicianIdString = String(technician.id); // Asegúrate de que sea un string

        // Preparar el technicalSupport para la solicitud
        const technicalSupport = {
          technicianId: technicianIdString, // Usar el technicianId como string
          supportType: supportTypeBoolean, // Aquí se pasa como un valor booleano
          dateOfRequest: new Date().toISOString(), // Fecha de solicitud
          startDate: new Date().toISOString(), // Fecha de inicio
          endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() // Fecha de fin
        };

        console.log('TechnicalSupport:', technicalSupport); // Verifica que el technicalSupport esté correcto

        // Enviar la solicitud a la API para crear la solicitud de soporte técnico
        const response = await this.technicalSupportService.create(technicalSupport);
        console.log('Technical Support Created:', response.data);
        alert(`Technical support request created successfully for ${technician.name}.`);
        this.showConfirmPopup = false; // Cerrar el popup de confirmación

      } catch (error) {
        console.error('Error creating technical support:', error.response ? error.response.data : error.message);
        alert('Failed to create technical support request. Please try again later.');
      }
    },

    openGeneralRequestConfirmPopup(serviceType) {
      this.selectedServiceType = serviceType;
      this.showGeneralRequestConfirmPopup = true; // Open the confirmation popup
    },

    async handleGeneralRequestConfirm() {
      try {
        // Consultar los técnicos disponibles
        const availableTechnicians = this.technicians;

        // Consultar las solicitudes existentes de soporte técnico
        const existingRequests = await this.technicalSupportService.getAll();

        // Verificar que hemos obtenido las solicitudes correctamente
        console.log("Existing requests:", existingRequests.data);

        // Filtrar los técnicos que están actualmente en uso, es decir, aquellos que ya tienen una solicitud activa
        const techniciansInUse = existingRequests.data.map(request => parseInt(request.technicianId)); // Aseguramos que technicianId sea un número entero

        // Verificar los técnicos que están en uso
        console.log("Technicians in use:", techniciansInUse);

        // Filtrar los técnicos disponibles que no están en uso
        const availableTechniciansNotInUse = availableTechnicians.filter(tech => {
          console.log(`Checking if technician ${tech.id} is in use: ${techniciansInUse.includes(tech.id)}`);
          return !techniciansInUse.includes(tech.id); // Comparar como enteros
        });

        // Verificar los técnicos disponibles que no están en uso
        console.log("Available technicians not in use:", availableTechniciansNotInUse);

        // Verificar si no hay técnicos disponibles
        if (availableTechniciansNotInUse.length === 0) {
          alert("Todos los técnicos están ocupados. No se puede crear un nuevo soporte técnico.");
          return; // No se crea una nueva solicitud si no hay técnicos disponibles
        }

        // Seleccionar un técnico aleatorio de los técnicos disponibles no ocupados
        const randomTechnician = availableTechniciansNotInUse[Math.floor(Math.random() * availableTechniciansNotInUse.length)];

        // Convertir selectedServiceType a booleano
        const supportTypeBoolean = Boolean(this.selectedServiceType);

        // Preparar el technical-support
        const technicalSupport = {
          technicianId: String(randomTechnician.id), // ID del técnico como string (en caso de necesitar enviar como string)
          supportType: supportTypeBoolean, // Tipo de soporte como booleano
          dateOfRequest: new Date().toISOString(), // Fecha de solicitud
          startDate: new Date().toISOString(), // Fecha de inicio (hoy)
          endDate: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString() // Fecha de fin (mañana)
        };

        console.log('TechnicalSupport:', technicalSupport); // Verificar el technicalSupport

        // Consultar nuevamente las solicitudes existentes para verificar si no hay conflicto con las fechas
        const updatedRequests = await this.technicalSupportService.getAll();

        // Verificar si ya existe una solicitud con el mismo technicianId y conflicto de fechas
        const conflictRequest = updatedRequests.data.find(request =>
            request.technicianId === technicalSupport.technicianId &&
            new Date(request.endDate) > new Date(technicalSupport.startDate) &&
            new Date(request.startDate) < new Date(technicalSupport.endDate)
        );

        // Si se encuentra una solicitud en conflicto, mostrar mensaje de error
        if (conflictRequest) {
          alert(`El servicio de soporte técnico ya existe para el técnico ${randomTechnician.name} en el rango de fechas especificado.`);
          return;
        }

        // Si no hay conflicto, proceder con la creación del soporte técnico
        const response = await this.technicalSupportService.create(technicalSupport);
        console.log('Technical Support Created:', response.data);

        alert(`La solicitud de soporte técnico se ha creado con éxito para ${randomTechnician.name}.`);
        this.showGeneralRequestConfirmPopup = false; // Cerrar el popup de confirmación

      } catch (error) {
        console.error('Error al crear el soporte técnico:', error);
        alert('No se pudo crear la solicitud de soporte técnico. Error: ' + error.message);
      }
    },

    cancelMeeting() {
      this.showConfirmPopup = false;
      this.showGeneralRequestConfirmPopup = false;
    },
    openReview(technicalSupportId) {
      console.log("Technical support ID in openReview:", technicalSupportId);
      if (technicalSupportId !== undefined && technicalSupportId !== null) {
        this.selectedTechnicalId = technicalSupportId;
        this.showReview = true;
        console.log("selectedTechnicalId:", this.selectedTechnicalId);
      } else {
        console.error("technicalSupportId is undefined in openReview");
      }
    },
    closeReview() {
      this.showReview = false;
      this.selectedTechnicalId = null;
    },
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
            @click="openReview(technician.id)"
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

    <!-- Modal para mostrar las opiniones -->
    <div v-if="showReview" class="modal-overlay" @click.self="closeReview">
      <div class="modal-content">
        <button class="close-button" @click="closeReview">&times;</button>
        <TechnicalReviewManagementComponent :technicalSupportId="selectedTechnicalId" />
      </div>
    </div>
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

/* Estilos para el modal */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.85); /* Fondo más oscuro */
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
}

.modal-content {
  background-color: #1a001f; /* Fondo púrpura oscuro para el modal */
  padding: 20px;
  border-radius: 10px;
  width: 80%;
  max-height: 80%;
  overflow-y: auto;
  position: relative;
  color: #fff; /* Texto en blanco */
  border: 2px solid #e600ac; /* Borde rosa brillante */
}

.close-button {
  position: absolute;
  top: 10px;
  right: 15px;
  background: transparent;
  color: #e600ac; /* Color del botón de cerrar a juego */
  border: none;
  font-size: 30px;
  cursor: pointer;
}

.close-button:hover {
  color: #ff66cc; /* Efecto de hover más claro en el botón de cerrar */
}
</style>
