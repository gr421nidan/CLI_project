<template>
  <div>
    <h2>Registration</h2>
    <form @submit.prevent="register">
      <input type="text" v-model="username" placeholder="Username">
      <input type="password" v-model="password" placeholder="Password">
      <button type="submit">Register</button>
    </form>
    <p v-if="error">{{ error }}</p>
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