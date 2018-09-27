<template>
  <div>
    <h1>{{formType}}</h1>
    <form v-on:submit="submitForm">
      <input id="username" type="text" placeholder="Username">
      <input id="password" type="password" placeholder="Password">
      <input id="confirm-password" v-if="formType !== 'Login'" type="password" placeholder="Confirm Password">
      <button>{{formType}}</button>
    </form>
  </div>
</template>

<script>
export default {
  name: 'Authentication',
  props: {
    formType: {
      type: String,
      default: 'Sign Up'
    }
  },
  methods: {
    submitForm: function (e) {
      e.preventDefault()
      if (this.formType === 'Login') {
        return this.submitLogin()
      } else {
        return this.submitSignUp()
      }
    },
    submitLogin: function () {
      console.log('Submitting Login')
      let username = document.querySelector('#username').value
      let password = document.querySelector('#password').value
      console.log(username)
      console.log(password)
    },
    submitSignUp: function () {
      console.log('Submitting Registration')
      let username = document.querySelector('#username').value
      let password = document.querySelector('#password').value
      let confirmPassword = document.querySelector('#confirm-password').value
      console.log(username)
      console.log(password)
      console.log(confirmPassword)
      if (confirmPassword !== password) {
        console.log('Passwords do not match')
      }
    }
  }
}
</script>
