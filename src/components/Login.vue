<template>
  <div>
    <nav>
      <router-link to="/">Главная</router-link> |
      <router-link to="/registration">Регистрация</router-link> |
      <router-link to="/login">Вход</router-link>
    </nav>
    <h1>Вход</h1>
    <div class="form-login">
      <form @submit.prevent="login" class="login">
        <input type="email" v-model="email" placeholder="email">
        <input type="password" v-model="password" placeholder="Password">

        <div class="buttons">
          <button class="btn_login" @click="goBack">Назад</button>
          <button class="btn_login" type="submit">Вход</button>
        </div>
      </form>

    </div>
    <div class="show-error" v-if="showBlock">
      {{ error}}
    </div>

  </div>
</template>

<script>
export default {
  data() {
    return {

      email: '',
      password: '',
      error: '',
      showBlock: false

    }
  },
  methods: {
    async login() {
      const url = "https://jurapro.bhuser.ru/api-shop/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: this.email,
          password: this.password
        })
      });
      if (response.ok) {
        const userToken = await response.json();
        localStorage.setItem('userToken', userToken.data.user_token);
        this.$router.push('/'); // Перенаправляем пользователя на главную страницу
      } else {
        this.error='Неверные учетные данные'
        this.email=''
        this.password=''
        this.showBlock = true;
        setTimeout(() => {
          this.showBlock = false;
        }, 3000);
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
.form-login{
  display: flex;
  justify-content: center;
}
.login {
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
.btn_login:hover{
  box-shadow: 0 5px 10px rgba(0,0,0,.3);
  transform: translateY(-2px);
}
.show-error{
  margin-top: 20px;
  background-color: #192a56;
  width: 460px;
  height: 30px;
  color: white;
  display: block;
  margin-right: auto;
  margin-left: auto;
  border-radius: 10px;
  text-align: center;

}
</style>