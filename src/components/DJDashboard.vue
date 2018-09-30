<template>
    <div v-if="pageOwned">
      <p>Welcome to {{ $route.params.username }}'s Dojo</p>
      <div v-if="isOwner">
        <p>This is your page</p>
        <MediaPlayer ref="player"/>
      </div>
      <div v-else>
        <MediaPlayer ref="player" v-bind:ownPage="false" />
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
      return {state, time, url: data[2]}
    }
  },
  mounted: function () {
    if (typeof this.$route.params.pageOwned !== 'undefined') {
      this.pageOwned = this.$route.params.pageOwned
    } else {
      this.socket.emit('joinroom', this.$route.params.username)
    }
    this.getUsername()

    this.socket.on('click', (data) => {
      console.log(`Received message from server saying '${data}'`)
    })

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
      console.log('Received update', data)
      this.$refs['player'].loadSong(data.url, data.time + 2, data.state)
    })
  }
}
</script>
