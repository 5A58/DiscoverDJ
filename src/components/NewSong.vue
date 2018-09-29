<template>
  <div>
    <p>Add A New Song</p>
    <form v-on:submit="submitForm">
      <input v-model="title" type="text" placeholder="Title">
      <input v-model="originalTitle" type="checkbox" value="Original Title">
      <input v-model="artist" type="text" placeholder="Artist">
      <input v-model="link" type="text" placeholder="Link">
      <button>Submit</button>
    </form>
  </div>
</template>

<script>
import SongService from '@/services/SongService'
export default {
  name: 'NewSong',
  data () {
    return {
      title: '',
      artist: '',
      link: '',
      originalTitle: false
    }
  },
  methods: {
    submitForm (e) {
      e.preventDefault()
      SongService.addSong({title: this.title, artist: this.artist, link: this.link})
    }
  }
}
</script>

<style scoped>

</style>
