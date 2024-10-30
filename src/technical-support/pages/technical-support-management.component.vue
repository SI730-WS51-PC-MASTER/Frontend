<script>
import { TechnicalSupport } from "@/technical-support/model/technical-support.entity.js";
import { TechnicalSupportService } from "@/technical-support/services/technical-support.service.js";
import DataManager from "../../shared/components/data-manager.component.vue";
import TechnicalSupportItemCreateAndEditDialog from "../components/technical-support-edit-and-view.component.vue";

export default {
  name: "technical-support-management",
  components: {TechnicalSupportItemCreateAndEditDialog, DataManager},
  data() {
    return {
      title: {singular: "TechnicalSupport", plural: "Technical Support Services"},
      technicalSupports: [],
      technicalSupport: new TechnicalSupport({}),
      selectedTechnicalSupports: [],
      technicalSupportService: null,
      createAndEditDialogIsVisible: false,
      isEdit: false,
      submitted: false,
    }
  },
  methods: {
    notifySuccessfulAction(message) {
      this.$toast.add({severity: 'success', summary: 'Success', detail: message, life: 3000});
    },
    formatDate(dateString) {
      return new Date(dateString).toLocaleDateString("es-ES", {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric'
      });
    },
    findIndexById(id) {
      return this.technicalSupports.findIndex(technicalSupport => technicalSupport.id === id);
    },
    onNewItem() {
      this.technicalSupport = new TechnicalSupport({});
      this.isEdit = false;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
      console.log(this.createAndEditDialogIsVisible);
    },
    onEditItem(item) {
      this.technicalSupport = new TechnicalSupport(item);
      this.isEdit = true;
      this.submitted = false;
      this.createAndEditDialogIsVisible = true;
    },
    onDeleteItem(item) {
      this.technicalSupport = {...item};
      this.deleteTechnicalSupport();
    },
    onDeleteSelectedItems(selectedItems) {
      this.selectedTechnicalSupports = selectedItems;
      this.deleteSelectedTechnicalSupport();
    },
    onCancelRequested() {
      this.createAndEditDialogIsVisible = false;
      this.submitted = false;
      this.isEdit = false;
    },
    onSaveRequested(item) {
      if (this.submitted) return;  // Prevent duplicate submissions

      if (this.technicalSupport.startDate && this.technicalSupport.endDate) {
        this.submitted = true;  // Set submitted to true before any save action
        if (item.id) {
          this.updateTechnicalSupport();
        } else {
          this.createTechnicalSupport();
        }
        this.createAndEditDialogIsVisible = false;
      }
    },

    createTechnicalSupport() {
      this.technicalSupportService.create(this.technicalSupport).then(response => {
        let technicalSupport = new TechnicalSupport(response.data);
        this.technicalSupports.push(technicalSupport);
        this.notifySuccessfulAction("Technical Support Created");
        this.submitted = false;  // Reset after operation completes
      }).catch(error => {
        console.error(error);
        this.submitted = false;  // Reset in case of error
      });
    },

    updateTechnicalSupport() {
      this.technicalSupportService.update(this.technicalSupport.id, this.technicalSupport).then(response => {
        let index = this.findIndexById(this.technicalSupport.id);
        this.technicalSupports[index] = new TechnicalSupport(response.data);
        this.notifySuccessfulAction("Technical Support Updated");
        this.submitted = false;  // Reset after operation completes
      }).catch(error => {
        console.error(error);
        this.submitted = false;  // Reset in case of error
      });
    },

    deleteTechnicalSupport() {
      this.technicalSupportService.delete(this.technicalSupport.id).then(() => {
        let index = this.findIndexById(this.technicalSupport.id);
        this.technicalSupports.splice(index, 1);
        this.notifySuccessfulAction("Technical Support Deleted");
      }).catch(error => console.error(error));
    },
    deleteSelectedTechnicalSupport() {
      // Confirm deletion once
      if (confirm("Are you sure you want to delete the selected TechnicalSupports?")) {
        // Delete each selected item
        this.selectedTechnicalSupports.forEach((technicalSupport) => {
          this.technicalSupportService.delete(technicalSupport.id)
              .then(() => {
                // Update the technicalSupports list after each deletion
                this.technicalSupports = this.technicalSupports.filter(t => t.id !== technicalSupport.id);
              })
              .catch(error => console.error(error));
        });
        // Show notification once after all deletions
        this.notifySuccessfulAction("Technical Supports Deleted");
      }
    }
  },
  created() {
    this.technicalSupportService = new TechnicalSupportService();
    this.technicalSupportService.getAll().then(response => {
      this.technicalSupports = response.data.map(technicalSupport => new TechnicalSupport(technicalSupport));
      console.log(this.technicalSupports);
    }).catch(error => console.error(error));
  }
}
</script>

<template>
  <div class="w-full">
    <data-manager :title=title
                  v-bind:items="technicalSupports"
                  v-on:new-item-requested="onNewItem"
                  v-on:edit-item-requested="onEditItem($event)"
                  v-on:delete-item-requested="onDeleteItem($event)"
                  v-on:delete-selected-items-requested="onDeleteSelectedItems($event)">
      <template #custom-columns>
        <!--technicalSupport.id-->
        <pv-column :sortable="true" field="id" header="ID" style="min-width: 12rem"/>
        <!--technicalSupport.supportType-->
        <pv-column :sortable="true" field="supportType" header="Service" style="min-width: 12rem"/>
        <!--technicalSupport.startDate-->
        <pv-column :sortable="true" field="startDate" header="Start Date" style="min-width: 12rem">
          <template #body="slotProps">{{ formatDate(slotProps.data.startDate) }}</template>
        </pv-column>
        <!--technicalSupport.endDate-->
        <pv-column :sortable="true" field="endDate" header="End Date" style="min-width: 12rem">
          <template #body="slotProps">{{ formatDate(slotProps.data.endDate) }}</template>
        </pv-column>
        <!--technicalSupport.dateOfRequest-->
        <pv-column :sortable="true" field="dateOfRequest" header="Request Date" style="min-width: 12rem">
          <template #body="slotProps">{{ formatDate(slotProps.data.dateOfRequest) }}</template>
        </pv-column>
        <!--technicalSupport.technicianId-->
        <pv-column :sortable="true" field="technicianId" header="Technician ID" style="min-width: 12rem"/>
        <!--technicianName-->
        <!-- -->
      </template>

    </data-manager>
    <technical-support-item-create-and-edit-dialog
        :edit="isEdit"
        :item="technicalSupport"
        :visible="createAndEditDialogIsVisible"
        v-on:cancel-requested="onCancelRequested"
        v-on:save-requested="onSaveRequested($event)"/>
  </div>
</template>

<style scoped>

</style>