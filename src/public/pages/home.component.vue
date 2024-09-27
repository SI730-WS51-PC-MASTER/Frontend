<script>

export default {
  name: "Home",
  components: {
  },
};
</script>
<template>
  <div class="home">
    <header class="home-header">
      <!-- Settings, Announcements, Translation icons -->
      <div class="icons-left">
        <img src="@/assets/icons/settings.png" alt="Settings" />
        <img src="@/assets/icons/announcements.png" alt="Announcements" />
        <img src="@/assets/icons/translation.png" alt="Translation" />
      </div>
      <h1>Don't know which components for your PC to choose?</h1>
      <div class="buttons">
        <button class="build-button">Start Building your PC</button>
        <button class="find-button">Find your component</button>
        <button class="guide-button">Get Hardware Guidance</button>
      </div>
      <!-- User Icon -->
      <div class="user-icon">
        <img src="@/assets/icons/user.png" alt="User" />
      </div>
    </header>

    <section class="content">
      <div class="best-sellers">
        <h2>Best Sellers</h2>
        <div class="products">
          <!-- Solo imágenes y descripciones -->
          <div class="product">
            <img src="@/assets/components/image%2015.png" alt="HYPER X 16GB RAM" />
            <p>HYPER X 16GB RAM</p>
          </div>
          <div class="product">
            <img src="@/assets/components/image%2016.png" alt="RTX 3050 NVIDIA Graphics Card" />
            <p>RTX 3050 NVIDIA Graphics Card</p>
          </div>
          <div class="product">
            <img src="@/assets/components/image%2017.png" alt="Toshiba 4TB Portable Hard Drive" />
            <p>Toshiba 4TB Portable Hard Drive</p>
          </div>
          <div class="product">
            <img src="@/assets/components/image%2018.png" alt="Intel Core i7 12th Generation" />
            <p>Intel Core i7 12th Generation</p>
          </div>
        </div>
      </div>

      <div class="best-advisors">
        <h2>Best Advisors</h2>
        <div class="advisors">
          <div class="advisor">
            <img src="@/assets/techs/tecnico-3-removebg-preview%201.png" alt="José Gabriel Aparcana" />
            <p>José Gabriel Aparcana</p>
          </div>
          <div class="advisor">
            <img src="@/assets/techs/tecnico-1-removebg-preview%201.png" alt="Julio César Ramírez" />
            <p>Julio César Ramírez</p>
          </div>
          <div class="advisor">
            <img src="@/assets/techs/tecnico-4-removebg-preview%201.png" alt="Renzo Sebastián Ventosilla" />
            <p>Renzo Sebastián Ventosilla</p>
          </div>
          <div class="advisor">
            <img src="@/assets/techs/tecnico-2-removebg-preview%201.png" alt="Camila Nicole Rodríguez" />
            <p>Camila Nicole Rodríguez</p>
          </div>
        </div>
      </div>

      <div class="best-categories">
        <h2>Best Categories</h2>
        <div class="categories">
          <div class="category">
            <img src="@/assets/categories/image%20(3).png" alt="Higher Processor Speed" />
            <p>Higher Processor Speed</p>
          </div>
          <div class="category">
            <img src="@/assets/categories/image%20(2).png" alt="Most Economic Store" />
            <p>Most Economic Store</p>
          </div>
          <div class="category">
            <img src="@/assets/categories/image%20(1).png" alt="Medium Processor Speed" />
            <p>Medium Processor Speed</p>
          </div>
          <div class="category">
            <img src="@/assets/categories/image.png" alt="Special Offers" />
            <p>Special Offers</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<style scoped>
/* General Styles */
.home {
  text-align: center;
  position: relative;
  padding: 0 20px;
}

.home-header {
  background-color: #2c003e;
  color: white;
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
}

.icons-left {
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

/* Espacio extra entre el h1 y los botones */
.home-header h1 {
  margin-top: 40px; /* Espacio extra entre los iconos y el h1 */
  margin-bottom: 30px; /* Espacio extra entre el h1 y los botones */
}

.buttons {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  margin-bottom: 20px; /* Espacio extra por debajo de los botones */
}

.build-button,
.find-button,
.guide-button {
  margin: 10px;
  padding: 10px 20px;
  border: none;
  border-radius: 5px;
  white-space: nowrap;
}

.build-button {
  background-color: #ff005a;
  color: white;
}

.find-button {
  background-color: #00d5ff;
  color: white;
}

.guide-button {
  background-color: #ff4c00;
  color: white;
}

.content {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  padding: 20px;
}

.best-sellers,
.best-advisors,
.best-categories {
  width: 30%;
  margin: 10px 0;
}

.products,
.advisors,
.categories {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.product,
.advisor,
.category {
  margin: 10px;
  text-align: center;
}

img {
  max-width: 100px;
  margin-bottom: 10px;
}

/* Responsive Styles */
@media (max-width: 1024px) {
  .best-sellers,
  .best-advisors,
  .best-categories {
    width: 45%;
  }
}

@media (max-width: 768px) {
  .best-sellers,
  .best-advisors,
  .best-categories {
    width: 100%;
  }

  .buttons {
    flex-direction: column;
  }

  .build-button,
  .find-button,
  .guide-button {
    width: 100%;
  }
}

@media (max-width: 480px) {
  .icons-left,
  .user-icon {
    display: none;
  }

  .buttons {
    margin-top: 10px;
  }
}
</style>