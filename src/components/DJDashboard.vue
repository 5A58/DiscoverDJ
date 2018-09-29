<template>
    <div v-if="pageOwned">
      <p>{{ $route.params.username }}</p>
      <p v-if="username">You are logged in as {{ username }}</p>
      <p v-if="username === $route.params.username ">This is your page</p>
    </div>
    <NotFoundComponent v-else></NotFoundComponent>
</template>

<script>
import NotFoundComponent from './NotFoundComponent'
export default {
  name: 'DJDashboard',
  components: {NotFoundComponent},
  data () {
    return {
      username: '',
      pageOwned: true
    }
  },
  methods: {
    async getUsername () {
      this.$store.dispatch('getCurrentUsername').then(resp => {
        if (resp) {
          console.log('You are logged in as ', resp)
          this.username = resp
        } else {
          console.log('You are not logged in')
        }
      })
    }
  },
  mounted: function () {
    this.getUsername()
    if (typeof this.$route.params.pageOwned !== 'undefined') {
      this.pageOwned = this.$route.params.pageOwned
    }
  }
}
</script>
