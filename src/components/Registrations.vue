<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/registration">Регистрация</router-link>
    </nav>
    <h1>Регистрация</h1>
    <div class="form-register">
      <form @submit.prevent="register" class="register">
        <input type="text" v-model="fio" placeholder="fio">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="Password">
        <div class="buttons">
          <button class="btn_register" @click="goBack">Назад</button>
          <button class='btn_register' type="submit">Зарегистрироваться</button>
        </div>

      </form>

    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      fio: '',
      email: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register() {
      const url = "https://jurapro.bhuser.ru/api-shop/signup";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          fio: this.fio,
          email: this.email,
          password: this.password
        })
      });
      if (response.ok) {
        this.$router.push('/login'); // Перенаправляем пользователя на авторизацию
      } else {
        this.error = "Ошибка при регистрации";
        console.error('Ошибка:', this.error);
      }


    },
    goBack(){
      this.$router.push('/');
    }

  }
}
</script>
<style>
.form-register{
  display: flex;
  justify-content: center;
}
.register {
  overflow: hidden;
  background-color: #192a56;
  padding: 40px 30px 30px 30px;
  border-radius: 10px;
  width: 400px;

}
input {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  //display: block;
  border-radius: 5px;
  font-size: 16px;
  background: white;
  width: 100%;
  border: 0;
  padding: 10px 10px;
  margin: 15px -10px;
}
.buttons{
  display: flex;
  flex-direction: row;
  gap:15px;
}
button {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  cursor: pointer;
  color: #2c3e50;
  font-size: 16px;
  text-transform: uppercase;
  width: 210px;
  border: 0;
  padding: 10px 0;
  margin-top: 10px;
  margin-left: -5px;
  border-radius: 5px;
  background-color: $redFire;

}
.btn_register:hover{
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  transform: translateY(-2px);
}
</style>