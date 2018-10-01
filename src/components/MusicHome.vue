<template>
  <div>
    <div class="main-contents">
      <button v-if="$store.state.token" v-on:click="logout">Logout</button>
      <p v-if="username">Hello {{username}}</p>
      <h1>Music</h1>
      <button @click="toggleAddSong">Add Song</button>
      <NewSong v-if="addSong"/>
    </div>
    <MediaPlayer v-bind:is-admin="isAdmin"/>
  </div>
</template>

<script>
import SongContainer from './SongContainer'
import MediaPlayer from './MediaPlayer'
import NewSong from './NewSong'
export default {
  name: 'MusicHome',
  components: {NewSong, MediaPlayer, SongContainer},
  data () {
    return {
      username: '',
      addSong: false
    }
  },
  computed: {
    isAdmin () {
      return this.username === 'Admin'
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
    },
    toggleAddSong () {
      this.addSong = !this.addSong
    }
  },
  mounted: function () {
    this.getUsername()
  }
}
</script>

<style scoped>
  .main-contents {
    width: 80%;
    margin: auto 0 auto auto;
  }
</style>
