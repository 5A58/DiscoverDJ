<template>
  <div id="player-container">
    <div id="player-details" v-bind:class="{ 'player-details':!DJPage, 'player-details-dj':DJPage }">
      <p v-if="videoId && DJPage && ownPage" class="now-playing">Now Playing: {{title.length > 55 ? title.substring(0,52) + '...' : title}}</p>
      <p v-else-if="videoId" class="now-playing">Now Playing: {{title.length > 55 ? title.substring(0,52) + '...' : title}}</p>
      <form v-if="ownPage">
        <input v-model="songLink" class="text" type="text" placeholder="YouTube URL" @keyup.enter="submitForm">
        <button style="width: 4rem" class="submit" @click="submitForm">Play</button>
        <button style="width: 8rem" class="submit" @click="addLinkToQueue">Add to Queue</button>
        <p v-if="error" class="error-message">{{error}}</p>
      </form>

      <div id="video-container">
        <youtube :player-vars="playerVars" :height="height" :width="width" ref="youtube" @ended="videoEnded()"/>
      </div>

      <SongContainer v-if="ownPage" ref="song-container" v-bind:isAdmin="isAdmin" v-bind="{songClicked, addSongToQueue, editSong, renderAddForm}"/>
    </div>

    <PlayerControls v-if="ownPage" ref="controls" v-bind:disabled="nothingLoaded" v-bind:paused="playerPaused" v-bind="{playVideo, pauseVideo, sendUpdates, skipSong}"/>
    <PlayerControls v-else ref="controls" v-bind:paused="playerPaused" v-bind:disabled="true"/>
    <SongQueue v-if="ownPage" ref="queue"/>
    <Messenger ref="messenger" v-if="DJPage" v-bind="{sendMessage}"/>
    <SongForm v-if="showAddForm" v-bind="{hideForm, getId}"/>
  </div>

</template>

<script>
import getYoutubeTitle from 'get-youtube-title'
import PlayerControls from './PlayerControls'
import SongContainer from './SongContainer'
import SongQueue from './SongQueue'
import Messenger from './Messenger'
import SongForm from './SongForm'

export default {
  name: 'MediaPlayer',
  components: {SongForm, Messenger, SongQueue, SongContainer, PlayerControls},
  data () {
    return {
      songLink: '',
      title: '',
      height: 400,
      width: 711,
      videoId: '',
      videoURL: '',
      playerPaused: true,
      nothingLoaded: true,
      error: '',
      playerVars: {'autoplay': 1, 'controls': 0, 'disablekb': 1, 'modestbranding': 1, 'showinfo': 0},
      showAddForm: false
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
    queueEnded: {
      type: Function,
      default: () => {
        return null
      }
    },
    editSong: {
      type: Function,
      default: () => {
        return null
      }
    },
    sendMessage: {
      type: Function,
      default: () => {
        return null
      }
    },
    DJPage: {
      type: Boolean,
      default: false
    },
    isAdmin: {
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
    stopVideo () {
      this.playerPaused = true
      this.player.stopVideo()
    },
    getId (url) {
      return this.$youtube.getIdFromUrl(url)
    },
    submitForm (e) {
      e.preventDefault()
      this.loadSong(this.songLink)
    },
    async loadSong (url, time = 0, state = 1, passedTitle = '') {
      this.nothingLoaded = false
      this.playerPaused = true
      console.log('Loading Song')
      let id = this.getId(url)
      if (id === null) { this.error = 'This is an invalid YouTube link'; return }
      if (this.DJPage && this.ownPage) {
        this.sendUpdates(state, url, time, passedTitle)
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
          this.error = ''
          console.log('The title is', resp)
          this.videoURL = url
          this.videoId = id
          this.title = passedTitle || resp
          console.log('set title', passedTitle)
          if (state !== 1) {
            this.player.cueVideoById(id, time)
            this.playerPaused = true
          } else {
            this.player.cueVideoById(id, time)
            this.playerPaused = false
            this.playVideo()
          }
        }).catch(err => {
          console.log(err)
          this.error = 'Video not found'
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
    songClicked (url, title) {
      this.loadSong(url, 0, 1, title)
    },
    getPlayerInfo () {
      return [this.player.getPlayerState(), this.player.getCurrentTime(), this.videoURL, this.title]
    },
    videoEnded () {
      let nextSong = this.$refs['queue'].getNext()
      if (nextSong) {
        console.log(`The next song is ${nextSong.link}`)
        this.loadSong(nextSong.link, 0, 1, nextSong.title)
      } else {
        console.log('The song queue is empty')
        this.nothingLoaded = true
        if (this.DJPage && this.ownPage) {
          this.queueEnded()
        }
      }
    },
    addSongToQueue (title, artist, link) {
      this.$refs['queue'].addSongToQueue(title, artist, link)
      if (this.nothingLoaded) {
        this.videoEnded()
      }
    },
    skipSong () {
      this.player.stopVideo()
      this.playerPaused = true
      this.videoEnded()
    },
    addLinkToQueue (e) {
      e.preventDefault()
      console.log('Add', this.songLink)
      let id = this.getId(this.songLink)
      if (id === null) return
      this.getTitle(id).then(resp => {
        this.error = ''
        console.log('The title is', resp)
        this.$refs['queue'].addSongToQueue(resp, '', this.songLink)
      }).catch(err => {
        console.log(err)
        this.error = 'Video not found'
      })
    },
    renderAddForm () {
      this.showAddForm = true
    },
    hideForm (data = null) {
      this.showAddForm = false
      if (data) {
        this.$refs['song-container'].getSongs()
      }
    }
  }
}
</script>

<style scoped>
  #video-container {
    /*display: none;*/
  }

  .player-details {
    width: 80%;
    margin: 1rem 0 auto auto;
  }

  .player-details-dj {
    width: 60%;
    margin: 1rem 20% auto auto;
  }

  .text, .submit {
    max-width: 400px;
    border-radius: 3px;
  }

  .text {
    width: 100%;
    border: 2px solid #dce4ec;
    margin-bottom: 1rem;
    padding: 0.5rem 0 0.5rem 0.3rem;
    font-size: 0.8rem;
    color: #555;
  }

  .text:focus {
    outline:none;
    border-color: #025cc0;
    transition: all 0.2s linear;
  }

  .submit {
    width: 4rem;
    border: none;
    background: #025cc0;
    color: white;
    padding: 0.5rem 0.3rem 0.5rem 0.3rem;
  }

  .submit:hover {
    background: #024487;
    transition: all 0.2s linear;
  }

  .submit:focus {
    outline:0;
  }

  .error-message {
    color: red;
    font-size: 0.8rem;
    margin: -1rem 0 0.75rem 0.25rem;
  }

  .now-playing {
    font-family: 'Srisakdi', cursive;
    margin: 1rem auto;
    font-size: 1.75rem;
  }

</style>
