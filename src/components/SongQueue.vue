<template>
  <div id="queue-container">
    <p id="queue-title">Song Queue</p>
    <p class="empty-queue" v-if="songs.length === 0">The song queue is empty...</p>
    <p class="empty-queue" v-if="songs.length === 0">Ctrl+Click a song to add it to queue</p>
    <div class="queued-song" v-for="song in songs" :key="song.link" @click.ctrl="removeSelf(song.link)">
      {{song.title.length > 25 ? song.title.substring(0,22) + '...' : song.title}}
    </div>
  </div>
</template>

<script>
export default {
  name: 'SongQueue',
  data () {
    return {
      songs: []
    }
  },
  methods: {
    getNext () {
      if (this.songs.length !== 0) {
        return this.songs.shift()
      }
    },
    addSongToQueue (title, artist, link) {
      this.songs.push({title, artist, link})
    },
    removeSelf (link) {
      const index = this.songs.map(song => song.link).indexOf(link)
      if (index > -1) {
        this.songs.splice(index, 1)
      }
    }
  }
}
</script>

<style scoped>
  #queue-container {
    color: white;
    z-index: 1;
    position: fixed;
    top: 0;
    height: calc(100vh - 2.4rem);
    overflow: auto;
    width: 20%;
    background: #121212;
  }

  #queue-title {
    background: rgba(255, 255, 255, 0.1);
    padding: 0.5rem 0;
    font-weight: 500;
    margin: 0;
  }

  .empty-queue {
    font-size: 0.75rem;
    margin: 0.5rem 0;
  }

  .queued-song {
    font-size: 0.8rem;
    background: #181818;
    padding: 0.5em 0;
    border-bottom: 1px solid #282828;
    -webkit-user-select: none; /* Chrome/Safari */
    -moz-user-select: none; /* Firefox */
    -ms-user-select: none; /* IE10+ */
  }

  .queued-song:hover {
      background: #333333;
  }

</style>
