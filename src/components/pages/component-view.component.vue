<script>
import ComponentList from "../components/component-list.component.vue";
import {ComponentService} from "@/components/services/component.service.js"; // Ajusta la ruta según sea necesario
import WishlistAddAndRemoveComponent from "@/wishlist/components/wishlist-add-and-remove.component.vue";
import { WishlistService } from "@/wishlist/services/wishlist.service.js";
import ComponentReviewManagement from "@/review/components/component-review-management.component.vue";

// Shopping cart
import AddCartButton from "@/orders/components/add-cart-button.vue";
import { cartService } from "@/orders/services/cart.service.js";
import { Cart } from "@/orders/model/cart.entity.js";
import {Wishlist} from "@/wishlist/model/wishlist.entity.js";

export default {
  name: "AllComponents",
  components: {ComponentReviewManagement, WishlistAddAndRemoveComponent, ComponentList, AddCartButton },
  data() {
    return {
      components: [ComponentList, WishlistAddAndRemoveComponent, ComponentReviewManagement], //Cambien el nombre de esto en lo que lo usan porque se confunde el código a veces xdxdxdxdd
      searchQuery: '',
      //filteredComponents: [],
      selectedCountry: '',
      selectedCategory: '',
      selectedCategoryType: '',
      selectedCategorySubType: '',
      selectedCategoryBrand: '',
      minPrice: 0,
      maxPrice: 10000,
      wishlist: [],
      showReview: false,
      quantity: 1,
      selectedComponentId: null,

      //Cart service
      cartsApi: new cartService(),
      newCart: new Cart({}),

      //Wishlist service
      wishlistService: new WishlistService(),
      newWishlistProduct: new Wishlist({}),
      quantityMap: {}, // Mapa de cantidades { [componentId]: cantidad },
    };
  },
  created() {
    this.loadComponents();
    //this.loadWishlist();
  },
  computed: {
    filteredComponents() {
      //console.log("Componentes iniciales:", this.components);
      const result = this.components.filter((component) => {
        const matchesName = component.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        //console.log("matchesName:", matchesName, "para", component.name);
        const matchesPrice =
            (!this.minPrice || component.price >= this.minPrice) && (!this.maxPrice || component.price <= this.maxPrice);
        //console.log("matchesPrice:", matchesPrice, "para", component.price);
        const matchesCountry = !this.selectedCountry || component.country === this.selectedCountry;
        //console.log("matchesCountry:", matchesCountry, "para", component.country);
        const matchesCategoryType = !this.selectedCategoryType || component.category_type === this.selectedCategoryType;
        const matchesCategorySubType = !this.selectedCategorySubType || component.category_subType === this.selectedCategorySubType;
        const matchesCategoryBrand = !this.selectedCategoryBrand || component.category_brand === this.selectedCategoryBrand;
        return matchesName && matchesPrice && matchesCountry && matchesCategoryType && matchesCategorySubType && matchesCategoryBrand;
      });
      //console.log("Componentes filtrados:", result);
      return result;
    }
  },
  methods: {
    sortByPriceAsc() {
      this.components.sort((a, b) => a.price - b.price);
    },
    sortByPriceDesc() {
      this.components.sort((a, b) => b.price - a.price);
    },
    sortByRatingAsc() {
      this.components.sort((a, b) => a.ratings - b.ratings);
    },
    sortByRatingDesc() {
      this.components.sort((a, b) => b.ratings - a.ratings);
    },
    filterByPrice() {
      // Lógica de filtrado de precios
      this.filteredComponents = this.components.filter(component => {
        const price = component.price;
        return (
            (this.minPrice === null || price >= this.minPrice) &&
            (this.maxPrice === null || price <= this.maxPrice)
        );
      });
    },
    /*
    filterByCategory(technicalSupport) {
      console.log("Categoría seleccionada:", technicalSupport);
      this.selectedCategory = technicalSupport;
      this.applyFilters();
    },
    filterByType(type) {
      console.log("Tipo seleccionado:", type);
      this.selectedType = type;
      this.applyFilters();
    },
    applyFilters() {
      this.filteredComponents = this.components.filter(component => {
        const matchesCategory = this.selectedCategory ? component.technicalSupports.type === this.selectedCategory : true;
        const matchesType = this.selectedType ? component.technicalSupports.subType === this.selectedType : true;
        return matchesCategory && matchesType;
      });
    },*/
    loadComponents() {
      const componentService = new ComponentService();
      componentService
          .getAll()
          .then((response) => {
            console.log("Componentes recibidos:", response.data);
            this.components = response.data;
            console.log("Componentes iniciales después de la asignación:", this.components);
          })
          .catch((error) => {
            console.error("Error al obtener los componentes:", error);
            this.components = [];
          });
    },
    openReview(componentId) {
      console.log("Component ID in openReview:", componentId);
      if (componentId !== undefined && componentId !== null) {
        this.selectedComponentId = componentId;
        this.showReview = true;
        console.log("selectedComponentId:", this.selectedComponentId);
      } else {
        console.error("component_id is undefined in openReview");
      }
    },
    closeReview() {
      this.showReview = false;
      this.selectedComponentId = null;
    },
    loadWishlist() {
      const wishlistService = new WishlistService(); // Crear nueva instancia del servicio
      wishlistService.getAll().then((response) => {
        this.wishlist = response.data;
      }).catch((error) => {
        console.error("Error loading wishlist:", error);
      });
    },
    async addToWishlist(compId) {
      const quantity = this.quantityMap[compId] || 1; // Por defecto 1 si no se ha definido cantidad

      if (quantity < 1) {
        alert("La cantidad debe ser al menos 1.");
        return;
      }

      // Datos completos que se enviarán al backend
      const wishlistProduct = {
        userId: this.cartsApi.getUserContext(), // Obtiene el userId del contexto
        componentId: compId, // ID del componente
        quantity, // Cantidad seleccionada
      };

      // Llamar al servicio para añadir a la wishlist
      const wishlistService = new WishlistService();
      wishlistService.create(wishlistProduct)
          .then(() => {
            alert(`Producto con ID ${compId} añadido a la wishlist con cantidad ${quantity}`);
            this.$emit("wishlist-updated"); // Notifica al padre para actualizar la lista
          })
          .catch((error) => {
            console.error("Error al añadir a la wishlist:", error);
          });
    },
    mounted() {
      this.filteredComponents = this.components;
      /*this.loadComponents();*/
      this.fetchComponents();
      console.log(this.filteredComponents);
    },
    watch: {
      minPrice: 'filterByPrice',
      maxPrice: 'filterByPrice',
    },
    //Add component in shopping cart
    async submitShoppingCart(compId) {

      if (compId == null) {
        console.error('Error getting componentId')

      } else {

        this.newCart = new Cart({
          componentId: compId,
          userId: this.cartsApi.getUserContext(), quantity: 1
        });

        try {
          this.cartsApi.create(this.newCart).then((response) => {
            console.log("Product added to cart", compId);
          })
        } catch (error) {
          console.error('Error en carrito de compras')
        }
      }
    },
    fetchComponents() {
      const componentService = new ComponentService();
      componentService
          .getAll()
          .then((data) => {
            console.log("Datos recibidos del servicio:", data);
            this.components = data;
          })
          .catch((error) => {
            console.error("Error al obtener los componentes:", error);
          });
    },
  },
};
</script>

