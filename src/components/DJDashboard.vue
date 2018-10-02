<template>
    <div v-if="pageOwned">
      <div v-if="isOwner">
        <MediaPlayer ref="player" v-bind="{sendUpdates, queueEnded, sendMessage}" v-bind:DJPage="true"/>
      </div>
      <div v-else>
        <MediaPlayer ref="player" v-bind:ownPage="false" v-bind:DJPage="true" v-bind="{sendMessage}"/>
      </div>
    </div>
    <NotFoundComponent v-else></NotFoundComponent>
</template>

<script>
import io from 'socket.io-client'
import NotFoundComponent from './NotFoundComponent'
import SongContainer from './SongContainer'
import MediaPlayer from './MediaPlayer'
export default {
  name: 'DJDashboard',
  components: {MediaPlayer, SongContainer, NotFoundComponent},
  data () {
    return {
      username: '',
      pageOwned: true,
      socket: window.location.hostname === 'localhost' ? io('localhost:5000') : io(window.location.hostname)
    }
  },
  computed: {
    isOwner: function () {
      return this.username === this.$route.params.username
    }
  },
  methods: {
    async getUsername () {
      this.$store.dispatch('getCurrentUsername').then(resp => {
        if (resp) {
          console.log('You are logged in as ', resp)
          this.username = resp
        } else {
          console.log('You are not logged in')
        }
      })
    },
    async getPlayerInfo () {
      let data = this.$refs['player'].getPlayerInfo()
      let state = await data[0]
      let time = await data[1]
      return {state, time, url: data[2], title: data[3]}
    },
    sendUpdates (state, url, time, title) {
      this.getPlayerInfo().then(resp => {
        resp.state = state
        let newUrl = url || resp.url
        resp.url = newUrl
        let newTime = time === 0 ? 0 : resp.time
        resp.time = newTime
        resp.title = title
        let room = this.$route.params.username || null
        this.socket.emit('updateAll', Object.assign({room}, resp))
      }).catch(err => {
        console.log(err)
      })
    },
    queueEnded () {
      this.socket.emit('queueEnded', {room: this.$route.params.username})
    },
    sendMessage (message) {
      this.socket.emit('message', {room: this.$route.params.username, username: this.username, message})
    }
  },
  mounted: function () {
    if (typeof this.$route.params.pageOwned !== 'undefined') {
      this.pageOwned = this.$route.params.pageOwned
    } else {
      this.socket.emit('joinroom', this.$route.params.username)
    }
    this.getUsername()

    this.socket.on('newMember', (socketID) => {
      if (this.isOwner) {
        this.getPlayerInfo().then(resp => {
          this.socket.emit('updateSinglePlayer', Object.assign({client: socketID}, resp))
        }).catch(err => {
          console.log(err)
        })
        console.log(`${socketID} has joined the room`)
      }
    })

    this.socket.on('updatePlayer', (data) => {
      if (this.isOwner) return
      console.log('Received update', data)
      let time
      if (data.state === 1) {
        // Adjust for latency
        time = data.time + 1
      } else {
        time = data.time
      }
      this.$refs['player'].loadSong(data.url, time, data.state, data.title)
    })

    this.socket.on('stopPlayer', (data) => {
      if (this.isOwner) return
      console.log('Stopping player')
      this.$refs['player'].stopVideo()
    })

    this.socket.on('message', (message) => {
      this.$refs['player'].$refs['messenger'].addMessage(message)
    })
  }
}
</script>
