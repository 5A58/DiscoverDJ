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

    <PlayerControls v-if="ownPage" ref="controls"  v-bind:paused="playerPaused" v-bind="{playVideo, pauseVideo, sendUpdates}"/>
    <PlayerControls v-else ref="controls" v-bind:paused="playerPaused" v-bind:disabled="true"/>
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
      playerPaused: true,
      playerVars: {'autoplay': 1, 'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'showinfo': 0}
    }
  },
  props: {
    ownPage: {
      type: Boolean,
      default: true
    },
    sendUpdates: {
      type: Function,
      default: () => {
        return null
      }
    },
    DJPage: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    player () {
      return this.$refs.youtube.player
    }
  },
  methods: {
    playVideo () {
      this.playerPaused = false
      this.player.playVideo()
    },
    pauseVideo () {
      this.playerPaused = true
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
      this.playerPaused = true
      console.log('Loading Song')
      let id = this.getId(url)
      if (id === null) return
      if (this.DJPage && this.ownPage) {
        this.sendUpdates(state, url, time)
      }
      // Check if this song is already playing, if it is don't reload, just change state
      if (this.videoURL === url) {
        console.log('Already Loaded')
        // Song already loaded, check if time changed
        this.player.getCurrentTime().then(resp => {
          if (Math.abs(time - resp) < 5) {
            // Time is slightly off, perhaps due to latency, so just change state to reduce choppiness
            if (state === 1) {
              this.playVideo()
            } else {
              this.pauseVideo()
            }
          } else {
            // Time has been changed
            if (state === 1) {
              this.player.seekTo(time, true)
              this.playVideo()
            } else {
              this.player.seekTo(time, true)
              this.pauseVideo()
            }
          }
        }).catch(err => {
          console.log(err)
        })
      } else {
        // Load song
        this.getTitle(id).then(resp => {
          console.log('The title is', resp)
          this.videoURL = url
          this.videoId = id
          this.title = resp
          if (state !== 1) {
            this.player.cueVideoById(id, time)
            this.playerPaused = true
          } else {
            this.player.cueVideoById(id, time)
            this.playerPaused = false
            this.playVideo()
          }
        }).catch(err => {
          console.log('Video not found', err)
        })
      }
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
