<script>
import ComponentList from "../components/component-list.component.vue";
import {ComponentService} from "@/components/services/component.service.js"; // Ajusta la ruta según sea necesario
import WishlistAddAndRemoveComponent from "@/wishlist/components/wishlist-add-and-remove.component.vue";
import { WishlistService } from "@/wishlist/services/wishlist.service.js";

// Shopping cart
import AddCartButton from "@/orders/components/add-cart-button.vue";
import { cartService } from "@/orders/services/cart.service.js";
import { Cart } from "@/orders/model/cart.entity.js";

export default {
  name: "AllComponents",
  components: {WishlistAddAndRemoveComponent, ComponentList, AddCartButton },
  data() {
    return {
      components: [ComponentList, WishlistAddAndRemoveComponent],
      searchQuery: '',
      filteredComponents: [],
      selectedCountry: '',
      selectedCategory: '',
      minPrice: null,
      maxPrice: null,
      wishlist: [],

      //Cart service
      cartsApi: new cartService(),
      newCart: new Cart({}),
    };
  },
  created() {
    const componentService = new ComponentService();
    componentService.getAll().then(response => {
      this.components = response.data;
      this.filteredComponents = this.components; // Inicialmente, mostrar todos los componentes
      console.log("Response from JSON server:", response.data);
      this.filteredComponents = this.components;
    });
    this.loadWishlist();
  },
  computed: {
    filteredComponents() {
      return this.components.filter(component => {
        const matchesName = component.name.toLowerCase().includes(this.searchQuery.toLowerCase());
        const matchesPrice = (!this.minPrice || component.price >= this.minPrice) &&
            (!this.maxPrice || component.price <= this.maxPrice);
        const matchesCountry = !this.selectedCountry || component.country === this.selectedCountry;
        //const matchesCategory = this.selectedCategory ? component.categories.type === this.selectedCategory : true;
        //const matchesType = this.selectedType ? component.categories.subType === this.selectedType : true;
        return /*matchesCategory && matchesType &&*/ matchesName && matchesPrice && matchesCountry;
      });
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
    },/*
    filterByCategory(category) {
      console.log("Categoría seleccionada:", category);
      this.selectedCategory = category;
      this.applyFilters();
    },
    filterByType(type) {
      console.log("Tipo seleccionado:", type);
      this.selectedType = type;
      this.applyFilters();
    },
    applyFilters() {
      this.filteredComponents = this.components.filter(component => {
        const matchesCategory = this.selectedCategory ? component.categories.type === this.selectedCategory : true;
        const matchesType = this.selectedType ? component.categories.subType === this.selectedType : true;
        return matchesCategory && matchesType;
      });
    },
    loadComponents() {
      fetch('http://localhost:3000/components')
          .then(response => response.json())
          .then(data => {
            this.components = data.components;
            this.filteredComponents = data.components; // Mostrar todos al principio
          })
          .catch(error => {
            console.error("Error cargando los componentes:", error);
          });
    }*/
    loadWishlist() {
      const wishlistService = new WishlistService(); // Crear nueva instancia del servicio
      wishlistService.getAll().then((response) => {
        this.wishlist = response.data;
      }).catch((error) => {
        console.error("Error loading wishlist:", error);
      });
    },
    addToWishlist(product) {
      const wishlistService = new WishlistService(); // Crear nueva instancia del servicio
      const existsInWishlist = this.wishlist.some((item) => item.id === product.id);

      if (!existsInWishlist) {
        wishlistService.create(product).then((response) => {
          this.wishlist.push(response.data);
          console.log("Product added to wish list:", response.data);
        }).catch((error) => {
          console.error("Error adding to wishlist:", error);
        });
      }
    },
    removeFromWishlist(product) {
      const wishlistService = new WishlistService(); // Crear nueva instancia del servicio
      wishlistService.delete(product.id).then(() => {
        this.wishlist = this.wishlist.filter((item) => item.id !== product.id);
        console.log("Product removed from wishlist");
      }).catch((error) => {
        console.error("Error removing from wishlist:", error);
      });
    },

    updateQuantity(product) {
      console.log("Updating product quantity:", product);
    },

    mounted() {
      console.log(this.filteredComponents);
      this.filteredComponents = this.components;
      /*this.loadComponents();*/


    },
    watch: {
      minPrice: 'filterByPrice',
      maxPrice: 'filterByPrice',
    },

    //Add component in shopping cart
    async submitShoppingCart(compId) {

      if (compId == null){
        console.error('Error getting componentId')

      } else {

        this.newCart = new Cart({
          componentId: compId,
          userId: this.cartsApi.getUserContext(), quantity: 1});

        try {
          this.cartsApi.create(this.newCart).then((response) => {
            console.log("Product added to cart", compId);
          })
        } catch (error) {
          console.error('Error en carrito de compras')
        }
      }

    }
  },
};
</script>

