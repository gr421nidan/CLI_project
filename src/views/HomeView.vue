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
      <h1>Каталог товаров</h1>
      <div class="flowers">
        <div class="card" v-for="product in products" :key="product.id">
          <figure>
            <img :src="product.image" alt="flowers" class="product-image">
          </figure>
          <section class="details">
            <div class="min-details">
              <h1>{{ product.name }}<span>{{ product.description }}</span></h1>
              <h1 class="price">{{ product.price }}руб.</h1>
            </div>
            <button class="btn">В корзину</button>
          </section>
        </div>
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
      products: [
        {id: 1, name: 'Розы', description: 'Розовые', image: '../assets/pink_roses.jpg', price: 6000},
        {id: 2, name: 'Розы', description: 'Белые', image: 'src/assets/white_roses.jpg', price: 8000},
        {id: 3, name: 'Пионы', description: 'Голубые', image: 'src/assets/blue_pionies.jpg', price: 7000},
        {id: 4, name: 'Пионы', description: 'Белые', image: 'src/assets/white_pionies.jpg', price: 9000},
      ],
      authenticated: false,
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
.flowers{
  display: flex;
  justify-content: space-between;
}
h1 {
  font-size: 1.2rem;
  text-transform: capitalize;
}

.card {
  position: relative;
  border-radius: 5px;
  box-shadow: 0 5px 10px rgba(0,0,0,0.3);
  height: 400px;
  overflow: hidden;
  width: 350px;
}

.card > figure {
  width: 90%;
  margin: 20px auto 0 auto;
}

.card > figure > img {
  width: 100%;
}
.details {
  background-color: #FFF;
  border-radius: 10px;
  padding: 20px;
  position: absolute;
  top: 85%;
  width: 309px;
  transition: box-shadow .3s ease-in-out,
  top .3s ease-in-out;
}

.card:hover .details {
  box-shadow: 0 -5px 10px rgba(0,0,0,0.3);
  top: 40%;
}


.details > .min-details {
  display: flex;
  justify-content: space-between;
}

.details > .min-details > h1 > span {
  color: #7B7B7B;
  display: block;
  font-size: .9rem;
  font-weight: 400;
}


.btn {
  background-color: #192a56;
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
}

.btn:hover {
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  transform: translateY(-2px);
}
</style>