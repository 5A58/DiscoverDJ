<template>
  <div>
    <p v-if="videoId">Now Playing: {{title}}</p>
    <form v-on:submit="submitForm">
      <input v-model="songLink" type="text">
      <button>Submit</button>
    </form>

    <div id="video-container">
      <youtube :video-id="videoId" :player-vars="playerVars" :height="height" :width="width" ref="youtube"/>
    </div>

    <SongContainer/>

    <PlayerControls v-bind="{playVideo, pauseVideo, stopVideo}"/>
  </div>

</template>

<script>
// import {validateUrl} from 'youtube-validate'
import getYoutubeTitle from 'get-youtube-title'
import PlayerControls from './PlayerControls'
import SongContainer from './SongContainer'

export default {
  name: 'MediaPlayer',
  components: {SongContainer, PlayerControls},
  data () {
    return {
      songLink: '',
      title: '',
      height: 1,
      width: 1,
      videoId: '',
      playerVars: {'autoplay': 1, 'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'showinfo': 0}
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
    playVideo () {
      this.player.playVideo()
    },
    pauseVideo () {
      this.player.pauseVideo()
    },
    stopVideo () {
      this.player.stopVideo()
    },
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    },
    submitForm (e) {
      e.preventDefault()
      this.loadSong(this.songLink)
    },
    async loadSong (url) {
      let id = this.getId(url)
      if (id === null) return
      this.getTitle(id).then(resp => {
        console.log('The title is', resp)
        this.videoId = id
        this.title = resp
      }).catch(err => {
        console.log('Video not found', err)
      })
    },
    getTitle (vid) {
      return new Promise((resolve, reject) => {
        getYoutubeTitle(vid, (err, title) => {
          if (err) {
            reject(err)
          } else {
            resolve(title)
          }
        })
      })
    },
    songClicked (url) {
      console.log('Load', url)
    }
  }
}
</script>

<style scoped>
  #video-container {
    display: none;
  }
</style>
