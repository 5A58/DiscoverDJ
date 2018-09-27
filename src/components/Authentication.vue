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
import AuthenticationService from '@/services/AuthenticationService'
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
        return this.submitLogin()
      } else {
        return this.submitSignUp()
      }
    },
    submitLogin () {
      console.log('Submitting Login')
      console.log(this.username)
      console.log(this.password)
    },
    async submitSignUp () {
      console.log('Submitting Registration')
      if (this.confirmedPassword !== this.password) {
        console.log('Passwords do not match')
      } else {
        const response = await AuthenticationService.register({
          username: this.username,
          password: this.password
        })
        console.log(response.data)
      }
    }
  }
}
</script>