<template>
  <div class="container">
    <!-- Contenedor para las secciones de filtros -->
    <div class="filter-and-components">
      <!-- Sección de filtros -->
      <div class="filter-section">
        <h2>Find a component</h2>
        <div class="search-bar">
          <input
              type="text"
              v-model="searchQuery"
              placeholder="Buscar componentes..."
          />
        </div>
        <h2>Choose your options</h2>
        <div class="filter-options">
          <label for="price">Precio</label>
          <input type="number" v-model="minPrice" placeholder="Mínimo" />
          <input type="number" v-model="maxPrice" placeholder="Máximo" />

          <label for="country">País</label>
          <select v-model="selectedCountry">
            <option value="">Todos</option>
            <option value="Estados Unidos">Estados Unidos</option>
            <option value="Taiwan">Taiwan</option>
            <option value="South Korea">Corea del Sur</option>
            <option value="Japan">Japón</option>
            <option value="Netherlands">Países Bajos</option>
          </select>

          <div class="filter-options">
            <label for="categoryType">Tipo</label>
            <select v-model="selectedCategoryType">
              <option value="">Todos</option>
              <option value="Tablets">Tabletas</option>
              <option value="Smartphones">Smartphones</option>
              <option value="Wearables">Wearables</option>
              <option value="Audio">Audio</option>
              <option value="Smart Home">Hogar inteligente</option>
            </select>

            <label for="categorySubType">SubTipo</label>
            <select v-model="selectedCategorySubType">
              <option value="">Todos</option>
              <option value="iPad">iPad</option>
              <option value="5G">5G</option>
              <option value="Noise Cancelling">Cancelación de Ruido</option>
              <option value="Portable Speaker">Altavoz Portátil</option>
              <option value="Smart Bulb">Bombilla Inteligente</option>
            </select>

            <label for="categoryBrand">Marca</label>
            <select v-model="selectedCategoryBrand">
              <option value="">Todas</option>
              <option value="Apple">Apple</option>
              <option value="Samsung">Samsung</option>
              <option value="Sony">Sony</option>
              <option value="JBL">JBL</option>
              <option value="Philips">Philips</option>
            </select>
          </div>
        </div>
      </div>
    </div>

    <!-- Sección de componentes -->
    <div class="component-section">
      <h2>Enumerate by</h2>
      <div class="sort-buttons">
        <button @click="sortByPriceAsc">Lower Price</button>
        <button @click="sortByPriceDesc">Higher Price</button>
        <button @click="sortByRatingAsc">Less stars</button>
        <button @click="sortByRatingDesc">More stars</button>
      </div>
      <div class="component-list" :components="filteredComponents" @review="openReview">
        <div
            class="component-card"
            v-for="component in filteredComponents"
            :key="component.componentId">
          <img
              v-if="component.image"
              :src="component.image"
              alt="Component image"
              class="component-image"
              @click="openReview(component.componentId)"
          />
          <div class="component-info">
            <h3 class="component-title">{{ component.name }}</h3>
            <p class="component-price">${{ component.price }}.00</p>
            <!-- Cantidad específica para cada componente
            <input
                type="number"
                v-model="quantityMap[component.componentId]"
                min="1"
                placeholder="Cantidad"
            />
            <button @click="addToWishlist(component.componentId)">
              Add to Wishlist
            </button>-->
            <div class="input-button-container">
              <!-- Input para cantidad -->
              <input
                  type="number"
                  v-model="quantityMap[component.componentId]"
                  min="1"
                  placeholder="Cantidad"
                  class="styled-input"
              />

              <!-- Botón para añadir a la lista de deseos -->
              <button
                  @click="addToWishlist(component.componentId)"
                  class="styled-button"
              >
                Add to Wishlist
              </button>
            </div>
            <div class="component-rating">
              <span v-for="n in 5" :key="n" class="star">
                <i :class="n <= (component.ratings >= 0 ? Math.min(component.ratings, 5) : 0) ? 'filled-star' : 'empty-star'">★</i>
              </span>
            </div>
            <p v-if="component.stock > 10" class="available component-status">Available</p>
            <p v-else-if="component.stock > 0" class="short component-status">Short</p>
            <p v-else class="unavailable component-status">Unavailable</p>
            <add-cart-button @button-click="submitShoppingCart(component.componentId)"></add-cart-button>
            </div>
          </div>
        </div>
      </div>
    </div>

  <!-- Modal para mostrar las opiniones -->
  <div v-if="showReview" class="modal-overlay" @click.self="closeReview">
    <div class="modal-content">
      <button class="close-button" @click="closeReview">&times;</button>
      <ComponentReviewManagement :component-id="selectedComponentId"/>
    </div>
  </div>
