<template>
  <div>
    <h2>Регистрация</h2>
    <div class="form-register">
      <form @submit.prevent="register" class="register">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Зарегистрироваться</button>
      </form>
      <p v-if="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: '',
      password: '',
      error: ''
    }
  },
  methods: {
    async register() {
      const url = "https://jurapro.bhuser.ru/api-shop/login";
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          username: this.username,
          password: this.password
        })
      });
      if (response.ok) {
        const data = await response.json();
        localStorage.setItem('userToken', data.data.user_token);
        this.$router.push('/login'); // Перенаправляем пользователя на авторизацию
      } else {
        this.error = "Ошибка при регистрации";
        console.error('Ошибка:', this.error);
      }

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
  background-color: #2c3e50;
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
</style>