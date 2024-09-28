<script>
export default {
  name: "toolbar"
}
</script>

<template>
  <div class="toolbar">
    <div class="toolbar-section">
      <img src="@/assets/icons/settings.png" alt="Settings" class="toolbar-icon" />
      <img src="@/assets/icons/announcements.png" alt="Announcements" class="toolbar-icon" />
      <img src="@/assets/icons/translation.png" alt="Translation" class="toolbar-icon" />
      <img src="@/assets/icons/lista-deseos.png" alt="ListaDeseos" class="toolbar-icon" />
    </div>
    <div class="toolbar-section user">
      <img src="@/assets/icons/user.png" alt="User" class="toolbar-icon" />
    </div>
  </div>
</template>

<style scoped>
.toolbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #800040;
  padding: 10px 20px;
}

.toolbar-section {
  display: flex;
  align-items: center;
}

.toolbar-icon {
  margin: 0 10px;
  height: 30px; /* Ajusta el tamaño según sea necesario */
  cursor: pointer;
}

.user .toolbar-icon {
  margin-left: auto; /* Alinea el ícono de usuario a la derecha */
}
</style>