</template>

<style scoped>
.container {
  display: flex; /* Espacio entre ambas secciones */
  align-items: flex-start; /* Alinea ambas secciones en la parte superior */
  padding: 20px;
  gap: 10px;
  border: none;
  box-sizing: border-box;
}

.filter-and-components {
  display: flex;
  justify-content: space-between;
  width: 100%;
  border: none;
  box-sizing: border-box;
}

.filter-section {
  width: 49%; /* Ambas secciones ocupan casi la mitad del ancho */
  background: linear-gradient(145deg, #FF1B6B4D 30%, #45CAFF33 70%);
  border-radius: 15px;
  box-sizing: border-box;
  border: none;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.component-section {
  flex-grow: 1; /* Permite que la sección de componentes crezca dentro de un rango controlado */
  max-width: 600px;
  width: 49%;
  box-sizing: border-box;
  border: none;
  display: flex;
  flex-direction: column; /* Para que la lista de componentes y las opciones de sort se apilen verticalmente */
}

.component-section h2 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
  border: none;
}

/* Aseguramos que los elementos dentro de la sección de filtros no se desborden */
.filter-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
  overflow-y: auto; /* Permite desplazarse si hay muchos filtros */
  border: none;
  box-sizing: border-box;
}
.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
  width: 100%; /* Asegura que ocupe todo el ancho disponible en su contenedor */
  max-width: 400px; /* Máximo ancho, puedes ajustarlo según sea necesario */
  box-sizing: border-box; /* Asegura que el padding no aumente el tamaño total */
}

.search-bar input {
  border: none;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
  box-sizing: border-box; /* Para evitar que el padding cambie el tamaño */
}

.sort-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

/* Estilos adicionales */
.component-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
  box-sizing: border-box;
  border: none;
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
  color: #e600ac;
  border: none;
  font-size: 30px;
  cursor: pointer;
}

.close-button:hover {
  color: #ff66cc;
}

/* Estilo del input */
.styled-input {
  padding: 10px;
  border: 2px solid #f08080;
  border-radius: 8px;
  outline: none;
  font-size: 15px;
  color: #000000;
  background-color: #f08080;
  transition: border-color 0.3s ease;
}

.styled-input:focus {
  border-color: #d06060;
}

/* Estilo del botón */
.styled-button {
  padding: 10px 20px;
  background-color: #f08080;
  color: #5a1a1a;
  border: none;
  border-radius: 8px;
  font-size: 14px;
  cursor: pointer;
  transition: background-color 0.3s ease, transform 0.2s ease;
}

/* Hover y active para el botón */
.styled-button:hover {
  background-color: #d06060; /* Color más oscuro al pasar el mouse */
}

.styled-button:active {
  transform: scale(0.95); /* Reducir tamaño al hacer clic */
}
</style>
