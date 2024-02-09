<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/cart">Корзина</router-link> |
      <router-link to="/order">Мои заказы</router-link>
    </nav>
    <div>
      <div v-if="myOrders.length === 0">
        <p>Пусто!</p>
      </div>
      <div v-else class="ag-format-container">
      </div>
      <div class="ag-courses_item" v-for="order in myOrders" :key="order.id">
      <span class="ag-courses-item_link">
        <div class="ag-courses-item_bg"></div>
        <div class="title">Заказ №{{order.id}}</div>


        <div class="ag-courses-item_date-box">
          <span class="description">
          Выбранные товары: {{ order.products.join("; ") }}
        </span>
          <p class="price">
            Стоимость заказа: {{ order.order_price }}руб.
          </p>
        </div>
      </span>
      </div>
    </div>
  </div>
</template>


<script >
export default {
  data() {
    return {
      myOrders:[]
    }
  },
  created() {
    this.getProductOrder();
  },
  methods: {
    async getProductOrder(){
      const localToken = localStorage.getItem('userToken');
      if(!localToken){
        console.error('Токен отсутствует');
        return;
      }
      const url = "https://jurapro.bhuser.ru/api-shop/order";
      const response = await fetch(url,{
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${localToken}`
        },

      });
      if (response.ok) {
        const result = await response.json();
        this.myOrders = result.data
        console.log('Result: ', result)

      } else {
        this.error = "Ошибка получения оформленных заказов";
        console.error(this.error);
      }
    },
  }
}
</script>


<style scoped>
.title {

  margin: 0;

}

.ag-courses-item_link {
  background-color: #42b983;

}

.ag-courses-item_bg {
  background-color: #192a56;
}
</style>