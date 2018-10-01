<template>
    <div id="song-container">
      <Song v-for="song in songs" :key="song.id" v-bind:id="song.id" v-bind:title="song.title"
            v-bind:artist="song.artist" v-bind:link="song.link" v-bind:isAdmin="isAdmin"
            v-bind="{songClicked, addSongToQueue, editSong, deleteSong}"/>
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
      songs: [
        {id: '1', title: 'Smoke on the Water', artist: 'Deep Purple', link: 'https://www.youtube.com/watch?v=zUwEIt9ez7M'},
        {id: '2', title: 'Stairway To Heaven', artist: 'Led Zeppelin', link: 'https://www.youtube.com/watch?v=D9ioyEvdggk'},
        {id: '3', title: 'Simple Man', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=sMmTkKz60W8'},
        {id: '4', title: 'Free Bird', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=kgkYN3QjD5M'},
        {id: '5', title: 'Riders On The Storm', artist: 'The Doors', link: 'https://www.youtube.com/watch?v=iv8GW1GaoIc'},
        {id: '6', title: 'Smoke on the Water', artist: 'Deep Purple', link: 'https://www.youtube.com/watch?v=zUwEIt9ez7M'},
        {id: '7', title: 'Stairway To Heaven', artist: 'Led Zeppelin', link: 'https://www.youtube.com/watch?v=D9ioyEvdggk'},
        {id: '8', title: 'Simple Man', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=sMmTkKz60W8'},
        {id: '9', title: 'Free Bird', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=kgkYN3QjD5M'},
        {id: '10', title: 'Riders On The Storm', artist: 'The Doors', link: 'https://www.youtube.com/watch?v=iv8GW1GaoIc'},
        {id: '11', title: 'Smoke on the Water', artist: 'Deep Purple', link: 'https://www.youtube.com/watch?v=zUwEIt9ez7M'},
        {id: '12', title: 'Stairway To Heaven', artist: 'Led Zeppelin', link: 'https://www.youtube.com/watch?v=D9ioyEvdggk'},
        {id: '13', title: 'Simple Man', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=sMmTkKz60W8'},
        {id: '14', title: 'Free Bird', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=kgkYN3QjD5M'},
        {id: '15', title: 'Riders On The Storm', artist: 'The Doors', link: 'https://www.youtube.com/watch?v=iv8GW1GaoIc'}
      ],
      data: 'Test'
    }
  },
  props: {
    songClicked: Function,
    addSongToQueue: Function,
    isAdmin: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    async getSongs () {
      const response = await SongService.getSongs()
      this.songs = response.data
    },
    deleteSong (id) {
      const index = this.songs.map(song => song.id).indexOf(id)
      this.songs.splice(index, 1)
      SongService.deleteSong(id)
    },
    editSong (id) {
      console.log('Edit song', id)
    }
  },
  mounted: function () {
    this.getSongs()
  }
}
</script>

<style scoped>
  #song-container {
    height: 15rem;
    overflow: auto;
    width: 80%;
    margin: auto 0 auto auto;
  }
</style>
