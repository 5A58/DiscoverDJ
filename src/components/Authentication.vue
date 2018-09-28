<template>
  <div>
    <h1>{{formType}}</h1>
    <form v-on:submit="submitForm">
      <input v-model="username" type="text" placeholder="Username">
      <input v-model="password" type="password" placeholder="Password">
      <input v-model="confirmedPassword" v-if="formType !== 'Login'" type="password" placeholder="Confirm Password">
      <button>{{formType}}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  data () {
    return {
      username: '',
      password: '',
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
      if (this.formType === 'Login') {
        this.$store.dispatch('login', { username: this.username, password: this.password }).then(resp => {
          this.$router.push('/music')
        }).catch(err => {
          // Login failed
          console.log(err)
        })
      } else {
        if (this.password === this.confirmedPassword) {
          this.$store.dispatch('register', { username: this.username, password: this.password }).then(resp => {
            this.$router.push('/music')
          }).catch(err => {
            // registration failed
            console.log(err)
          })
        } else {
          // passwords do not match
          console.log('Passwords do not match')
        }
      }
    }
  }
}
</script>
