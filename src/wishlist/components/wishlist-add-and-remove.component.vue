<script>
import CreateAndEdit from '../../shared/components/create-and-edit.component.vue';

export default {
  name: "WishlistAddAndRemoveComponent",
  components: {
    CreateAndEdit,
  },
  props: {
    component: {
      type: Object,
      required: true,
    },
    wishlist: {
      type: Array,
      required: true,
    },
  },
  data() {
    return {
      showEditDialog: false,
    };
  },
  computed: {
    isInWishlist() {
      return this.wishlist.some((item) => item.id === this.component.id);
    },
  },
  methods: {
    toggleWishlist() {
      if (this.isInWishlist) {
        this.$emit("remove-from-wishlist", this.component);
      } else {
        this.$emit("add-to-wishlist", this.component);
      }
    },
    updateQuantity(amount) {
      if (this.component.quantity + amount > 0) {
        this.component.quantity += amount;
        this.$emit("update-quantity", this.component);
      } else {
        this.component.quantity = 1;
      }
    },
    openEditDialog() {
      this.showEditDialog = true;
    },
    onEditSave(updatedEntity) {
      this.showEditDialog = false;
      // Aquí puedes manejar la lógica para actualizar la entidad según tus necesidades
      console.log('Guardado', updatedEntity);
    },
    onCancelEdit() {
      this.showEditDialog = false;
    },
  },
};
</script>

<template>
  <div class="component-card">
    <button @click="toggleWishlist" class="addButton">
      {{ isInWishlist ? 'Remove' : 'Add to Wishlist' }}
    </button>
    <div class="quantity">
      <button @click="updateQuantity(-1)">-</button>
      <span>{{ component.quantity }} Units</span>
      <button @click="updateQuantity(1)">+</button>
    </div>

    <CreateAndEdit
        :entity="component"
        :entityName="'Component'"
        :edit="true"
        :visible="showEditDialog"
        @saved="onEditSave"
        @canceled="onCancelEdit"
    />
  </div>
</template>

<style scoped>
.component-card {
  width: 250px;
  height: auto;
  padding: 10px;
  margin: 10px;
  display: flex;
  box-shadow: none;
}
.quantity {
  display: flex;
  align-items: center;
  margin-top: 8px;
}
.quantity button {
  background-color: #ff4081;
  border: none;
  color: white;
  padding: 4px 8px;
}

.addButton {
  background-color: transparent;
  border: 1px solid #ff0077;
  border-radius: 10px;
  color: #ff0077;
  padding: 5px 10px;
}
</style>
