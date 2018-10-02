<template>
  <div>
    <div id="form-container">
      <form v-on:submit="submitForm">
        <p class="type">{{formType}}</p>
        <input v-model="username" class="text" type="text" placeholder="Username">
        <input v-model="password" class="text" type="password" placeholder="Password">
        <input v-model="confirmedPassword" class="text" v-if="formType !== 'Log in'" type="password" placeholder="Confirm Password">
        <p v-if="error" class="error-message">{{error}}</p>
        <button class="submit">{{formType}}</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  data () {
    return {
      username: '',
      password: '',
      error: '',
      confirmedPassword: ''
    }
  },
  props: {
    formType: {
      type: String,
      default: 'Sign Up'
    }
  },
  methods: {
    submitForm (e) {
      e.preventDefault()
      if (this.formType === 'Log in') {
        if (!this.username || !this.password) { this.error = 'Please fill all fields'; return }
        this.$store.dispatch('login', { username: this.username, password: this.password }).then(resp => {
          this.$router.push('/music')
        }).catch(err => {
          // Login failed
          console.log(err)
          this.error = 'Invalid username or password'
        })
      } else {
        if (!this.username || !this.password || !this.confirmedPassword) { this.error = 'Please fill all fields'; return }
        if (this.password === this.confirmedPassword) {
          this.$store.dispatch('register', { username: this.username, password: this.password }).then(resp => {
            this.$router.push('/music')
          }).catch(err => {
            // registration failed
            console.log(err)
            this.error = 'Registration currently unavailable'
          })
        } else {
          // passwords do not match
          console.log('Passwords do not match')
          this.error = 'Please ensure your passwords match'
        }
      }
    }
  }
}
</script>

<style scoped>
  form {
    background: white;
    width: 50%;
    max-width: 400px;
    padding: 1.5rem 2rem;
    border-radius: 5px;
  }

  .text, .submit {
    width: 100%;
    max-width: 400px;
    border-radius: 3px;
  }

  .text {
    border: 2px solid #dce4ec;
    margin-bottom: 1rem;
    padding: 0.5rem 0 0.5rem 0.3rem;
    font-size: 1rem;
    color: #555;
  }

  .text:focus {
    outline:none;
    border-color: #121212;
    transition: all 0.2s linear;
  }

  .submit {
    border: none;
    background: #121212;
    color: white;
    padding: 0.5rem 0.3rem 0.5rem 0.3rem;
  }

  .submit:hover {
    background: #040404;
    transition: all 0.2s linear;
  }

  .submit:focus {
    outline:0;
  }

  #form-container {
    display: flex;
    justify-content: center;
    margin-top: 10%;
  }

  .type {
    text-transform: uppercase;
    background: #121212;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
    font-weight: bold;
    font-size: 1.5rem;
    margin: -1.5rem -2rem 1rem -2rem;
    padding: 0.3rem;
  }

  .error-message {
    color: red;
    text-align: left;
    margin: -1rem 0 0.75rem 0;
  }
</style>
