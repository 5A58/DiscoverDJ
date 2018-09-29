<template>
    <div>
      <p v-for="song in songs" :key="song.id">{{song.artist ? song.artist + ' - ' : ''}} {{song.title}}</p>
    </div>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  name: 'SongContainer',
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

<style scoped>

</style>
