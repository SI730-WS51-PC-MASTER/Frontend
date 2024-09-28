<script>
import Toolbar from "primevue/toolbar";

export default{
  name:'App',
  components: {
    Toolbar,
  },
  data() {
    return {
      wishlist: [],
    };
  },
  methods: {
    addToWishlist(product) {
      if (!this.wishlist.some((item) => item.id === product.id)) {
        this.wishlist.push(product);
      }
    },
    removeFromWishlist(product) {
      this.wishlist = this.wishlist.filter((item) => item.id !== product.id);
    },
  },
};
</script>

<template>
  <!--<div id="app">
    <router-view></router-view>
  </div>-->
  <div id="app">
    <Toolbar :wishlist="wishlist" />
    <router-view :wishlist="wishlist" @add-to-wishlist="addToWishlist" @remove-from-wishlist="removeFromWishlist" />
  </div>
</template>


<style scoped>
header {
  line-height: 1.5;
}

.logo {
  display: block;
  margin: 0 auto 2rem;
}

@media (min-width: 1024px) {
  header {
    display: flex;
    place-items: center;
    padding-right: calc(var(--section-gap) / 2);
  }

  .logo {
    margin: 0 2rem 0 0;
  }

  header .wrapper {
    display: flex;
    place-items: flex-start;
    flex-wrap: wrap;
  }
}
</style>


