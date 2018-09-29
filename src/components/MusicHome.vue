<template>
  <div>
    <button v-if="$store.state.token" v-on:click="logout">Logout</button>
    <p v-if="username">Hello {{username}}</p>
    <h1>Music</h1>
    <button @click="toggleAddSong">Add Song</button>
    <NewSong v-if="addSong"/>
    <MediaPlayer/>
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
