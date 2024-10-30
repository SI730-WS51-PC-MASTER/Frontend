<script>
import CreateAndEdit from "../../shared/components/create-and-edit.component.vue";

export default {
  name: "technical-support-item-create-and-edit-dialog",
  components: {CreateAndEdit},
  props: {
    item: null,
    visible: Boolean
  },
  data() {
    return {
      submitted: false
    }
  },
  methods: {
    onCancelRequested() {
      this.$emit('cancel-requested');
    },
    onSaveRequested() {
      this.submitted = true;
      this.$emit('save-requested', this.item);
    }
  }
}
</script>

<template>
  <create-and-edit
      :entity="item"
      :visible="visible"
      entity-name="TechnicalSupport"
      @cancel-requested="onCancelRequested"
      @save-requested="onSaveRequested">
    <template #content>
      <div class="p-fluid">
        <!-- Campo para la fecha de inicio -->
        <div class="field mt-5">
          <pv-float-label>
            <label for="startDate">Start Date</label>
            <pv-date-picker
                id="startDate"
                v-model="item.startDate"
                :class="{ 'p-invalid': submitted && !item.startDate }"
            />
          </pv-float-label>
        </div>

        <!-- Campo para la fecha de fin -->
        <div class="field mt-5">
          <pv-float-label>
            <label for="endDate">End Date</label>
            <pv-date-picker
                id="endDate"
                v-model="item.endDate"
                :class="{ 'p-invalid': submitted && !item.endDate }"
            />
          </pv-float-label>
        </div>
      </div>
    </template>
  </create-and-edit>
</template>


<style scoped>

</style>