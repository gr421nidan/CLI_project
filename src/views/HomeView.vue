<template>
  <div class="home">
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/registration">Регистрация</router-link> |
      <router-link to="/login">Вход</router-link> |

      <!--    <router-link to="/basket">Корзина</router-link> |-->
      <!--    <router-link to="/myorders">Мои заказы</router-link>-->
    </nav>

    <div>
      <h1 class="catalog" @click="getProduct">Каталог товаров</h1>
      <div class="ag-format-container">
      </div>
      <div class="ag-courses_item" v-for="product in products" :key="product.id">
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
            <button class="btn">В корзину</button>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>

<script>
// @ is an alias to /src


export default {
  name: 'HomeView',
  data() {
    return {
      products: [],
    }

  },
  methods:{
    async getProduct(){
      const url = "https://jurapro.bhuser.ru/api-shop/products";
      const response = await fetch(url,{
        method: 'GET',
            headers: {
          'Content-Type': 'application/json',
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.products = result.data
        console.log('Result: ', result)
      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }


    }
  }
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

}
.catalog{
  cursor: pointer;
}
nav {
  padding: 30px;
}

nav a {
  font-weight: bold;
  color: #2c3e50;
}

nav a.router-link-exact-active {
  color: #42b983;
}



.btn {
  background-color: #42b983;
  border-radius: 5px;
  color: #FFF;
  display: block;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;
  width: 100%;
  transition: box-shadow .3s ease-in-out,
  transform .3s ease-in-out;
  outline: none;
}

.btn:hover {
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  transform: translateY(-2px);
}
.ag-format-container {
  width: 1142px;
  margin: 0 auto;
}
.ag-courses_item {
  -ms-flex-preferred-size: calc(33.33333% - 30px);
  flex-basis: calc(33.33333% - 30px);

  margin: 0 15px 30px;

  overflow: hidden;

  border-radius: 28px;
}
.ag-courses-item_link {
  display: block;
  padding: 30px 20px;
  background-color: #192a56;
  text-decoration: none;
  overflow: hidden;
  position: relative;
}
.ag-courses-item_link:hover,
.ag-courses-item_link:hover .description{
  text-decoration: none;
  color: #FFF;
}
.ag-courses-item_link:hover .ag-courses-item_bg {
  -webkit-transform: scale(10);
  -ms-transform: scale(10);
  transform: scale(10);
}
.title {
  min-height: 87px;
  margin: 0 0 25px;
  overflow: hidden;
  font-weight: bold;
  font-size: 30px;
  color: #FFF;
  z-index: 2;
  position: relative;
}
.ag-courses-item_date-box {
  font-size: 18px;
  color: #FFF;
  z-index: 2;
  position: relative;

}
.description {
  font-weight: bold;
  -webkit-transition: color .5s ease;
  -o-transition: color .5s ease;
  transition: color .5s ease
}
.price {
  font-weight: bold;
  -webkit-transition: color .5s ease;
  -o-transition: color .5s ease;
  transition: color .5s ease
}
.ag-courses-item_bg {
  height: 128px;
  width: 128px;
  background-color: #42b983;
  z-index: 1;
  position: absolute;
  top: -75px;
  right: -75px;
  border-radius: 50%;
  -webkit-transition: all .5s ease;
  -o-transition: all .5s ease;
  transition: all .5s ease;
}
@media only screen and (max-width: 979px) {
  .ag-courses_item {
    -ms-flex-preferred-size: calc(50% - 30px);
    flex-basis: calc(50% - 30px);
  }
  .title {
    font-size: 24px;
  }
}

@media only screen and (max-width: 767px) {
  .ag-format-container {
    width: 96%;
  }

}
@media only screen and (max-width: 639px) {
  .ag-courses_item {
    -ms-flex-preferred-size: 100%;
    flex-basis: 100%;
  }
  .title {
    min-height: 72px;
    font-size: 24px;
  }
  .ag-courses-item_link {
    padding: 22px 40px;
  }
  .ag-courses-item_date-box {
    font-size: 16px;
  }
}
</style>