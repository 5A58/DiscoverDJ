<template>
    <div>
      <Song v-for="song in songs" :key="song.id" v-bind:title="song.title" v-bind:artist="song.artist" v-bind:link="song.link"/>
    </div>
</template>

<script>
import SongService from '@/services/SongService'
import Song from './Song'
export default {
  name: 'SongContainer',
  components: {Song},
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
