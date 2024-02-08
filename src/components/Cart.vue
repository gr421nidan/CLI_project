<script >
export default {
  data() {
    return {
      productCart: [],
    }
  },
  methods: {
    async basket() {

    }
  }
}
</script>

<template>
<div>
  <nav>
    <router-link to="/">Главная</router-link> |
    <router-link to="/login">Вход</router-link> |
    <!--    <router-link to="/myorders">Мои заказы</router-link>-->
  </nav>
  <div>
    <h1 class="catalog" @click="getProductCart">Товары</h1>
    <div class="ag-format-container">
    </div>
    <div class="ag-courses_item" v-for="product in productCart" :key="product.id">
      <a href="#" class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>

        <div class="title">
          {{ product.name }}
        </div>

        <div class="ag-courses-item_date-box">
            <span class="description">
            {{ product.description }}
          </span>
          <p class="price">
            {{ product.price }}руб.
          </p>
          <button @click="addToCart(product)" type="submit" class="btn">В корзину</button>
        </div>
      </a>
    </div>
  </div>
</div>
</template>

<style scoped>

</style>