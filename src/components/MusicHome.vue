<template>
  <div>
    <button v-on:click="logout">Logout</button>
    <h1>Music</h1>
    <p v-for="song in songs" :key="song.id">{{song.title}}</p>
    <p>{{this.$store.state.storeExample}}</p>
  </div>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  name: 'MusicHome',
  data () {
    return {
      songs: []
    }
  },
  methods: {
    async getSongs () {
      const response = await SongService.getSongs()
      this.songs = response.data
    },
    logout () {
      this.$store.dispatch('logout').then(() => this.$router.push('/'))
    }
  },
  mounted: function () {
    this.getSongs()
  }
}
</script>
