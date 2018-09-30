<template>
  <div>
    <p v-if="videoId">Now Playing: {{title}}</p>
    <form v-if="ownPage" v-on:submit="submitForm">
      <input v-model="songLink" type="text">
      <button>Submit</button>
    </form>

    <div id="video-container">
      <youtube :player-vars="playerVars" :height="height" :width="width" ref="youtube"/>
    </div>

    <SongContainer v-if="ownPage" v-bind="{songClicked}"/>

    <PlayerControls v-if="ownPage" ref="controls" v-bind="{playVideo, pauseVideo}"/>
    <PlayerControls v-else ref="controls"/>
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
      height: 400,
      width: 400,
      videoId: '',
      videoURL: '',
      playerVars: {'autoplay': 1, 'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'showinfo': 0}
    }
  },
  props: {
    ownPage: {
      type: Boolean,
      default: true
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
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    },
    submitForm (e) {
      e.preventDefault()
      this.loadSong(this.songLink)
    },
    async loadSong (url, time = 0, state = 1) {
      let id = this.getId(url)
      if (id === null) return
      this.getTitle(id).then(resp => {
        console.log('The title is', resp)
        this.videoURL = url
        this.videoId = id
        this.title = resp
        if (state !== 1) {
          this.player.cueVideoById(id, time)
          this.$refs['controls'].changeButtonState('pause')
        } else {
          this.player.cueVideoById(id, time)
          this.$refs['controls'].changeButtonState('play')
          this.playVideo()
        }
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
      console.log('Now playing', url)
      this.loadSong(url)
    },
    getPlayerInfo () {
      return [this.player.getPlayerState(), this.player.getCurrentTime(), this.videoURL]
    }
  }
}
</script>

<style scoped>
  #video-container {
    /*display: none;*/
  }
</style>
