<template>
  <div>
    <div class="main-contents">
      <button v-if="$store.state.token" v-on:click="logout">Logout</button>
      <p v-if="username">Hello {{username}}</p>
      <router-link v-if="username" :to="{path: '/music/' + username}">Host Lobby</router-link>
      <!--<h1>Music Player</h1>-->
      <button class="submit" @click="renderAddForm">Add Song</button>
      <SongForm v-if="showAddForm" v-bind="{hideForm, getSongId}"/>
      <SongForm v-if="editData" v-bind:editData="editData" v-bind:edit="true" v-bind="{hideForm, getSongId}"/>
    </div>
    <MediaPlayer ref="media-player" v-bind:is-admin="isAdmin" v-bind="{editSong}"/>
  </div>
</template>

<script>
import SongContainer from './SongContainer'
import MediaPlayer from './MediaPlayer'
import SongForm from './SongForm'
export default {
  name: 'MusicHome',
  components: {SongForm, MediaPlayer, SongContainer},
  data () {
    return {
      username: '',
      showAddForm: false,
      editData: null
    }
  },
  computed: {
    isAdmin () {
      return this.username === 'Admin'
    }
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => this.$router.push('/'))
    },
    async getUsername () {
      this.$store.dispatch('getCurrentUsername').then(resp => {
        if (resp) {
          this.username = resp
        }
      })
    },
    renderAddForm () {
      this.showAddForm = true
    },
    hideForm (data = null) {
      this.showAddForm = false
      this.editData = null
      if (data) {
        this.$refs['media-player'].$refs['song-container'].getSongs()
      }
    },
    editSong (data) {
      this.editData = data
    },
    getSongId (url) {
      return this.$refs['media-player'].getId(url)
    }
  },
  mounted: function () {
    this.getUsername()
  }
}
</script>

<style scoped>
  .main-contents {
    width: 80%;
    margin: auto 0 auto auto;
  }

  .submit {
    width: 6rem;
    max-width: 400px;
    border-radius: 3px;
  }

  .submit {
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
</style>
