<template>
  <div>
    <h2>Вход</h2>
    <div class="form-login">
      <form @submit.prevent="login" class="login">
        <input type="text" v-model="username" placeholder="Username">
        <input type="password" v-model="password" placeholder="Password">
        <button type="submit">Вход</button>
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
    async login() {
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
        this.$router.push('/'); // Перенаправляем пользователя на главную страницу
      } else {
        this.error = "Неверные учетные данные";
      }

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