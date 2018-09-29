<template>
  <div>
    <button v-if="$store.state.token" v-on:click="logout">Logout</button>
    <p v-if="username">Hello {{username}}</p>
    <h1>Music</h1>
    <SongContainer/>
  </div>
</template>

<script>
import SongContainer from './SongContainer'
export default {
  name: 'MusicHome',
  components: {SongContainer},
  data () {
    return {
      username: ''
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => this.$router.push('/'))
    },
    async getUsername () {
      this.$store.dispatch('getCurrentUsername').then(resp => {
        if (resp) {
          this.username = resp
        }
      })
    }
  },
  mounted: function () {
    this.getUsername()
  }
}
</script>
