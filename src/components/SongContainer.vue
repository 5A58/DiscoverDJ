<template>
    <div id="song-container">
      <Song class="disabled-song" v-bind="{renderAddForm}" title="+"/>
      <Song v-for="song in songs" :key="song.id" v-bind:id="song._id" v-bind:title="song.title"
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
        {_id: '1', title: 'Smoke on the Water', artist: 'Deep Purple', link: 'https://www.youtube.com/watch?v=zUwEIt9ez7M'},
        {_id: '2', title: 'Stairway To Heaven', artist: 'Led Zeppelin', link: 'https://www.youtube.com/watch?v=D9ioyEvdggk'},
        {_id: '3', title: 'Simple Man', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=sMmTkKz60W8'},
        {_id: '4', title: 'Free Bird', artist: 'Lynyrd Skynyrd', link: 'https://www.youtube.com/watch?v=kgkYN3QjD5M'},
        {_id: '5', title: 'Riders On The Storm', artist: 'The Doors', link: 'https://www.youtube.com/watch?v=iv8GW1GaoIc'}
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
    },
    editSong: Function,
    renderAddForm: {
      type: Function,
      default: () => {
        return null
      }
    }
  },
  methods: {
    async getSongs () {
      const response = await SongService.getSongs()
      this.songs = response.data
    },
    deleteSong (id) {
      console.log('Deleting song with id', id)
      const index = this.songs.map(song => song._id).indexOf(id)
      if (index > -1) {
        this.songs.splice(index, 1)
        SongService.deleteSong(id)
      }
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
  }

  .disabled-song {
    background: #025cc0;
    font-weight: bold;
    font-size: 1.2rem;
    padding: calc(1rem - 0.2rem) 0;
  }

  .disabled-song:hover {
    background: #026ceb;
  }
</style>
