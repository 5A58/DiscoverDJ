<template>
  <div>
    <button v-if="$store.state.token" v-on:click="logout">Logout</button>
    <p v-if="username">Hello {{username}}</p>
    <h1>Music</h1>
    <p v-for="song in songs" :key="song.id">{{song.artist ? song.artist + ' - ' : ''}} {{song.title}}</p>
  </div>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  name: 'MusicHome',
  data () {
    return {
      songs: [],
      username: ''
    }
  },
  methods: {
    async getSongs () {
      const response = await SongService.getSongs()
      this.songs = response.data
    },
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
    this.getSongs()
    this.getUsername()
  }
}
</script>
