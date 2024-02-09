
<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/cart">Корзина</router-link> |
      <router-link to="/order">Мои заказы</router-link>
    </nav>
    <div>
      <h1 class="catalog">Товары</h1>
      <div v-if="productsCart.length === 0">
          <p>Пусто!</p>
      </div>
      <div v-else class="ag-format-container">
      </div>
      <div class="ag-courses_item" v-for="product in productsCart" :key="product.id">
      <span class="ag-courses-item_link">
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
          <button @click="removeFromCart(product)" type="submit" class="btn">Удалить</button>
        </div>
      </span>
      </div>
      <button v-if="productsCart.length !== 0" @click="addToMyOrder(product)" type="submit" class="btn_to_orders">Заказать</button>
    </div>
  </div>
</template>

<script >

export default {
  name: 'Cart',
  data() {
    return {
      productsCart: [],
      myOrder:[]
    };
  },
  created() {
    this.getProductCart();
  },
  methods: {
    async getProductCart(){
      const localToken = localStorage.getItem('userToken');
      if(!localToken){
        console.error('Токен отсутствует');
        return;
      }
      const url = "https://jurapro.bhuser.ru/api-shop/cart";
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.productsCart = result.data

        console.log('Result: ', result)

      } else {
        this.error = "Ошибка";
        console.error(this.error);
      }


    },
    async removeFromCart(product) {

      const userToken = localStorage.getItem('userToken');
      if (!userToken) {
        console.error('Токен отсутствует');
        return;
      }

      const url = `https://jurapro.bhuser.ru/api-shop/cart/${product.id}`;
      try {
        const response = await fetch(url, {
          method: 'DELETE',
          headers: {

            "Authorization": `Bearer ${userToken}`
          }
        });
        if (response.ok) {
          this.productsCart = this.productsCart.filter(cartItem => cartItem.id !== product.id);
          console.log("Товар успешно удален!");
          const data = await response.json();
          console.log(data.data.message);
        } else {
          console.error("Ошибка удаления товара из корзины:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка удаления товара из корзины:", error);
      }
    },

    async addToMyOrder(product) {
      const url = 'https://jurapro.bhuser.ru/api-shop/order';
      const userToken = localStorage.getItem('userToken');
      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${userToken}`
          }
        });
        if (response.ok) {
          const existingItemIndex = this.myOrder.findIndex(item => item.id === product.id);
          if (existingItemIndex !== -1 && this.productExists(this.myOrder[existingItemIndex], product)) {
            this.myOrder[existingItemIndex].quantity++;
          } else {
            this.myOrder.push({...product});
          }
          const data = await response.json();
          console.log(data.data.message);
          this.$router.push('/order');
        } else {
          console.error("Ошибка добавления товара в мои заказы:", response.statusText);
        }
      } catch (error) {
        console.error("Ошибка добавления товара в мои заказы:", error);
      }
    },
    productExists(item1, item2) {
      return item1.id === item2.id && item1.name === item2.name && item1.description === item2.description && item1.price === item2.price;
    },
  }
}
</script>


<style >
.btn_to_orders{
  background-color: #42b983;
  border-radius: 5px;
  color: #FFF;
  display: block;
  padding: 10px;
  text-align: center;
  text-decoration: none;
  text-transform: capitalize;
  margin-left: auto;
  margin-right: auto;
  width: 600px;
  transition: box-shadow .3s ease-in-out,
  transform .3s ease-in-out;
  outline: none;
}
.btn_to_orders:hover{
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  transform: translateY(-2px);
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