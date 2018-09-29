<template>
    <div v-if="pageOwned">
      <p>Welcome to {{ $route.params.username }}'s Dojo</p>
      <div v-if="isOwner">
        <p>This is your page</p>
        <SongContainer/>
      </div>
      <button v-on:click="emitEvent">Emit Event</button>
    </div>
    <NotFoundComponent v-else></NotFoundComponent>
</template>

<script>
import io from 'socket.io-client'
import NotFoundComponent from './NotFoundComponent'
import SongContainer from './SongContainer'
export default {
  name: 'DJDashboard',
  components: {SongContainer, NotFoundComponent},
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
    emitEvent () {
      console.log('Clicked')
      this.socket.emit('click', {room: this.$route.params.username, payload: 'Click message'})
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
  }
}
</script>