<template>
  <div class="container">
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
          <option value="USA">USA</option>
          <option value="Taiwan">Taiwan</option>
          <!-- Agrega más países según sea necesario -->
        </select>


        <!-- Badges de categorías -->
        <div class="filter-badges">
          <div class="badge" @click="filterByCategory('Trabajo')">Trabajo</div>
          <div class="badge" @click="filterByCategory('Juegos')">Juegos</div>
          <div class="badge" @click="filterByCategory('Diseño')">Diseño</div>
        </div>


        <!-- Badges de componentes -->
        <div class="filter-badges">
          <div class="badge" @click="filterByType('Processors')">Processors</div>
          <div class="badge" @click="filterByType('RAM Memories')">RAM Memories</div>
          <div class="badge" @click="filterByType('Motherboards')">Motherboards</div>
          <div class="badge" @click="filterByType('Graphics Cards')">Graphics Cards</div>
          <div class="badge" @click="filterByType('Storage')">Storage</div>
          <div class="badge" @click="filterByType('Peripheral')">Peripheral</div>
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
      <div class="component-list">
        <div
            class="component-card"
            v-for="component in filteredComponents"
            :key="component.id">
          <img
              v-if="component.image"
              :src="component.image.main"
              alt="Component image"
              class="component-image"
          />
          <div class="component-info">
            <h3 class="component-title">{{ component.name }}</h3>
            <p class="component-price">${{ component.price }}.00</p>

              <!-- Mostrar estrellas basado en el rating -->
            <div class="component-rating">
  <span v-for="n in 5" :key="n" class="star">
    <i :class="n <= (component.ratings >= 0 ? Math.min(component.ratings, 5) : 0) ? 'filled-star' : 'empty-star'">★</i>
  </span>
            </div>

            <!-- Mostrar el estado del stock -->
            <p v-if="component.stock > 10" class="available component-status">Available</p>
            <p v-else-if="component.stock > 0" class="short component-status">Short</p>
            <p v-else class="unavailable component-status">Unavailable</p>
            <!-- Agregar componente `WishlistAddAndRemoveComponent` -->
            <WishlistAddAndRemoveComponent
                :component="component"
                :wishlist="wishlist"
                @add-to-wishlist="addToWishlist"
                @remove-from-wishlist="removeFromWishlist"
            />

            <!-- Add component to shopping cart -->
            <div>
              <add-cart-button @button-click="submitShoppingCart(component.id)"></add-cart-button>
            </div>

          </div>
          <div class="component-actions">
            <!-- Aquí puedes añadir los iconos de acción -->
            <i class="fa fa-edit"></i> <!-- Icono de editar -->
            <img src="@/assets/icons/me-gusta.png" />
            <img src="@/assets/icons/compartir.png" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.navbar {
  background-color: #FF1B6B4D;
  color: white;
  padding: 50px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.icons {
  position: absolute;
  top: 20px;
  left: 20px;
  display: flex;
  gap: 10px;
}

.user-icon {
  position: absolute;
  top: 20px;
  right: 20px;
}
body {
  background: linear-gradient(145deg, #FF1B6B4D 30%, #45CAFF33 70%); /* Degradado personalizado */
  color: #ffffff; /* Color de texto blanco por defecto */
  font-family: 'Arial', sans-serif;
}

.container {
  display: flex;
  gap: 30px;
  padding: 20px;
}

/* Sección izquierda para buscar componentes y opciones */
.filter-section {
  width: 30%;
  background: linear-gradient(145deg, #FF1B6B4D 30%, #45CAFF33 70%); /* Degradado personalizado */
  border-radius: 15px;
  padding: 20px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.5);
}

.filter-section h2 {
  color: #fff; /* Color blanco para los títulos principales */
  font-weight: bold;
  margin-bottom: 20px;
  font-size: 18px;
}

.search-bar {
  display: flex;
  align-items: center;
  background-color: #fff;
  border-radius: 5px;
  padding: 10px;
  margin-bottom: 20px;
}

.search-bar input {
  border: none;
  width: 100%;
  padding-left: 10px;
  font-size: 16px;
}

.search-bar button {
  background-color: transparent;
  border: none;
  cursor: pointer;
}

.filter-options {
  display: flex;
  flex-direction: column;
  gap: 15px;
}

.filter-options label {
  font-size: 14px;
  color: #fff;
  margin-bottom: 5px;
}

.filter-options input[type="text"],
.filter-options input[type="number"] {
  width: 100%;
  padding: 10px;
  border: none;
  border-radius: 5px;
  background-color: #333;
  color: #fff;
}

.filter-options select {
  padding: 10px;
  border-radius: 5px;
  border: none;
  background-color: #333;
  color: #fff;
}

.filter-badges {
  display: flex;
  gap: 10px;
  flex-wrap: wrap;
}

.badge {
  background-color: #ff0077; /* Color rosa neón */
  color: #fff;
  border-radius: 20px;
  padding: 5px 15px;
  cursor: pointer;
  font-size: 14px;
}

.badge:hover {
  background-color: #ff55aa; /* Efecto hover en los badges */
}

/* Sección derecha con lista de componentes */
.component-section {
  width: 65%;
}

.component-section h2 {
  font-size: 18px;
  font-weight: bold;
  color: #fff;
  margin-bottom: 20px;
}

/* Botones para ordenar los componentes */
.sort-buttons {
  display: flex;
  gap: 10px;
  margin-bottom: 20px;
}

.sort-buttons button {
  padding: 10px 15px;
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.sort-buttons button:hover {
  background-color: #ff0077;
}

/* Lista de componentes */
.component-list {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.component-actions i {
  color: #00c4ff;
  font-size: 24px;
  cursor: pointer;
}

.component-actions i:hover {
  color: #ff55aa;
}
.star {
  font-size: 20px; /* Ajusta según sea necesario */
}

.filled-star {
  color: gold; /* O cualquier color que desees */
}

.empty-star {
  color: lightgray; /* O cualquier color que desees */
}

</style>