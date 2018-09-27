<template>
  <div>
    <h1>Music</h1>
    <p v-for="song in songs" :key="song.id">{{song.title}}</p>
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
    }
  },
  mounted: function () {
    this.getSongs()
  }
}
</script>
